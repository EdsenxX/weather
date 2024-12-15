import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CurrentWeather } from "../src/components/current-weather";

// Mock de next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} />;
  },
}));

describe("CurrentWeather component", () => {
  const mockProps = {
    city: "Villa de alvarez",
    country: "MX",
    temperature: 25,
    description: "Soleado",
    humidity: 50,
    windSpeed: 5,
    icon: "01d",
  };

  test("renders current weather information", () => {
    render(<CurrentWeather {...mockProps} />);

    expect(screen.getByText("Villa de alvarez, MX")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("Soleado")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("5 m/s")).toBeInTheDocument();
  });

  test("renders weather icon", () => {
    render(<CurrentWeather {...mockProps} />);

    const icon = screen.getByRole("img");
    expect(icon).toHaveAttribute(
      "src",
      "http://openweathermap.org/img/wn/01d@2x.png"
    );
    expect(icon).toHaveAttribute("alt", "Soleado");
  });
});
