const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

import { capitalizeFirstLetter } from "@/lib/utils";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  pop: number;
}

interface HourlyItem {
  hour: string;
  temperature: number;
  description: string;
  windSpeed: number;
  rainProbability: number;
  icon: string;
}

interface WeatherResponse {
  city: string;
  country: string;
  current: {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: {
    date: string;
    temperature: number;
    description: string;
    icon: string;
  }[];
  hourly: HourlyItem[];
}

export async function getWeatherData(city: string): Promise<WeatherResponse> {
  try {
    const currentWeatherResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!currentWeatherResponse.ok) {
      throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
    }
    const currentWeatherData: WeatherData = await currentWeatherResponse.json();

    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!forecastResponse.ok) {
      throw new Error(`HTTP error! status: ${forecastResponse.status}`);
    }
    const forecastData: ForecastData = await forecastResponse.json();

    return {
      city: currentWeatherData.name,
      country: currentWeatherData.sys.country,
      current: {
        temperature: Math.round(currentWeatherData.main.temp),
        description: currentWeatherData.weather[0].description,
        humidity: currentWeatherData.main.humidity,
        windSpeed: currentWeatherData.wind.speed,
        icon: currentWeatherData.weather[0].icon,
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
    throw error; // Re-throw the error so it can be caught in the component
  }
}
