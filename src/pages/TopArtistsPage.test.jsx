// src/pages/TopArtistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';
import { act } from 'react';

import TopArtistsPage from './TopArtistsPage.jsx';

const artistsData = [
    { id: 'artist1', name: 'Top Artist 1', images: [{ url: 'https://via.placeholder.com/56' }], external_urls: { spotify: 'https://open.spotify.com/artist/artist1' }, genres: ['pop', 'rock'], followers: { total: 1000 } },
    { id: 'artist2', name: 'Top Artist 2', images: [{ url: 'https://via.placeholder.com/56' }], external_urls: { spotify: 'https://open.spotify.com/artist/artist2' }, genres: ['jazz'], followers: { total: 500 } },
];  

describe('TopArtistsPage', () => {
    const Stub = createRoutesStub([
        { 
            path: '/top-artists', 
            Component: TopArtistsPage, 
            loader: async () => ({
                artists: artistsData,
                error: null,
            }),
            HydrateFallback: () => null, // No fallback needed for this test
        }
    ]);

    test('sets the document title correctly', async () => {
        act(() => {
            render(<Stub initialEntries={['/top-artists']} />);
        });

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 1, name: 'Your Top Artists' })
        expect(heading).toBeInTheDocument();

        // expect the document title to be set
        expect(document.title).toBe('Top Artists | Spotify App')

        // Verify all artist items are rendered
        for (const artist of artistsData) {
            const artistItem = await screen.findByTestId(`top-artist-item-${artist.id}`);
            expect(artistItem).toBeInTheDocument()
        }

        // uncomment below to debug screen
        // screen.debug();
    });
});