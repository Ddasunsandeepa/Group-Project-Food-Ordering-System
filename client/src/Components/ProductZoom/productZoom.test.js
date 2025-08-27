import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductZoom from './index';

// Mock react-slick and InnerImageZoom components
jest.mock('react-slick', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}));

jest.mock('react-inner-image-zoom', () => ({ src, alt }) => (
  <img src={src} alt={alt} />
));

describe('ProductZoom Component', () => {
  test('renders without crashing', () => {
    render(<ProductZoom />);
    expect(screen.getByText('23%')).toBeInTheDocument();
  });

  test('displays discount badge', () => {
    render(<ProductZoom />);
    const badge = screen.getByText('23%');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-primary');
  });

  test('renders main slider images', () => {
    render(<ProductZoom />);
    const mainImages = screen.getAllByAltText('Product Zoom Image');
    expect(mainImages.length).toBe(3);
  });

  test('renders thumbnail slider images', () => {
    render(<ProductZoom />);
    const thumbnails = screen.getAllByRole('img');
    // Only 3 images are rendered due to mocks
    expect(thumbnails.length).toBe(3);
  });
});