import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/app/page';
import { useWeatherStore } from '../src/lib/store';

// Mock the store
jest.mock("../src/lib/store", () => ({
  useWeatherStore: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Home component', () => {
  const mockStore = {
    cities: [
      {
        city: 'Madrid',
        country: 'ES',
        current: {
          temperature: 25,
          description: 'Soleado',
          humidity: 50,
          windSpeed: 5,
          icon: '01d',
        },
      },
      {
        city: 'Helsinki',
        country: 'FI',
        current: {
          temperature: 5,
          description: 'Frío',
          humidity: 70,
          windSpeed: 3,
          icon: '13d',
        },
      },
    ],
    addCity: jest.fn(),
    updateCity: jest.fn(),
    initializeCities: jest.fn(),
  };

  beforeEach(() => {
    (useWeatherStore as jest.Mock).mockReturnValue(mockStore);
  });

  test('renders search input and button', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Buscar cualquier ciudad...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  test('renders weather cards for cities in store', () => {
    render(<Home />);
    expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Soleado')).toBeInTheDocument();
    expect(screen.getByText('Helsinki, FI')).toBeInTheDocument();
    expect(screen.getByText('5°C')).toBeInTheDocument();
    expect(screen.getByText('Frío')).toBeInTheDocument();
  });

  test('calls addCity when search form is submitted', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Buscar cualquier ciudad...');
    const button = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Barcelona' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockStore.addCity).toHaveBeenCalledWith('Barcelona');
    });
  });

  test('filters cities based on temperature', async () => {
    render(<Home />);

    const minTempSelect = screen.getByLabelText('Temperatura Mínima');
    
    // Open the select dropdown
    fireEvent.click(minTempSelect);
    
    // Select the '10°C' option
    const option10C = screen.getByRole('option', { name: '10°C' });
    fireEvent.click(option10C);

    await waitFor(() => {
      expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
      expect(screen.queryByText('Helsinki, FI')).not.toBeInTheDocument();
    });

    // Reset filter
    fireEvent.click(minTempSelect);
    const optionAny = screen.getByRole('option', { name: 'Cualquiera' });
    fireEvent.click(optionAny);

    await waitFor(() => {
      expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
      expect(screen.getByText('Helsinki, FI')).toBeInTheDocument();
    });
  });

  test('filters cities based on maximum temperature', async () => {
    render(<Home />);

    const maxTempSelect = screen.getByLabelText('Temperatura Máxima');
    
    // Open the select dropdown
    fireEvent.click(maxTempSelect);
    
    // Select the '20°C' option
    const option20C = screen.getByRole('option', { name: '20°C' });
    fireEvent.click(option20C);

    await waitFor(() => {
      expect(screen.queryByText('Madrid, ES')).not.toBeInTheDocument();
      expect(screen.getByText('Helsinki, FI')).toBeInTheDocument();
    });

    // Reset filter
    fireEvent.click(maxTempSelect);
    const optionAny = screen.getByRole('option', { name: 'Cualquiera' });
    fireEvent.click(optionAny);

    await waitFor(() => {
      expect(screen.getByText('Madrid, ES')).toBeInTheDocument();
      expect(screen.getByText('Helsinki, FI')).toBeInTheDocument();
    });
  });
});

