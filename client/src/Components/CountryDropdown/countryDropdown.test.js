import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CountryDropdown from "./index.js"; // Add .js extension
import { Mycontext } from "../../App"; // Adjust import path

// Mock context values
const mockContext = {
  countrList: ["New York", "Los Angeles", "London", "Paris"],
  selectCity: "",
  setSelectCity: jest.fn(),
};

// Mock Material-UI and icons
jest.mock("@mui/material/Button", () => (props) => (
  <button {...props}>{props.children}</button>
));
jest.mock("react-icons/fa", () => ({ FaAngleDown: () => <span>▼</span> }));
jest.mock("react-icons/io", () => ({
  IoIosSearch: () => <span>🔍</span>,
  IoMdClose: () => <span>×</span>,
}));

describe("CountryDropdown Component", () => {
  test("1. Shows default 'Select City' text", () => {
    render(
      <Mycontext.Provider value={mockContext}>
        <CountryDropdown />
      </Mycontext.Provider>
    );
    
    expect(screen.getByText("Your Location")).toBeInTheDocument();
    expect(screen.getByText("Select City")).toBeInTheDocument();
  });

  test("2. Selects a city from the list", () => {
    render(
      <Mycontext.Provider value={mockContext}>
        <CountryDropdown />
      </Mycontext.Provider>
    );

    // Open modal and select a city
    fireEvent.click(screen.getByText("Select City"));
    fireEvent.click(screen.getByText("London"));
    
    // Verify city is selected
    expect(mockContext.setSelectCity).toHaveBeenCalledWith("London");
    expect(screen.getByText("London")).toBeInTheDocument();
  });

  test("3. Filters cities using search", () => {
    render(
      <Mycontext.Provider value={mockContext}>
        <CountryDropdown />
      </Mycontext.Provider>
    );

    // Open modal and type in search
    fireEvent.click(screen.getByText("Select City"));
    fireEvent.change(screen.getByPlaceholderText("search your area"), {
      target: { value: "lo" }
    });

    // Verify filtered results
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.queryByText("Paris")).not.toBeInTheDocument();
  });

  test("4. Shows message when no cities found", () => {
    // Create empty context
    const emptyContext = { ...mockContext, countrList: [] };
    
    render(
      <Mycontext.Provider value={emptyContext}>
        <CountryDropdown />
      </Mycontext.Provider>
    );

    fireEvent.click(screen.getByText("Select City"));
    expect(screen.getByText("No cities available")).toBeInTheDocument();
  });
});