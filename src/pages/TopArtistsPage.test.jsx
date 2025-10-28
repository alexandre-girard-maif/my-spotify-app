// src/pages/TopArtistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopArtistsPage from './TopArtistsPage.jsx';
import * as spotifyApi from '../api/spotify.js';
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

        test('shows skeleton during initial auth checking before data load', async () => {
                render(
                    <MemoryRouter initialEntries={['/top-artists']}>
                        <Routes>
                            <Route path="/top-artists" element={<TopArtistsPage />} />
                        </Routes>
                    </MemoryRouter>
                );
                expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
                const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${artistsData.length} Artists of the Month` });
                expect(heading).toBeInTheDocument();
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

        // Skeleton first frame
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading top artists/i);

        const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${artistsData.length} Artists of the Month` });
        expect(heading).toBeInTheDocument();

        expect(document.title).toBe('Top Artists | Spotify App');

        for (const artist of artistsData) {
            expect(await screen.findByTestId(`top-artist-item-${artist.id}`)).toBeInTheDocument();
        }

        await waitFor(() => {
            expect(spotifyApi.fetchUserTopArtists).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchUserTopArtists).toHaveBeenCalledWith(expect.any(String), 10, 'short_term');
        });
    });

        test('redirects to login when access token missing', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        const apiSpy = jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ artists: [], error: null });
                render(
                    <MemoryRouter initialEntries={['/top-artists']}>
                        <Routes>
                            <Route path="/top-artists" element={<TopArtistsPage />} />
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
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockRejectedValue(new Error('Network down'));

                render(
                    <MemoryRouter initialEntries={['/top-artists']}>
                        <Routes>
                            <Route path="/top-artists" element={<TopArtistsPage />} />
                        </Routes>
                    </MemoryRouter>
                );
        // Skeleton first frame
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading top artists/i);
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/network down/i);
    });

    test('shows error when API returns error property', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ artists: null, error: 'API failure' });
        render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => { expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument(); });
        expect(screen.getByRole('status')).toBeInTheDocument();
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/api failure/i);
    });

    test('renders empty artists list when API returns no artists', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ artists: [], error: null });
        render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => { expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument(); });
        expect(screen.getByRole('status')).toBeInTheDocument();
        const heading = await screen.findByRole('heading', { level:1, name: 'Your Top 0 Artists of the Month' });
        expect(heading).toBeInTheDocument();
        await waitFor(() => { expect(screen.queryByRole('status')).not.toBeInTheDocument(); });
        const list = screen.getByRole('list');
        expect(list.children.length).toBe(0);
    });

    test('cancels state updates on unmount before resolve', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        let resolveFn;
        const slowPromise = new Promise(resolve => { resolveFn = resolve; });
        const apiSpy = jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockReturnValue(slowPromise);
        const { unmount } = render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => { expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument(); });
        expect(screen.getByRole('status')).toBeInTheDocument();
        unmount();
        resolveFn({ artists: artistsData, error: null });
        await new Promise(r => setTimeout(r,0));
        expect(apiSpy).toHaveBeenCalledTimes(1);
    });

    test('cancels state updates on unmount before reject (generic error fallback)', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        let rejectFn;
        const slowPromise = new Promise((_, reject) => { rejectFn = reject; });
        const apiSpy = jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockReturnValue(slowPromise);
        const { unmount } = render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => { expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument(); });
        expect(screen.getByRole('status')).toBeInTheDocument();
        unmount();
        rejectFn({});
        await new Promise(r => setTimeout(r,0));
        expect(apiSpy).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('shows generic fallback error when rejection has no message', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(k => k === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockRejectedValue({});
        render(
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('artists-skeleton')).toBeInTheDocument();
        await waitFor(() => { expect(screen.queryByTestId('artists-skeleton')).not.toBeInTheDocument(); });
        expect(screen.getByRole('status')).toBeInTheDocument();
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/failed to load artists/i);
    });
});