import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ForecastProps } from "@/interfaces/weather";

export function Forecast({ forecast }: ForecastProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 overflow-hidden animate-fade-in">
      <CardHeader className="bg-primary/10 dark:bg-primary/20">
        <CardTitle className="text-2xl font-bold text-primary">
          Pronóstico de 7 días
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-all duration-300",
                "bg-secondary/50 dark:bg-secondary/30",
                "hover:shadow-md hover:scale-105",
                "animate-slide-up",
                { "animate-delay-100": index % 7 === 1 },
                { "animate-delay-200": index % 7 === 2 },
                { "animate-delay-300": index % 7 === 3 },
                { "animate-delay-400": index % 7 === 4 },
                { "animate-delay-500": index % 7 === 5 },
                { "animate-delay-600": index % 7 === 6 }
              )}
            >
              <p className="font-semibold text-primary mb-2">{day.date}</p>
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  layout="fill"
                  className="animate-pulse-slow"
                />
              </div>
              <p className="text-2xl font-bold text-secondary-foreground mb-1">
                {day.temperature}°C
              </p>
              <p className="text-sm text-center capitalize text-muted-foreground">
                {day.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
