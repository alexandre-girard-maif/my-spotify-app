// src/pages/TopTracksPage.test.jsx

import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopTracksPage from './TopTracksPage.jsx';
import * as spotifyApi from '../api/spotify.js';

const tracksData = [
    { id: 'track1', name: 'Track One', artists: [{ name: 'Artist A' }], album: { name: 'Album X', images: [{ url: 'album-x.jpg' }] }, popularity: 80, external_urls: { spotify: 'https://open.spotify.com/track/track1' } },
    { id: 'track2', name: 'Track Two', artists: [{ name: 'Artist B' }], album: { name: 'Album Y', images: [{ url: 'album-y.jpg' }] }, popularity: 75, external_urls: { spotify: 'https://open.spotify.com/track/track2' }  },
];

describe('TopTracksPage', () => {
    beforeEach(() => {
        // Mock localStorage token
        const tokenValue = 'test-token';
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
            if (key === 'spotify_access_token') return tokenValue;
            return null;
        });
        // Mock API call
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockResolvedValue({ tracks: tracksData, error: null });
    });

        test('shows skeleton during initial auth checking before data load', async () => {
                render(
                    <MemoryRouter initialEntries={['/top-tracks']}>
                        <Routes>
                            <Route path="/top-tracks" element={<TopTracksPage />} />
                        </Routes>
                    </MemoryRouter>
                );
                expect(screen.getByTestId('tracks-skeleton')).toBeInTheDocument();
                const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${tracksData.length} Tracks of the Month` });
                expect(heading).toBeInTheDocument();
        });

    afterEach(() => {
        jest.restoreAllMocks();
    });

        test('fetches and renders top tracks, sets title', async () => {
                render(
                    <MemoryRouter initialEntries={['/top-tracks']}>
                        <Routes>
                            <Route path="/top-tracks" element={<TopTracksPage />} />
                        </Routes>
                    </MemoryRouter>
                );

        // Skeleton first frame
        expect(screen.getByTestId('tracks-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('tracks-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading top tracks/i);

        // Heading updates after data load (length depends on tracksData length)
        const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${tracksData.length} Tracks of the Month` });
        expect(heading).toBeInTheDocument();

        // Document title set
        expect(document.title).toBe('Top Tracks | Spotify App');

        // Track items rendered
        for (const track of tracksData) {
            expect(await screen.findByTestId(`track-item-${track.id}`)).toBeInTheDocument();
        }

        // API called with expected params
        await waitFor(() => {
            expect(spotifyApi.fetchUserTopTracks).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchUserTopTracks).toHaveBeenCalledWith(expect.any(String), 10, 'short_term');
        });
    });

        test('redirects to login when access token missing', async () => {
        jest.restoreAllMocks();
        // No token in localStorage
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        // Ensure API not called
        const apiSpy = jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockResolvedValue({ tracks: [], error: null });
                render(
                    <MemoryRouter initialEntries={['/top-tracks']}>
                        <Routes>
                            <Route path="/top-tracks" element={<TopTracksPage />} />
                            <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
                        </Routes>
                    </MemoryRouter>
                );

                // Should navigate to login page
                await waitFor(() => {
                    expect(screen.getByTestId('login-page')).toBeInTheDocument();
                });
                expect(apiSpy).not.toHaveBeenCalled();
    });

    test('shows error when API call fails', async () => {
        jest.restoreAllMocks();
        // Token present
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        // API rejects
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockRejectedValue(new Error('Network down'));

                render(
                    <MemoryRouter initialEntries={['/top-tracks']}>
                        <Routes>
                            <Route path="/top-tracks" element={<TopTracksPage />} />
                        </Routes>
                    </MemoryRouter>
                );
        // Skeleton first frame
        expect(screen.getByTestId('tracks-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('tracks-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading top tracks/i);

        // After failure, error displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/network down/i);
    });
});