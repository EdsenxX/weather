import { create } from 'zustand'
import { getWeatherData } from './weather-api'

interface WeatherData {
  city: string
  country: string
  current: {
    temperature: number
    description: string
    humidity: number
    windSpeed: number
    icon: string
  }
}

interface WeatherStore {
  cities: WeatherData[]
  addCity: (cityName: string) => Promise<void>
  updateCity: (cityName: string) => Promise<void>
  initializeCities: (initialCities: string[]) => Promise<void>
}

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  cities: [],
  addCity: async (cityName: string) => {
    const cities = get().cities
    if (!cities.some(city => city.city.toLowerCase() === cityName.toLowerCase())) {
      const newCityData = await getWeatherData(cityName)
      set({ cities: [newCityData, ...cities] })
    }
  },
  updateCity: async (cityName: string) => {
    const updatedCityData = await getWeatherData(cityName)
    set((state) => ({
      cities: state.cities.map(city => 
        city.city.toLowerCase() === cityName.toLowerCase() ? updatedCityData : city
      )
    }))
  },
  initializeCities: async (initialCities: string[]) => {
    const currentCities = get().cities
    const citiesToAdd = initialCities.filter(city => 
      !currentCities.some(c => c.city.toLowerCase() === city.toLowerCase())
    )
    if (citiesToAdd.length > 0) {
      const newCities = await Promise.all(citiesToAdd.map(getWeatherData))
      set({ cities: [...currentCities, ...newCities] })
    }
  }
}))

