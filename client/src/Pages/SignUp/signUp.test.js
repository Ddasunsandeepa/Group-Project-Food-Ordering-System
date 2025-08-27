import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for routing
import { Mycontext } from "../../App"; // Import the context
import SignUp from "./index"; // Import the component to test

// Mock the context provider
const mockContext = {
  setIsHeaderFooterShow: jest.fn(), // Mock function for setIsHeaderFooterShow
};

// Helper function to wrap the component with context and router
const renderWithContext = (component) => {
  return render(
    <MemoryRouter>
      <Mycontext.Provider value={mockContext}>{component}</Mycontext.Provider>
    </MemoryRouter>
  );
};

describe("SignUp Component", () => {
  it("renders without crashing", () => {
    renderWithContext(<SignUp />);
  });


  it("displays the 'Name' input field", () => {
    renderWithContext(<SignUp />);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it("displays the 'Contact No.' input field", () => {
    renderWithContext(<SignUp />);
    const contactInput = screen.getByLabelText(/contact no./i);
    expect(contactInput).toBeInTheDocument();
  });

  it("displays the 'Password' input field", () => {
    renderWithContext(<SignUp />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it("displays the 'Sign Up' button", () => {
    renderWithContext(<SignUp />);
    const signUpButtons = screen.getAllByRole("button", { name: /sign up/i }); // Get all buttons with "Sign Up"
    const mainSignUpButton = signUpButtons[0]; // Select the first button
    expect(mainSignUpButton).toBeInTheDocument();
  });

  it("displays the 'Cancel' button", () => {
    renderWithContext(<SignUp />);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("displays the 'Sign Up With Google' button", () => {
    renderWithContext(<SignUp />);
    const googleButton = screen.getByRole("button", {
      name: /sign up with google/i,
    });
    expect(googleButton).toBeInTheDocument();
  });
});