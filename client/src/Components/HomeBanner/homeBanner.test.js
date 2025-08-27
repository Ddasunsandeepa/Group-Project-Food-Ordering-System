import { render, screen } from '@testing-library/react';
import HomeBanner from './index';

// Mock react-slick component since it can cause issues in tests
jest.mock('react-slick', () => {
  return function MockSlider(props) {
    return (
      <div data-testid="slider">
        {props.children}
      </div>
    );
  };
});

describe('HomeBanner Component', () => {
  test('renders without crashing', () => {
    render(<HomeBanner />);
    expect(screen.getByTestId('slider')).toBeInTheDocument();
  });

  test('displays banner images', () => {
    render(<HomeBanner />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(4); // There are 4 slides in the component
  });

  test('shows correct banner content', () => {
    render(<HomeBanner />);
    
    // Check headings
    expect(screen.getByText('Delicious Meals')).toBeInTheDocument();
    expect(screen.getByText('Spicy Pizza')).toBeInTheDocument();
    expect(screen.getByText('Fresh Sushi')).toBeInTheDocument();
    expect(screen.getByText('Delicious Food')).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getAllByText('Shop Now').length).toBe(2);
    expect(screen.getAllByText('Order Now').length).toBe(2);
  });

  test('has overlay on each slide', () => {
    render(<HomeBanner />);
    const overlays = screen.getAllByTestId('slide-overlay'); // Add data-testid="slide-overlay" to the overlay div
    expect(overlays.length).toBe(4);
  });

  test('displays banner descriptions', () => {
    render(<HomeBanner />);
    const descriptions = screen.getAllByText(/Discover our delicious menu/i);
    expect(descriptions.length).toBe(4);
  });
});