import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for routing

// Helper function to wrap the component with MemoryRouter
const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Home Component", () => {
  it("renders without crashing", () => {
    renderWithRouter(<Home />);
  });

  it("displays the 'SPECIAL OFFERS' heading", () => {
    renderWithRouter(<Home />);
    const heading = screen.getByText(/special offers/i);
    expect(heading).toBeInTheDocument();
  });

  it("displays the 'MEALS' heading", () => {
    renderWithRouter(<Home />);
    const heading = screen.getByRole("heading", { name: /meals/i, level: 3 }); // Target <h3>
    expect(heading).toBeInTheDocument();
  });

  it("displays the 'DESSERTS' heading", () => {
    renderWithRouter(<Home />);
    const heading = screen.getByText(/desserts/i);
    expect(heading).toBeInTheDocument();
  });

  it("displays the 'View All' button", () => {
    renderWithRouter(<Home />);
    const viewAllButtons = screen.getAllByText(/view all/i); // Get all "View All" buttons
    expect(viewAllButtons.length).toBeGreaterThan(0); // Check if at least one exists
  });


  it("displays the newsletter section", () => {
    renderWithRouter(<Home />);
    const newsletterSection = screen.getByText(
      /\$25 discount for your first order/i
    );
    expect(newsletterSection).toBeInTheDocument();
  });

  it("displays the newsletter subscription form", () => {
    renderWithRouter(<Home />);
    const emailInput = screen.getByPlaceholderText(/your email address/i);
    const subscribeButton = screen.getByText(/subscribe/i);
    expect(emailInput).toBeInTheDocument();
    expect(subscribeButton).toBeInTheDocument();
  });
});