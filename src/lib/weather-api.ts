const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

import { capitalizeFirstLetter } from "@/lib/utils";
import { WeatherData, WeatherResponse, WeatherFilters, ForecastData, ForecastItem } from "@/interfaces/weather";

export async function getWeatherData(city: string, filters?: WeatherFilters): Promise<WeatherData> {
  try {
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: WeatherResponse = await response.json();

    // Apply filters
    if (filters?.minTemp && data.main.temp < filters.minTemp) {
      throw new Error("Temperature below minimum");
    }
    if (filters?.maxTemp && data.main.temp > filters.maxTemp) {
      throw new Error("Temperature above maximum");
    }
    if (
      filters?.showRainingOnly &&
      !data.weather[0].description.toLowerCase().includes("lluvia")
    ) {
      throw new Error("No rain in this city");
    }

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!forecastResponse.ok) {
      throw new Error(`HTTP error! status: ${forecastResponse.status}`);
    }
    const forecastData: ForecastData = await forecastResponse.json();

    return {
      city: data.name,
      country: data.sys.country,
      current: {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      },
      forecast: forecastData.list
        .filter((_, index: number) => index % 8 === 0)
        .slice(0, 7)
        .map((item: ForecastItem) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("es-ES", {
            weekday: "short",
          }),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        })),
      hourly: forecastData.list.slice(0, 9).map((item: ForecastItem) => ({
        hour: new Date(item.dt * 1000).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperature: Math.round(item.main.temp),
        description: capitalizeFirstLetter(item.weather[0].description),
        windSpeed: item.wind.speed,
        rainProbability: item.pop * 100,
        icon: item.weather[0].icon,
      })),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function getMultipleWeatherData(cities: string[]) {
  try {
    const weatherPromises = cities.map((city) => getWeatherData(city));
    const weatherData = await Promise.all(weatherPromises);
    return weatherData;
  } catch (error) {
    console.error("Error fetching multiple weather data:", error);
    throw error;
  }
}
