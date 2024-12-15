export const mockWeatherData = {
  city: "Villa de alvarez, Colima",
  country: "MX",
  current: {
    temperature: 22,
    description: "Soleado",
    humidity: 45,
    windSpeed: 3.5,
  },
  forecast: [
    { date: "Lun", temperature: 23, description: "Soleado" },
    { date: "Mar", temperature: 25, description: "Parcialmente nublado" },
    { date: "Mié", temperature: 24, description: "Nublado" },
    { date: "Jue", temperature: 22, description: "Lluvia ligera" },
    { date: "Vie", temperature: 21, description: "Lluvia" },
    { date: "Sáb", temperature: 20, description: "Tormentas" },
    { date: "Dom", temperature: 23, description: "Soleado" },
  ],
  hourly: [
    {
      hour: "Ahora",
      temperature: 22,
      description: "Soleado",
      windSpeed: 3.5,
      rainProbability: 0,
    },
    {
      hour: "13:00",
      temperature: 23,
      description: "Soleado",
      windSpeed: 3.8,
      rainProbability: 0,
    },
    {
      hour: "14:00",
      temperature: 24,
      description: "Parcialmente nublado",
      windSpeed: 4.0,
      rainProbability: 10,
    },
    {
      hour: "15:00",
      temperature: 24,
      description: "Parcialmente nublado",
      windSpeed: 4.2,
      rainProbability: 20,
    },
    {
      hour: "16:00",
      temperature: 23,
      description: "Nublado",
      windSpeed: 3.9,
      rainProbability: 30,
    },
    {
      hour: "17:00",
      temperature: 22,
      description: "Lluvia ligera",
      windSpeed: 3.5,
      rainProbability: 60,
    },
    {
      hour: "18:00",
      temperature: 21,
      description: "Lluvia",
      windSpeed: 3.2,
      rainProbability: 80,
    },
    {
      hour: "19:00",
      temperature: 20,
      description: "Lluvia",
      windSpeed: 3.0,
      rainProbability: 70,
    },
    {
      hour: "20:00",
      temperature: 19,
      description: "Nublado",
      windSpeed: 2.8,
      rainProbability: 40,
    },
  ],
};

export function getWeatherData(city?: string) {
  // Simulamos un retraso de red
  return new Promise((resolve) => {
    setTimeout(() => {
      if (city) {
        // Si se proporciona una ciudad, modificamos ligeramente los datos
        const data = { ...mockWeatherData, city };
        data.current.temperature += Math.floor(Math.random() * 5) - 2; // +/- 2 grados
        resolve(data);
      } else {
        resolve(mockWeatherData);
      }
    }, 1000);
  });
}
