import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import QuantityBox from "./index"; // Adjust the import path as needed
import "@testing-library/jest-dom/extend-expect";

describe("QuantityBox Component", () => {
  test("renders with initial value of 1", () => {
    render(<QuantityBox />);

    // Check if the input has the initial value of 1
    const inputElement = screen.getByRole("textbox", { name: /quantity/i });
    expect(inputElement).toHaveValue("1");
  });

  test("increments value when plus button is clicked", () => {
    render(<QuantityBox />);

    // Get the plus button and input element
    const plusButton = screen.getByRole("button", { name: /increment/i });
    const inputElement = screen.getByRole("textbox", { name: /quantity/i });

    // Simulate a click on the plus button
    fireEvent.click(plusButton);

    // Check if the input value is incremented to 2
    expect(inputElement).toHaveValue("2");
  });

  test("decrements value when minus button is clicked but not below 1", () => {
    render(<QuantityBox />);

    // Get the minus button, plus button, and input element
    const minusButton = screen.getByRole("button", { name: /decrement/i });
    const plusButton = screen.getByRole("button", { name: /increment/i });
    const inputElement = screen.getByRole("textbox", { name: /quantity/i });

    // Increment the value to 2 first
    fireEvent.click(plusButton);
    expect(inputElement).toHaveValue("2");

    // Decrement the value back to 1
    fireEvent.click(minusButton);
    expect(inputElement).toHaveValue("1");

    // Ensure the value doesn't go below 1
    fireEvent.click(minusButton);
    expect(inputElement).toHaveValue("1");
  });
});