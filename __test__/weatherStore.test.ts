import { act, renderHook } from "@testing-library/react";
import { useWeatherStore } from "../src/lib/store";
import { getWeatherData } from "../src/lib/weather-api";

// Mock the weather API
jest.mock("../src/lib/weather-api", () => ({
  getWeatherData: jest.fn(),
}));

describe("Weather Store", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { result } = renderHook(() => useWeatherStore());
    act(() => {
      result.current.cities = [];
    });
  });

  test("should initialize with empty cities array", () => {
    const { result } = renderHook(() => useWeatherStore());
    expect(result.current.cities).toEqual([]);
  });

  test("should add a city", async () => {
    const mockWeatherData = {
      city: "Test City",
      country: "TC",
      current: {
        temperature: 20,
        description: "Cloudy",
        humidity: 60,
        windSpeed: 5,
        icon: "03d",
      },
    };

    (getWeatherData as jest.Mock).mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeatherStore());

    await act(async () => {
      await result.current.addCity("Test City");
    });

    expect(result.current.cities).toHaveLength(1);
    expect(result.current.cities[0]).toEqual(mockWeatherData);
  });

  test("should update a city", async () => {
    const initialWeatherData = {
      city: "Test City",
      country: "TC",
      current: {
        temperature: 20,
        description: "Cloudy",
        humidity: 60,
        windSpeed: 5,
        icon: "03d",
      },
    };

    const updatedWeatherData = {
      ...initialWeatherData,
      current: {
        ...initialWeatherData.current,
        temperature: 25,
        description: "Sunny",
      },
    };

    const { result } = renderHook(() => useWeatherStore());

    act(() => {
      result.current.cities = [initialWeatherData];
    });

    (getWeatherData as jest.Mock).mockResolvedValue(updatedWeatherData);

    await act(async () => {
      await result.current.updateCity("Test City");
    });

    expect(result.current.cities).toHaveLength(1);
    expect(result.current.cities[0]).toEqual(updatedWeatherData);
  });

  test("should initialize cities", async () => {
    const mockWeatherData1 = {
      city: "City 1",
      country: "C1",
      current: {
        temperature: 20,
        description: "Cloudy",
        humidity: 60,
        windSpeed: 5,
        icon: "03d",
      },
    };

    const mockWeatherData2 = {
      city: "City 2",
      country: "C2",
      current: {
        temperature: 25,
        description: "Sunny",
        humidity: 55,
        windSpeed: 3,
        icon: "01d",
      },
    };

    (getWeatherData as jest.Mock)
      .mockResolvedValueOnce(mockWeatherData1)
      .mockResolvedValueOnce(mockWeatherData2);

    const { result } = renderHook(() => useWeatherStore());

    await act(async () => {
      await result.current.initializeCities(["City 1", "City 2"]);
    });

    expect(result.current.cities).toHaveLength(2);
    expect(result.current.cities[0]).toEqual(mockWeatherData1);
    expect(result.current.cities[1]).toEqual(mockWeatherData2);
  });
});
