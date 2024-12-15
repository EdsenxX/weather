import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wind, Droplets } from "lucide-react";
import Image from "next/image";

interface HourlyData {
  hour: string;
  temperature: number;
  description: string;
  windSpeed: number;
  rainProbability: number;
  icon: string;
}

interface HourlyTableProps {
  data: HourlyData[];
}

export function HourlyTable({ data }: HourlyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hora</TableHead>
          <TableHead>Clima</TableHead>
          <TableHead>Temperatura</TableHead>
          <TableHead>Vientos</TableHead>
          <TableHead>Prob. de lluvia</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.hour}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Image
                  src={`http://openweathermap.org/img/wn/${item.icon}.png`}
                  alt={item.description}
                  width={40}
                  height={40}
                />
                <span className="ml-2">{item.description}</span>
              </div>
            </TableCell>
            <TableCell>{item.temperature}°C</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Wind className="w-4 h-4 mr-1 text-green-500" />
                {item.windSpeed} m/s
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Droplets className="w-4 h-4 mr-1 text-blue-500" />
                {Math.round(item.rainProbability)}%
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
