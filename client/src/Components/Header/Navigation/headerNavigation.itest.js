import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './index'; // Adjust the import path
import { MemoryRouter } from 'react-router-dom';

// Mock Material-UI and icons
jest.mock('@mui/material/Button', () => (props) => <button {...props}>{props.children}</button>);
jest.mock('react-icons/fa6', () => ({
  FaAngleDown: () => <span>▼</span>,
  FaAngleRight: () => <span>→</span>
}));
jest.mock('react-icons/io', () => ({
  IoIosMenu: () => <span>☰</span>
}));

describe('Navigation Component', () => {
  test('renders navigation bar', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Check main elements
    expect(screen.getByText('ALL CATEGORIES')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
  });

  test('toggles sidebar visibility', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Sidebar should be closed initially
    const sidebar = screen.getByRole('navigation').querySelector('.sidebarNav');
    expect(sidebar).not.toHaveClass('open');

    // Click the categories button
    const categoriesButton = screen.getByText('ALL CATEGORIES');
    fireEvent.click(categoriesButton);

    // Sidebar should open
    expect(sidebar).toHaveClass('open');
  });

  test('displays main navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Check main navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();
    expect(screen.getByText('Dessets')).toBeInTheDocument();
    const drinksButtons = screen.getAllByText('Drinks');
    expect(drinksButtons.length).toBe(2);
    expect(screen.getByText('Combo')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});