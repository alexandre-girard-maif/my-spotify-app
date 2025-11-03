// src/pages/TopArtistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopArtistsPage from './TopArtistsPage.jsx';
import * as spotifyApi from '../../api/spotify-me.js';
import { beforeEach, afterEach, jest } from '@jest/globals';

const artistsData = [
    { id: 'artist1', name: 'Top Artist 1', images: [{ url: 'https://via.placeholder.com/56' }], external_urls: { spotify: 'https://open.spotify.com/artist/artist1' }, genres: ['pop', 'rock'], followers: { total: 1000 } },
    { id: 'artist2', name: 'Top Artist 2', images: [{ url: 'https://via.placeholder.com/56' }], external_urls: { spotify: 'https://open.spotify.com/artist/artist2' }, genres: ['jazz'], followers: { total: 500 } },
];

describe('TopArtistsPage', () => {
    beforeEach(() => {
        const tokenValue = 'test-token';
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
            if (key === 'spotify_access_token') return tokenValue;
            return null;
        });
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ artists: artistsData, error: null });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('fetches and renders top artists, sets title', async () => {
        render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(document.title).toBe('Top Artists | Spotify App');

        // loading state
        expect(screen.getByRole('status')).toHaveTextContent(/loading top artists/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // 
        const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${artistsData.length} Artists of the Month` });
        expect(heading).toBeInTheDocument();

        // verify each artist item rendered
        for (const artist of artistsData) {
            expect(await screen.findByTestId(`top-artist-item-${artist.id}`)).toBeInTheDocument();
        }

        // verify API called with correct params
        await waitFor(() => {
            expect(spotifyApi.fetchUserTopArtists).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchUserTopArtists).toHaveBeenCalledWith(expect.any(String), 10, 'short_term');
        });
    });

    test('displays error message on fetch failure', async () => {
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ artists: [], error: 'Failed to fetch top artists' });

        render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/failed to fetch top artists/i);
    });
});