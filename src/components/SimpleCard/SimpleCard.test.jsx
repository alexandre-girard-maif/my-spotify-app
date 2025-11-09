// src/components/SimpleCard/SimpleCard.test.jsx

import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SimpleCard from './SimpleCard';

describe('SimpleCard component', () => {
    test('renders SimpleCard correctly', () => {
        // Arrange
        const props = {
            imageUrl: 'https://via.placeholder.com/150',
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            link: 'https://example.com'
        };

        // Act
        render(<SimpleCard {...props} />);

        // Assert
        expect(screen.getByAltText('Test Title')).toHaveAttribute('src', props.imageUrl);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByTestId('subtitle')).toHaveTextContent('Test Subtitle');
        expect(screen.getByTestId('link')).toHaveAttribute('href', props.link);
    });
});