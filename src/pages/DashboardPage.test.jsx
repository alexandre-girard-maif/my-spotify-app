// src/pages/DashboardPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlaylistsPage from '././PlaylistsPage';
import { createRoutesStub } from 'react-router-dom';
import { act } from 'react';
import DashboardPage from './DashboardPage';

const topTrackData = {
    id: 'track1',
    name: 'Top Track 1',
    album: {
        images: [
            { url: 'https://via.placeholder.com/640' },
            { url: 'https://via.placeholder.com/300' },
            { url: 'https://via.placeholder.com/64' },
        ],
    },
    artists: [{ name: 'Artist 1' }, { name: 'Artist 2' }],
    external_urls: { spotify: 'https://open.spotify.com/track/track1' },
};

const topArtistData = {
    id: 'artist1',
    name: 'Top Artist 1',
    genres: ['pop', 'rock'],
    images: [{ url: 'https://via.placeholder.com/640' }],
    external_urls: { spotify: 'https://open.spotify.com/artist/artist1' },
};

describe('DashboardPage', () => {
    const Stub = createRoutesStub([
        { 
            path: '/dashboard', 
            Component: DashboardPage, 
            loader: async () => ({
                topTrack: topTrackData,
                topArtist: topArtistData,
                error: null,
            }),
            HydrateFallback: () => null, // No fallback needed for this test
        }
    ]);

    test('sets the document title correctly', async () => {
        act(() => {
            render(<Stub initialEntries={['/dashboard']} />);
        });

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 1, name: 'Welcome to Your Dashboard' })
        expect(heading).toBeInTheDocument()

        // expect the document title to be set
        expect(document.title).toBe('Dashboard | Spotify App')

        const preferredArtistHeading = await screen.findByRole('heading', { level: 2, name: 'Preferred Artist' })
        expect(preferredArtistHeading).toBeInTheDocument()

        // Verify preferred artist card is rendered
        const artistName = await screen.findByText(topArtistData.name);
        expect(artistName).toBeInTheDocument();

        const preferredTrackHeading = await screen.findByRole('heading', { level: 2, name: 'Preferred Track' })
        expect(preferredTrackHeading).toBeInTheDocument()

        // Verify preferred track card is rendered
        const trackName = await screen.findByText(topTrackData.name);
        expect(trackName).toBeInTheDocument();

        // uncomment below to debug screen
        // screen.debug();
    });
});
