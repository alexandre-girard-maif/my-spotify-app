// src/pages/PlaylistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PlaylistsPage from './PlaylistsPage.jsx';
import * as spotifyApi from '../api/spotify.js';
import { beforeEach, afterEach, jest } from '@jest/globals';

const playlistsData = [
    { id: 'playlist1', name: 'My Playlist 1', images: [{ url: 'https://via.placeholder.com/56' }], owner: { display_name: 'User1' }, tracks: { total: 5 }, external_urls: { spotify: 'https://open.spotify.com/playlist/playlist1' } },
    { id: 'playlist2', name: 'My Playlist 2', images: [{ url: 'https://via.placeholder.com/56' }], owner: { display_name: 'User2' }, tracks: { total: 10 }, external_urls: { spotify: 'https://open.spotify.com/playlist/playlist2' }  },
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

        test('shows skeleton during initial auth checking before data load', async () => {
                render(
                    <MemoryRouter initialEntries={['/playlists']}>
                        <Routes>
                            <Route path="/playlists" element={<PlaylistsPage />} />
                        </Routes>
                    </MemoryRouter>
                );
                expect(screen.getByTestId('playlists-skeleton')).toBeInTheDocument();
                const heading = await screen.findByRole('heading', { level: 1, name: 'Your Playlists' });
                expect(heading).toBeInTheDocument();
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

        // Skeleton first frame
        expect(screen.getByTestId('playlists-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('playlists-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading playlists/i);

        const heading = await screen.findByRole('heading', { level: 1, name: 'Your Playlists' });
        expect(heading).toBeInTheDocument();

        expect(document.title).toBe('Playlists | Spotify App');

        const countHeading = await screen.findByRole('heading', { level: 2, name: `${playlistsData.length} Playlists` });
        expect(countHeading).toBeInTheDocument();

        for (const playlist of playlistsData) {
            expect(await screen.findByTestId(`playlist-item-${playlist.id}`)).toBeInTheDocument();
        }

        await waitFor(() => {
            expect(spotifyApi.fetchUserPlaylists).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchUserPlaylists).toHaveBeenCalledWith(expect.any(String), 10);
        });
    });

        test('redirects to login when access token missing', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        const apiSpy = jest.spyOn(spotifyApi, 'fetchUserPlaylists').mockResolvedValue({ playlists: [], error: null });
                render(
                    <MemoryRouter initialEntries={['/playlists']}>
                        <Routes>
                            <Route path="/playlists" element={<PlaylistsPage />} />
                            <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
                        </Routes>
                    </MemoryRouter>
                );
                await waitFor(() => {
                    expect(screen.getByTestId('login-page')).toBeInTheDocument();
                });
                expect(apiSpy).not.toHaveBeenCalled();
    });

    test('shows error when API call fails', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchUserPlaylists').mockRejectedValue(new Error('Network down'));

                render(
                    <MemoryRouter initialEntries={['/playlists']}>
                        <Routes>
                            <Route path="/playlists" element={<PlaylistsPage />} />
                        </Routes>
                    </MemoryRouter>
                );
        // Skeleton first frame
        expect(screen.getByTestId('playlists-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('playlists-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading playlists/i);
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/network down/i);
    });
});
