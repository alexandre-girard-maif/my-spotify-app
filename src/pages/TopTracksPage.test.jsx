// src/pages/TopTracksPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';
import { act } from 'react';

import TopTracksPage from './TopTracksPage.jsx';

const tracksData = [
    { id: 'track1', name: 'Track One', artists: [{ name: 'Artist A' }], album: { name: 'Album X', images: [{ url: 'album-x.jpg' }] }, popularity: 80, external_urls: { spotify: 'https://open.spotify.com/track/track1' } },
    { id: 'track2', name: 'Track Two', artists: [{ name: 'Artist B' }], album: { name: 'Album Y', images: [{ url: 'album-y.jpg' }] }, popularity: 75, external_urls: { spotify: 'https://open.spotify.com/track/track2' }  },
];

describe('TopTracksPage', () => {
    const Stub = createRoutesStub([
        { 
            path: '/top-tracks', 
            Component: TopTracksPage, 
            loader: async () => ({
                tracks: tracksData,
                error: null,
            }),
            HydrateFallback: () => null, // No fallback needed for this test
        }
    ]);

    test('sets the document title correctly', async () => {
        act(() => {
            render(<Stub initialEntries={['/top-tracks']} />);
        });

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 1, name: 'Your Top 10 Tracks' })
        expect(heading).toBeInTheDocument() 
        
        // expect the document title to be set
        expect(document.title).toBe('Top Tracks | Spotify App')

        // Verify all track items are rendered
        for (const track of tracksData) {
            const trackItem = await screen.findByTestId(`track-item-${track.id}`);
            expect(trackItem).toBeInTheDocument()
        }

        // uncomment below to debug screen
        // screen.debug();
    });
});