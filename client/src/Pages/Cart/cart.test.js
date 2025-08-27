import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for routing
import Cart from "./index";

// Helper function to wrap the component with MemoryRouter
const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("Cart Component", () => {
  it("renders without crashing", () => {
    renderWithRouter(<Cart />);
  });

  it("displays the 'Your Cart' heading", () => {
    renderWithRouter(<Cart />);
    const heading = screen.getByRole("heading", { name: /your cart/i }); // Fixed query
    expect(heading).toBeInTheDocument();
  });

  it("displays the number of products in the cart", () => {
    renderWithRouter(<Cart />);
    const productCount = screen.getByText(/there are/i);
    expect(productCount).toBeInTheDocument();
    expect(productCount).toHaveTextContent("3"); // Check if the number of products is displayed
  });

  it("displays the product name in the cart", () => {
    renderWithRouter(<Cart />);
    const productNames = screen.getAllByText(/cheesy onion with green chillies/i); // Fixed query
    expect(productNames[0]).toBeInTheDocument();
  });

  it("displays the product price in the cart", () => {
    renderWithRouter(<Cart />);
    const productPrices = screen.getAllByText(/\$12.00/i); // Fixed query
    expect(productPrices[0]).toBeInTheDocument();
  });

  it("displays the 'Remove' button for each product", () => {
    renderWithRouter(<Cart />);
    const removeButtons = screen.getAllByText(/remove/i);
    expect(removeButtons.length).toBeGreaterThan(0); // Check if at least one "Remove" button exists
  });

  it("displays the 'Proceed to Checkout' button", () => {
    renderWithRouter(<Cart />);
    const checkoutButton = screen.getByText(/proceed to checkout/i);
    expect(checkoutButton).toBeInTheDocument();
  });

  it("displays the cart totals section", () => {
    renderWithRouter(<Cart />);
    const cartTotals = screen.getByText(/cart totals/i);
    expect(cartTotals).toBeInTheDocument();
  });

  it("displays the subtotal in the cart totals", () => {
    renderWithRouter(<Cart />);
    const subtotal = screen.getByText(/subtotal/i, { selector: "span" }); // Fixed query
    expect(subtotal).toBeInTheDocument();
  });

  it("displays the total amount in the cart totals", () => {
    renderWithRouter(<Cart />);
    const totalAmount = screen.getByText(/\$12.31/i, { selector: ".text-danger" }); // Fixed query
    expect(totalAmount).toBeInTheDocument();
  });
});