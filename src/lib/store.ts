import { create } from "zustand";
import { getWeatherData } from "./weather-api";
import { WeatherStore } from "@/interfaces/store";

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  cities: [],
  addCity: async (cityName: string) => {
    const cities = get().cities;
    if (
      !cities.some((city) => city.city.toLowerCase() === cityName.toLowerCase())
    ) {
      const newCityData = await getWeatherData(cityName);
      set({ cities: [newCityData, ...cities] });
    }
  },
  updateCity: async (cityName: string) => {
    const updatedCityData = await getWeatherData(cityName);
    set((state) => ({
      cities: state.cities.map((city) =>
        city.city.toLowerCase() === cityName.toLowerCase()
          ? updatedCityData
          : city
      ),
    }));
  },
  initializeCities: async (initialCities: string[]) => {
    const currentCities = get().cities;
    const citiesToAdd = initialCities.filter(
      (city) =>
        !currentCities.some((c) => c.city.toLowerCase() === city.toLowerCase())
    );
    if (citiesToAdd.length > 0) {
      const newCities = await Promise.all(citiesToAdd.map((city) => getWeatherData(city)));
      set({ cities: [...currentCities, ...newCities] });
    }
  },
}));
