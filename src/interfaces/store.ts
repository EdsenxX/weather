import { HourlyItem } from "@/interfaces/weather";

export interface WeatherStore {
  cities: {
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
  }[];
  addCity: (cityName: string) => Promise<void>;
  updateCity: (cityName: string) => Promise<void>;
  initializeCities: (initialCities: string[]) => Promise<void>;
}
