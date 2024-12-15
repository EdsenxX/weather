import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Wind } from "lucide-react";
import Image from "next/image";

interface WeatherCardProps {
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export function WeatherCard({
  city,
  country,
  temperature,
  description,
  humidity,
  windSpeed,
  icon,
}: WeatherCardProps) {
  return (
    <Card className="w-full hover:bg-secondary transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            {city}, {country}
          </div>
          <div className="text-2xl font-bold">{temperature}°C</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              width={50}
              height={50}
            />
            <p className="text-sm capitalize ml-2">{description}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm">
              <Droplets className="mr-1 h-4 w-4 text-blue-500" />
              {humidity}%
            </div>
            <div className="flex items-center text-sm">
              <Wind className="mr-1 h-4 w-4 text-green-500" />
              {windSpeed} m/s
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
