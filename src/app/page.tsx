"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, RefreshCw } from "lucide-react";
import Link from "next/link";
import { WeatherCard } from "@/components/weather-card";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { useWeatherStore } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Initial list of cities
const initialCities = [
  "Ottawa",
  "Washington DC",
  "Ciudad de México",
  "Panamá",
  "Buenos Aires",
  "Brasilia",
  "Santiago de Chile",
  "Bogotá",
  "Lima",
  "Caracas",
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cities, addCity, updateCity, initializeCities } = useWeatherStore();

  // Filter states
  const [minTemp, setMinTemp] = useState<string | null>(null);
  const [maxTemp, setMaxTemp] = useState<string | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string>("any");

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await initializeCities(initialCities);
      } catch {
        setError("Error fetching initial weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (cities.length === 0) {
      fetchInitialData();
    }
  }, [cities.length, initializeCities]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter a city name to search.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addCity(searchTerm.trim());
      setSearchTerm("");
    } catch {
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      await updateCity(cityName);
    } catch{
      setError(
        `Error updating weather data for ${cityName}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setMinTemp(null);
    setMaxTemp(null);
    setWeatherCondition("any");
  };

  const filteredWeatherData = cities.filter((city) => {
    if (
      minTemp &&
      minTemp !== "any" &&
      city.current.temperature < Number(minTemp)
    )
      return false;
    if (
      maxTemp &&
      maxTemp !== "any" &&
      city.current.temperature > Number(maxTemp)
    )
      return false;
    if (weatherCondition !== "any") {
      const description = city.current.description.toLowerCase();
      switch (weatherCondition) {
        case "soleado":
          return [
            "despejado",
            "soleado",
            "cielo claro",
            "nubes dispersas",
          ].some((cond) => description.includes(cond));
        case "nublado":
          return ["nublado", "cubierto", "nubes", "nuboso"].some((cond) =>
            description.includes(cond)
          );
        case "lluvia":
          return ["lluvia", "llovizna", "precipitaciones"].some((cond) =>
            description.includes(cond)
          );
        case "tormenta":
          return ["tormenta", "truenos", "relámpagos"].some((cond) =>
            description.includes(cond)
          );
        case "nieve":
          return ["nieve", "nevado", "aguanieve"].some((cond) =>
            description.includes(cond)
          );
        default:
          return true;
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300 ease-in-out">
              Weather App
            </h1>
            <ThemeToggle />
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2 shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
                <Input
                  type="text"
                  placeholder="Buscar cualquier ciudad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow border-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 ease-in-out"
                />
                <Button
                  type="submit"
                  disabled={loading || !searchTerm.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300 ease-in-out"
                >
                  <Search className="mr-2 h-4 w-4" /> Buscar
                </Button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="minTemp">Temperatura Mínima</Label>
                <Select
                  onValueChange={(value) => setMinTemp(value)}
                  value={minTemp || "any"}
                >
                  <SelectTrigger id="minTemp">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    {[0, 5, 10, 15, 20, 25, 30].map((temp) => (
                      <SelectItem key={temp} value={temp.toString()}>
                        {temp}°C
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="maxTemp">Temperatura Máxima</Label>
                <Select
                  onValueChange={(value) => setMaxTemp(value)}
                  value={maxTemp || "any"}
                >
                  <SelectTrigger id="maxTemp">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    {[20, 25, 30, 35, 40].map((temp) => (
                      <SelectItem key={temp} value={temp.toString()}>
                        {temp}°C
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="weatherCondition">Condición del tiempo</Label>
                <Select
                  onValueChange={(value) => setWeatherCondition(value)}
                  value={weatherCondition}
                >
                  <SelectTrigger id="weatherCondition">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    <SelectItem value="soleado">Soleado / Despejado</SelectItem>
                    <SelectItem value="nublado">Nublado / Cubierto</SelectItem>
                    <SelectItem value="lluvia">Lluvia / Llovizna</SelectItem>
                    <SelectItem value="tormenta">Tormenta</SelectItem>
                    <SelectItem value="nieve">Nieve</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full md:w-auto"
                  >
                    <X className="mr-2 h-4 w-4" /> Limpiar filtros
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4 bg-red-100 border border-red-400 rounded-md p-2 transition-all duration-300 ease-in-out">
              {error}
            </p>
          )}

          {loading && (
            <p className="text-center mb-4 text-gray-600 dark:text-gray-400 transition-colors duration-300 ease-in-out">
              Loading weather data...
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWeatherData.map((city) => (
              <div key={city.city} className="relative group">
                <Link
                  href={`/city/${encodeURIComponent(city.city)}`}
                  className="transition-transform duration-300 ease-in-out hover:scale-105 block"
                >
                  <WeatherCard
                    city={city.city}
                    country={city.country}
                    temperature={city.current.temperature}
                    description={city.current.description}
                    humidity={city.current.humidity}
                    windSpeed={city.current.windSpeed}
                    icon={city.current.icon}
                  />
                </Link>
                <Button
                  onClick={() => handleRefresh(city.city)}
                  className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  size="icon"
                  variant="ghost"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {filteredWeatherData.length === 0 && !loading && (
            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              No se encontraron ciudades que coincidan con los filtros
              seleccionados.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
