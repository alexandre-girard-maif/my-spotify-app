// src/pages/TopTracksPage.test.jsx

import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
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

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('fetches and renders top tracks, sets title', async () => {
        render(<TopTracksPage />);

        // Loading indicator shown initially
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

    test('shows error when access token missing', async () => {
        jest.restoreAllMocks();
        // No token in localStorage
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        // Ensure API not called
        const apiSpy = jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockResolvedValue({ tracks: [], error: null });

        render(<TopTracksPage />);

        // Loading should disappear quickly and show error
        await waitFor(() => {
            expect(screen.queryByRole('status')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('alert')).toHaveTextContent(/missing access token/i);
        expect(apiSpy).not.toHaveBeenCalled();
    });

    test('shows error when API call fails', async () => {
        jest.restoreAllMocks();
        // Token present
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        // API rejects
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockRejectedValue(new Error('Network down'));

        render(<TopTracksPage />);
        // Loading visible initially
        expect(screen.getByRole('status')).toHaveTextContent(/loading top tracks/i);

        // After failure, error displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/network down/i);
    });
});