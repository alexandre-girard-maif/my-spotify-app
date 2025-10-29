// src/pages/DashboardPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
            HydrateFallback: () => null,
        },
        {
            path: '/login',
            Component: () => <div>Login Page</div>,
        }
    ]);

    test('sets the document title correctly', async () => {
        // Ensure token present to avoid redirect
        localStorage.setItem('spotify_access_token', 'test-token');
        act(() => {
            render(<Stub initialEntries={['/dashboard']} />);
        });

        // Heading present
        const heading = await screen.findByRole('heading', { level: 1, name: 'Welcome to Your Dashboard' });
        expect(heading).toBeInTheDocument();

        // Subtitle
        expect(await screen.findByText('Preferred track and artist of the month.')).toBeInTheDocument();

        // Title set
        expect(document.title).toBe('Dashboard | Spotify App');

        // Cards render artist & track names
        expect(await screen.findByText(topArtistData.name)).toBeInTheDocument();
        expect(await screen.findByText(topTrackData.name)).toBeInTheDocument();
    });
});
