import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import SignIn from "./index";
import { Mycontext } from "../../App"; // Import the context

// Mock the context provider
const mockContext = {
  setIsHeaderFooterShow: jest.fn(), // Mock function for setIsHeaderFooterShow
};

// Wrap the SignIn component with the context provider and MemoryRouter
const renderWithContext = (component) => {
  return render(
    <MemoryRouter> {/* Wrap with MemoryRouter */}
      <Mycontext.Provider value={mockContext}>{component}</Mycontext.Provider>
    </MemoryRouter>
  );
};

describe("SignIn Component", () => {
  it("renders without crashing", () => {
    renderWithContext(<SignIn />);
  });

  it("displays the email input field", () => {
    renderWithContext(<SignIn />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it("displays the password input field", () => {
    renderWithContext(<SignIn />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it("displays the 'Sign In' button", () => {
    renderWithContext(<SignIn />);
    const signInButtons = screen.getAllByRole("button", { name: /sign in/i });
    expect(signInButtons[0]).toBeInTheDocument(); // Assuming the first one is the one you want to test
  });

  it("displays the 'Cancel' button", () => {
    renderWithContext(<SignIn />);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("displays the 'Sign In With Google' button", () => {
    renderWithContext(<SignIn />);
    const googleButton = screen.getByRole("button", {
      name: /sign in with google/i,
    });
    expect(googleButton).toBeInTheDocument();
  });
});