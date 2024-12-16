import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WeatherCard } from '../src/components/weather-card';

// Mock de next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} />
  },
}));

describe('CurrentWeather component', () => {
  const mockProps = {
    city: 'Madrid',
    country: 'ES',
    temperature: 25,
    description: 'Soleado',
    humidity: 50,
    windSpeed: 5,
    icon: '01d',
  };

  test('renders current weather information', () => {
    render(<WeatherCard {...mockProps} />);

    expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Soleado')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
  });

  test('renders weather icon', () => {
    render(<WeatherCard {...mockProps} />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
    expect(icon).toHaveAttribute('alt', 'Soleado');
  });
});

