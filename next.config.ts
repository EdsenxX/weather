import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/wn/**",
      },
      {
        protocol: "https",
        hostname: "futuralab.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/heyluk/**",
      }
    ],
  },
};

export default nextConfig;
