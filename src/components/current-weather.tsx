import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind } from "lucide-react";
import Image from "next/image";

interface CurrentWeatherProps {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export function CurrentWeather({
  city,
  country,
  temperature,
  description,
  humidity,
  windSpeed,
  icon,
}: CurrentWeatherProps) {
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {city}, {country}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              width={100}
              height={100}
            />
            <span className="text-5xl font-bold ml-4 text-secondary-foreground">
              {temperature}°C
            </span>
          </div>
          <div className="text-right">
            <p className="text-xl capitalize text-primary">{description}</p>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Droplets className="mr-1 text-blue-500" />
              <span>{humidity}%</span>
            </div>
            <div className="flex items-center mt-1 text-muted-foreground">
              <Wind className="mr-1 text-green-500" />
              <span>{windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
