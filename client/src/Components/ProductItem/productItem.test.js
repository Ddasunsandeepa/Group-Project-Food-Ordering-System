import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductItem from './ProductItem';
import { MemoryRouter } from 'react-router-dom';

// Mock components and icons
jest.mock('@mui/material/Button', () => (props) => <button {...props}>{props.children}</button>);
jest.mock('@mui/material/Rating', () => (props) => <div data-testid="rating">{props.value}</div>);
jest.mock('../ProductModal', () => (props) => (
  props.isOpenProductModal ? <div data-testid="product-modal" /> : null
));
jest.mock('react-icons/tfi', () => ({ TfiFullscreen: () => <span>🔍</span> }));
jest.mock('react-icons/io', () => ({ IoMdHeartEmpty: () => <span>❤</span> }));

describe('ProductItem Component', () => {
  // Mock window.scrollTo
  window.scrollTo = jest.fn();

  test('renders basic product information', () => {
    render(
      <MemoryRouter>
        <ProductItem />
      </MemoryRouter>
    );

    // Check basic content
    expect(screen.getByText('Delicious BBQ Chicken Pizza. Very tasty meals')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByText('$30.00')).toBeInTheDocument();
    expect(screen.getByText('$16.00')).toBeInTheDocument();
  });

  test('displays rating and action buttons', () => {
    render(
      <MemoryRouter>
        <ProductItem />
      </MemoryRouter>
    );

    // Check rating
    const rating = screen.getByTestId('rating');
    expect(rating.textContent).toBe('4');

    // Check action buttons
    expect(screen.getByText('🔍')).toBeInTheDocument();
    expect(screen.getByText('❤')).toBeInTheDocument();
  });

  test('contains product link', () => {
    render(
      <MemoryRouter>
        <ProductItem />
      </MemoryRouter>
    );

    // Check if the product card is wrapped in a link
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });
});