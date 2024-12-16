export interface HourlyData {
  hour: string;
  temperature: number;
  description: string;
  windSpeed: number;
  rainProbability: number;
  icon: string;
}

export interface HourlyTableProps {
  data: HourlyData[];
}
