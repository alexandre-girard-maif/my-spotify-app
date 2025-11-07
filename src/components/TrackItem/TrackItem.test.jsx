// src/components/TrackItem.test.jsx

import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TrackItem from './TrackItem';

describe('TrackItem component', () => {

    test('renders track information correctly', () => {
        const track = {
            name: 'Test Track',
            artists: [{ name: 'Test Artist' }],
            album: { name: 'Test Album', images: [{ url: 'test.jpg' }] },
            popularity: 50,
            external_urls: { spotify: 'https://open.spotify.com/test' }
        };
        render(<TrackItem track={track} />);
        expect(screen.getByText('Test Track')).toBeInTheDocument();
        expect(screen.getByText('Test Artist')).toBeInTheDocument();
        expect(screen.getByText('Test Album')).toBeInTheDocument();
        expect(screen.getByText('Popularity: 50')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://open.spotify.com/test');
    });

});
