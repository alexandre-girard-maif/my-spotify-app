// src/components/SimpleCard.test.jsx

import React from 'react';
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SimpleCard from './SimpleCard';

describe('SimpleCard component', () => {
  test('renders all elements when all props are provided', () => {
    const props = {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'Card Title',
      subtitle: 'Card Subtitle',
      link: 'https://example.com',
    };

    render(<SimpleCard {...props} />);

    // Check if all elements are rendered correctly

    // Image rendering check 
    const image = screen.getByAltText(props.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.imageUrl);
    expect(image).toHaveAttribute('alt', props.title);

    // Title rendering check
    // h3 element for title
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(props.title);

    // Subtitle rendering check
    const subtitle = screen.getByTestId('subtitle');
    expect(subtitle).toBeInTheDocument();

    // Link rendering check
    const link = screen.getByTestId('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', props.link);
  });

  test('does not render subtitle when subtitle prop is not provided', () => {
    const props = {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'Card Title',
      link: 'https://example.com',
    };

    render(<SimpleCard {...props} />);
    
    // Subtitle rendering check
    const subtitle = screen.queryByTestId('subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });

  test('does not render link when link prop is not provided', () => {
    const props = {
      imageUrl: 'https://via.placeholder.com/150',
      title: 'Card Title',
      subtitle: 'Card Subtitle',
    };

    render(<SimpleCard {...props} />);

    const link = screen.queryByTestId('link');
    expect(link).not.toBeInTheDocument();
  });
});