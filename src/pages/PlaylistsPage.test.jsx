// src/pages/PlaylistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PlaylistsPage from './PlaylistsPage.jsx';
import * as spotifyApi from '../api/spotify-me.js';
import { beforeEach, afterEach, jest } from '@jest/globals';

const playlistsData = [
    { id: 'playlist1', name: 'My Playlist 1', images: [{ url: 'https://via.placeholder.com/56' }], owner: { display_name: 'User1' }, tracks: { total: 5 }, external_urls: { spotify: 'https://open.spotify.com/playlist/playlist1' } },
    { id: 'playlist2', name: 'My Playlist 2', images: [{ url: 'https://via.placeholder.com/56' }], owner: { display_name: 'User2' }, tracks: { total: 10 }, external_urls: { spotify: 'https://open.spotify.com/playlist/playlist2' } },
];

describe('PlaylistsPage', () => {
    beforeEach(() => {
        const tokenValue = 'test-token';
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
            if (key === 'spotify_access_token') return tokenValue;
            return null;
        });
        jest.spyOn(spotifyApi, 'fetchUserPlaylists').mockResolvedValue({ playlists: playlistsData, error: null });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('fetches and renders playlists, sets title', async () => {
        render(
            <MemoryRouter initialEntries={['/playlists']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(document.title).toBe('Playlists | Spotify App');

        // loading state
        expect(screen.getByRole('status')).toHaveTextContent(/loading playlists/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify playlists content rendered
        const heading = await screen.findByRole('heading', { level: 1, name: 'Your Playlists' });
        expect(heading).toBeInTheDocument();

        const countHeading = await screen.findByRole('heading', { level: 2, name: `${playlistsData.length} Playlists` });
        expect(countHeading).toBeInTheDocument();

        // verify each playlist item rendered
        for (const playlist of playlistsData) {
            expect(await screen.findByTestId(`playlist-item-${playlist.id}`)).toBeInTheDocument();
        }

        // verify API called correctly
        await waitFor(() => {
            expect(spotifyApi.fetchUserPlaylists).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchUserPlaylists).toHaveBeenCalledWith('test-token', 10);
        });
    });

    test('displays error message on fetch failure', async () => {
        jest.spyOn(spotifyApi, 'fetchUserPlaylists').mockResolvedValue({ playlists: [], error: 'Failed to fetch playlists' });

        render(
            <MemoryRouter initialEntries={['/playlists']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Failed to fetch playlists');
    });

    test('displays error message on fetchUserPlaylists failure', async () => {
        jest.spyOn(spotifyApi, 'fetchUserPlaylists').mockRejectedValue(new Error('Network error'));

        render(
            <MemoryRouter initialEntries={['/playlists']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                </Routes>
            </MemoryRouter>
        );

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Network error');
    });

    test("handleTokenError called on token expiry error", async () => {
        const handleTokenErrorSpy = jest.spyOn(require('../utils/handleTokenError'), 'handleTokenError');
        jest.spyOn(spotifyApi, 'fetchUserPlaylists').mockResolvedValue({ playlists: [], error: 'The access token expired' });

        render(
            <MemoryRouter initialEntries={['/playlists']}>
                <Routes>
                    <Route path="/playlists" element={<PlaylistsPage />} />
                    {/* Route where user is redirected after login when token is expired */}
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify handleTokenError called
        expect(handleTokenErrorSpy).toHaveBeenCalledWith('The access token expired', expect.any(Function));
    });
});
