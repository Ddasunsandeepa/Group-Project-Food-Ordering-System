import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import SideBar from "./index"; // Adjust the import path as needed

describe("SideBar Component", () => {
  test("renders the SideBar component", () => {
    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    );

    // Check if the "PRODUCT CATEGORIES" heading is rendered
    expect(screen.getByText("PRODUCT CATEGORIES")).toBeInTheDocument();

    // Check if the "FILTER BY PRICE" heading is rendered
    expect(screen.getByText("FILTER BY PRICE")).toBeInTheDocument();

    // Check if the "MEALS TYPE" heading is rendered
    expect(screen.getByText("MEALS TYPE")).toBeInTheDocument();

    // Check if the "Favourites" checkbox is rendered
    expect(screen.getByLabelText("Favourites")).toBeInTheDocument();

    // Check if the "Vege" checkbox is rendered
    expect(screen.getByLabelText("Vege")).toBeInTheDocument();

    // Check if the price range slider is rendered
    const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBeGreaterThan(0); // Ensure at least one slider is present
    expect(sliders[0]).toBeInTheDocument(); // Test the first slider

    // Check if the banner image is rendered
    const bannerImage = screen.getByAltText("");
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute(
      "src",
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pizza-poster-flyers-design-template-f794ae84977038cf44cb9e4c6528ca6e_screen.jpg?ts=1661327865"
    );
  });
});