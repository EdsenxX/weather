import React from 'react';
import { render, screen } from '@testing-library/react';
import { HourlyTable } from '../src/components/hourly-table';

describe('HourlyTable component', () => {
  const mockData = [
    {
      hour: '12:00',
      temperature: 25,
      description: 'Soleado',
      windSpeed: 5,
      rainProbability: 10,
      icon: '01d',
    },
    {
      hour: '15:00',
      temperature: 27,
      description: 'Parcialmente nublado',
      windSpeed: 6,
      rainProbability: 20,
      icon: '02d',
    },
  ];

  test('renders table headers', () => {
    render(<HourlyTable data={mockData} />);

    expect(screen.getByText('Hora')).toBeInTheDocument();
    expect(screen.getByText('Clima')).toBeInTheDocument();
    expect(screen.getByText('Temperatura')).toBeInTheDocument();
    expect(screen.getByText('Vientos')).toBeInTheDocument();
    expect(screen.getByText('Prob. de lluvia')).toBeInTheDocument();
  });

  test('renders hourly weather data', () => {
    render(<HourlyTable data={mockData} />);

    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Soleado')).toBeInTheDocument();
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();

    expect(screen.getByText('15:00')).toBeInTheDocument();
    expect(screen.getByText('27°C')).toBeInTheDocument();
    expect(screen.getByText('Parcialmente nublado')).toBeInTheDocument();
    expect(screen.getByText('6 m/s')).toBeInTheDocument();
    expect(screen.getByText('20%')).toBeInTheDocument();
  });
});

