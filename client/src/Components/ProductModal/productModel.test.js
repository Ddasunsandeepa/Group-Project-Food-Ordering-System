import { render, screen, fireEvent } from '@testing-library/react';
import ProductModel from './index';
import { Button } from '@mui/material';

// Mock close function
const mockClose = jest.fn();

// Mock child components to simplify testing
jest.mock('../QuantityDropDown', () => () => <div data-testid="quantity-box" />);
jest.mock('../ProductZoom', () => () => <div data-testid="product-zoom" />);

describe('ProductModel Component', () => {
  test('renders dialog with product details', () => {
    render(<ProductModel closeProductModel={mockClose} />);
    
    // Check main dialog elements
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Delicious BBQ Chicken Pizza. Very tasty meals')).toBeInTheDocument();
  });

  test('displays product information correctly', () => {
    render(<ProductModel closeProductModel={mockClose} />);
    
    // Check category and rating
    expect(screen.getByText(/Category:/i)).toBeInTheDocument();
    expect(screen.getByText(/Pizza's/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '5 Stars' })).toBeInTheDocument();

    // Check prices
    expect(screen.getByText('$30.00')).toBeInTheDocument();
    expect(screen.getByText('$16.00')).toBeInTheDocument();
  });

  test('shows product status and description', () => {
    render(<ProductModel closeProductModel={mockClose} />);
    
    expect(screen.getByText('IN STOCK')).toBeInTheDocument();
    expect(screen.getByText(/Vivamus adipiscing nisl ut dolor/i)).toBeInTheDocument();
  });

  test('contains action buttons', () => {
    render(<ProductModel closeProductModel={mockClose} />);
    
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ADD TO WISHLIST' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'COMPARE' })).toBeInTheDocument();
  });

  test('close button works', () => {
    render(<ProductModel closeProductModel={mockClose} />);
    
    const closeButton = screen.getByRole('button', { name: '' }); // Close icon button
    fireEvent.click(closeButton);
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  test('renders child components', () => {
    render(<ProductModel closeProductModel={mockClose} />);
    
    expect(screen.getByTestId('quantity-box')).toBeInTheDocument();
    expect(screen.getByTestId('product-zoom')).toBeInTheDocument();
  });
});