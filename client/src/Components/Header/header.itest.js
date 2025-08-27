import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Header from "./index"; // Adjust the import path as needed
import "@testing-library/jest-dom/extend-expect";

// Mock the context provider
const mockContext = {
  countryList: ["USA", "Canada"], // Mock country list
  isLogin: false, // Mock login state
};

// Mock the useContext hook
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockContext,
}));

describe("Header Component", () => {
  test("renders the header correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the logo is rendered
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();

    // Check if the "Sign In" button is rendered (since isLogin is false)
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();

    // Check if the cart icon is rendered
    const cartIcon = screen.getByRole("button", { name: /cart/i });
    expect(cartIcon).toBeInTheDocument();

    // Check if the cart item count is rendered
    const cartCount = screen.getByText("1");
    expect(cartCount).toBeInTheDocument();
  });

  test("renders the user icon when logged in", () => {
    // Update the mock context to simulate a logged-in user
    mockContext.isLogin = true;

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the user icon is rendered
    const userIcon = screen.getByRole("button", { name: /user/i });
    expect(userIcon).toBeInTheDocument();

    // Ensure the "Sign In" button is not rendered
    const signInButton = screen.queryByRole("button", { name: /sign in/i });
    expect(signInButton).not.toBeInTheDocument();
  });
});