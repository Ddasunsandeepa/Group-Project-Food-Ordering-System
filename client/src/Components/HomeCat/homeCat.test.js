import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeCat from './index'; // Adjust the import path

// Mock Swiper and Navigation
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

describe('HomeCat Component', () => {
  // Test 1: Component renders without crashing
  test('renders without crashing', () => {
    render(<HomeCat />);
    expect(screen.getByText('FEATURED DISHES')).toBeInTheDocument();
  });

  // Test 2: Correct heading and subtext are displayed
  test('displays featured dishes heading and subtext', () => {
    render(<HomeCat />);
    
    // Check main heading
    const heading = screen.getByRole('heading', { name: /featured dishes/i });
    expect(heading).toBeInTheDocument();
    
    // Check subtext
    const subtext = screen.getByText(
      /do not miss the current offers until the end of november/i
    );
    expect(subtext).toBeInTheDocument();
  });

  // Test 3: All slides contain image and title
  test('all slides have images and titles', () => {
    render(<HomeCat />);
    
    // Check all images
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(15);
    images.forEach(img => {
      expect(img).toHaveAttribute(
        'src',
        'https://adminsc.pizzahut.lk//images/mainmenu/52b93289-98a9-4296-87a4-0a0e0acda8c6.jpg'
      );
    });
    
    // Check all titles
    const titles = screen.getAllByText('Pizza Mania');
    expect(titles.length).toBe(15);
  });
});