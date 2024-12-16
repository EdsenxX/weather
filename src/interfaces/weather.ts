export interface WeatherData {
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

export interface ForecastData {
  list: ForecastItem[];
}

export interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  pop: number;
}

export interface HourlyItem {
  hour: string;
  temperature: number;
  description: string;
  windSpeed: number;
  rainProbability: number;
  icon: string;
}

export interface WeatherResponse {
  name: string;
  base: string;
  main: {
    humidity: number;
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    feels_like: number;
  };
  weather: {
    icon: string;
    description: string;
    id: number;
    main: string;
  }[];
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
    type: 2;
    id: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

export interface WeatherFilters {
  minTemp?: number;
  maxTemp?: number;
  showRainingOnly?: boolean;
}

export interface ForecastDay {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface ForecastProps {
  forecast: ForecastDay[];
}