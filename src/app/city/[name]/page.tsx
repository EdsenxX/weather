"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WeatherCard } from "@/components/weather-card";
import { WeatherBackground } from "@/components/weather-background";
import { Footer } from "@/components/footer";
import { getWeatherData } from "@/lib/weather-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Forecast } from "@/components/forecast";
import { HourlyTable } from "@/components/hourly-table";
import { ThemeToggle } from "@/components/theme-toggle";

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

export default function CityPage({ params }: { params: { name: string } }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherData(params.name);
        setWeatherData(data);
      } catch (err) {
        setError("Error fetching weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [params.name]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-grow">
        <div className="relative overflow-hidden">
          {weatherData && (
            <WeatherBackground
              weatherCondition={weatherData.current.description}
            />
          )}
          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="flex justify-between items-center mb-8">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="text-primary hover:text-primary-foreground hover:bg-primary"
              >
                ← Back to Cities
              </Button>
              <ThemeToggle />
            </div>
            {loading && (
              <p className="text-center text-primary animate-pulse">
                Loading weather data...
              </p>
            )}
            {error && (
              <p className="text-center text-red-500 animate-fade-in">
                {error}
              </p>
            )}
            {weatherData && (
              <div className="space-y-8 animate-fade-in">
                <WeatherCard
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
