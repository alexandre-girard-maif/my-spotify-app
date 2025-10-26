// src/components/PlayListItem.test.jsx
import React from 'react';

import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TopArtistItem from './TopArtistItem';

describe('TopArtistItem component', () => {
    test('renders artist information correctly', () => {
        const artist = {
            id: 'artist1',
            name: 'Test Artist',
            images: [{ url: 'test.jpg' }],
            genres: ['pop', 'rock'],
            followers: { total: 1000 },
            external_urls: { spotify: 'https://open.spotify.com/artist/artist1' }
        };
        render(<TopArtistItem artist={artist} index={0} />);
        expect(screen.getByText('1. Test Artist')).toBeInTheDocument();
        // expect(screen.getByText('Genres: Pop, Rock')).toBeInTheDocument();
        // expect(screen.getByText('1,000 followers')).toBeInTheDocument();
        // expect(screen.getByRole('link')).toHaveAttribute('href', 'https://open.spotify.com/artist/artist1');
    });
});