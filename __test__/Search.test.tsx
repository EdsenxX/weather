import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Search } from "../src/components/search";

describe("Search component", () => {
  test("renders search input and button", () => {
    render(<Search onSearch={() => {}} />);

    expect(screen.getByPlaceholderText("Buscar ciudad...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument();
  });

  test("calls onSearch with input value when form is submitted", () => {
    const mockOnSearch = jest.fn();
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText("Buscar ciudad...");
    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("London");
  });
});
