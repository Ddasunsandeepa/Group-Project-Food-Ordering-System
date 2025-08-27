import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Footer from './index'; // Update the import path according to your structure

describe('Footer Component', () => {
  // Wrap all tests with MemoryRouter
  const renderFooter = () => {
    return render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  };

  test('renders footer without crashing', () => {
    renderFooter();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('displays top information sections', () => {
    renderFooter();
    
    expect(screen.getByText(/Everyday Fresh Meals/i)).toBeInTheDocument();
    expect(screen.getByText(/Free Delivery for order over \$100/i)).toBeInTheDocument();
    expect(screen.getByText(/Best price on the market/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily Mega Discounts/i)).toBeInTheDocument();
  });

  test('renders all four link columns', () => {
    renderFooter();
    
    expect(screen.getByText('MEALS & FAVOURITES')).toBeInTheDocument();
    expect(screen.getByText('DESSERTS & FAVOURITES')).toBeInTheDocument();
    expect(screen.getByText('DRINKS & FAVOURITES')).toBeInTheDocument();
    expect(screen.getByText('COMBO & FAVOURITES')).toBeInTheDocument();
  });

  test('displays copyright information', () => {
    renderFooter();
    
    expect(screen.getByText(/Copyright 2024 ©/i)).toBeInTheDocument();
    expect(screen.getByText(/Powered by android/i)).toBeInTheDocument();
  });

  test('has three social media links', () => {
    renderFooter();
    
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.closest('.list-inline')
    );
    expect(socialLinks.length).toBe(3);
  });
});