import Image from "next/image";
import { WeatherBackgroundProps } from "@/interfaces/weather-background";

const backgroundData = [
  {
    keywords: ["soleado", "despejado"],
    src: "https://futuralab.s3.us-east-1.amazonaws.com/heyluk/sunny.jpg",
    alt: "Sunny sky background",
  },
  {
    keywords: ["nuboso", "nublado"],
    src: "https://futuralab.s3.us-east-1.amazonaws.com/heyluk/cloudy.jpg",
    alt: "Cloudy sky background",
  },
  {
    keywords: ["lluvia"],
    src: "https://futuralab.s3.us-east-1.amazonaws.com/heyluk/raining.jpg",
    alt: "Rainy sky background",
  },
  {
    keywords: ["niebla", "bruma"],
    src: "https://futuralab.s3.us-east-1.amazonaws.com/heyluk/foggy.jpg",
    alt: "Foggy sky background",
  },
  {
    keywords: ["nieve"],
    src: "https://futuralab.s3.us-east-1.amazonaws.com/heyluk/snowing.jpg",
    alt: "Snowy sky background",
  },
];

export const WeatherBackground: React.FC<WeatherBackgroundProps> = ({
  weatherCondition,
}) => {
  const getBackgroundData = () => {
    const condition = weatherCondition.toLowerCase();

    for (const data of backgroundData) {
      if (data.keywords.some((keyword) => condition.includes(keyword))) {
        return data;
      }
    }

    // Default background
    return {
      src: "https://futuralab.s3.us-east-1.amazonaws.com/heyluk/sunny.jpg",
      alt: "Default sky background",
    };
  };

  const { src, alt } = getBackgroundData();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 dark:to-black/30" />
    </div>
  );
};
