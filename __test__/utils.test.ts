import {
  formatDate,
  kelvinToCelsius,
  mpsToKmh,
  capitalizeFirstLetter,
  getWindDirection,
} from "../src/lib/utils";

describe("Utility functions", () => {
  test("formatDate formats date correctly", () => {
    const date = new Date("2023-06-15T12:00:00Z");
    expect(formatDate(date)).toBe("jue, 15 de junio de 2023");
  });

  test("kelvinToCelsius converts temperature correctly", () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
    expect(kelvinToCelsius(373.15)).toBe(100);
  });

  test("mpsToKmh converts speed correctly", () => {
    expect(mpsToKmh(1)).toBe(4);
    expect(mpsToKmh(10)).toBe(36);
  });

  test("capitalizeFirstLetter capitalizes first letter", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
    expect(capitalizeFirstLetter("WORLD")).toBe("WORLD");
  });

  test("getWindDirection returns correct direction", () => {
    expect(getWindDirection(0)).toBe("N");
    expect(getWindDirection(90)).toBe("E");
    expect(getWindDirection(180)).toBe("S");
    expect(getWindDirection(270)).toBe("W");
  });
});
