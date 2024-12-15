"use client";

import { use } from "react";
import { WeatherCard } from "@/components/weather-card";
import { Forecast } from "@/components/forecast";
import { HourlyTable } from "@/components/hourly-table";
import { WeatherBackground } from "@/components/weather-background";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useWeatherStore } from "@/lib/store";

export default function CityPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const router = useRouter();

  const { name } = use(params);
  const { cities } = useWeatherStore();
  const cityData = cities.find((city) => {
    const nameFormatted = decodeURIComponent(name);
    return city.city.toLowerCase() === nameFormatted.toLowerCase();
  });

  console.log(cities);
  console.log(name);
  console.log(cityData);

  if (!cityData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl mb-4">Ciudad no encontrada</p>
        <Button onClick={() => router.push("/")}>Volver al inicio</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <main className="flex-grow">
        <div className="relative overflow-hidden">
          <WeatherBackground weatherCondition={cityData.current.description} />
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
            <div className="space-y-8 animate-fade-in">
              <WeatherCard
                city={cityData.city}
                country={cityData.country}
                temperature={cityData.current.temperature}
                description={cityData.current.description}
                humidity={cityData.current.humidity}
                windSpeed={cityData.current.windSpeed}
                icon={cityData.current.icon}
              />
            </div>
          </div>
        </div>
        {cityData && (
          <div className="container mx-auto px-4 py-8">
            <Forecast forecast={cityData.forecast} />
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Pronóstico por Hora</CardTitle>
              </CardHeader>
              <CardContent>
                <HourlyTable data={cityData.hourly} />
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
