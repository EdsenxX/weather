"use client";

import { useState, useEffect } from "react";
import { CurrentWeather } from "@/components/current-weather";
import { Forecast } from "@/components/forecast";
import { Search } from "@/components/search";
import { WeatherBackground } from "@/components/weather-background";
import { HourlyTable } from "@/components/hourly-table";
import { Footer } from "@/components/footer";
import { getWeatherData } from "@/lib/weather-api";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherData {
  city: string;
  country: string;
  current: {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temperature: number;
    description: string;
    icon: string;
  }>;
  hourly: Array<{
    hour: string;
    temperature: number;
    description: string;
    windSpeed: number;
    rainProbability: number;
    icon: string;
  }>;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("");

  const fetchWeatherData = async (city: string = location) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
    } catch {
      setError(
        "Error al obtener los datos meteorológicos. Por favor, comprueba el nombre de la ciudad y vuelve a intentarlo."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchLocation = async () => {
    const res = await fetch("/api/get-location");
    const data = await res.json();
    if (!data.city) setLocation("Villa de alvarez, Colima");
    const location = data.city;
    setLocation(location);
  };

  const handleInitPage = async () => {
    if (location) {
      await fetchWeatherData();
    } else {
      await fetchLocation();
    }
  };

  useEffect(() => {
    handleInitPage();
  }, [location]);

  const handleSearch = (city: string) => {
    fetchWeatherData(city);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <main className="flex-grow">
        <div className="relative overflow-hidden">
          {weatherData && (
            <WeatherBackground
              weatherCondition={weatherData.current.description}
            />
          )}
          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-primary animate-fade-in">
                Weather App
              </h1>
              <Button
                onClick={toggleDarkMode}
                variant="outline"
                size="icon"
                className="animate-fade-in"
              >
                {darkMode ? (
                  <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-white" />
                ) : (
                  <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
                )}
              </Button>
            </div>
            <Search onSearch={handleSearch} />
            {loading && (
              <p className="text-center text-primary animate-pulse">
                Cargando datos meteorológicos...
              </p>
            )}
            {error && (
              <p className="text-center text-red-500 animate-fade-in">
                {error}
              </p>
            )}
            {weatherData && (
              <div className="space-y-8 animate-fade-in">
                <CurrentWeather
                  city={weatherData.city}
                  country={weatherData.country}
                  temperature={weatherData.current.temperature}
                  description={weatherData.current.description}
                  humidity={weatherData.current.humidity}
                  windSpeed={weatherData.current.windSpeed}
                  icon={weatherData.current.icon}
                />
              </div>
            )}
          </div>
        </div>
        {weatherData && (
          <div className="container mx-auto px-4 py-8">
            <Forecast forecast={weatherData.forecast} />
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Pronóstico por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <HourlyTable data={weatherData.hourly} />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
