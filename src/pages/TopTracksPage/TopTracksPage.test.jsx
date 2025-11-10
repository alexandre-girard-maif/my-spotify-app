// src/pages/TopTracksPage.test.jsx

import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopTracksPage, { limit, timeRange } from './TopTracksPage.jsx';
import * as spotifyApi from '../../api/spotify-me.js';
import { KEY_ACCESS_TOKEN } from '../../constants/storageKeys.js';
import { buildTitle } from '../../constants/appMeta.js';

// Mock top tracks data
const tracksData = {
    items: [
        { id: 'track1', name: 'Track One', artists: [{ name: 'Artist A' }], album: { name: 'Album X', images: [{ url: 'album-x.jpg' }] }, popularity: 80, external_urls: { spotify: 'https://open.spotify.com/track/track1' } },
        { id: 'track2', name: 'Track Two', artists: [{ name: 'Artist B' }], album: { name: 'Album Y', images: [{ url: 'album-y.jpg' }] }, popularity: 75, external_urls: { spotify: 'https://open.spotify.com/track/track2' } },
    ],
    total: 2
};

// Mock token value
const tokenValue = 'test-token';

// Tests for TopTracksPage
describe('TopTracksPage', () => {
    // Setup mocks before each test
    beforeEach(() => {
        // Mock localStorage token
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === KEY_ACCESS_TOKEN ? tokenValue : null);

        // Default mock: successful top tracks fetch
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockResolvedValue({ data: tracksData, error: null });
    });

    // Restore mocks after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // Helper to render TopTracksPage
    const renderTopTracksPage = () => {
        return render(
            // render TopTracksPage within MemoryRouter
            <MemoryRouter initialEntries={['/top-tracks']}>
                <Routes>
                    <Route path="/top-tracks" element={<TopTracksPage />} />
                    {/* Dummy login route for redirection when token is expired */}
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    // Helper to wait for loading to finish
    const waitForLoadingToFinish = async () => {
        // initial loading state expectations
        expect(screen.getByRole('status')).toHaveTextContent(/loading top tracks/i);
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });
    };

    test('renders top tracks page', async () => {
        // Render the TopTracksPage
        renderTopTracksPage();

        // Check document title
        expect(document.title).toBe(buildTitle('Top Tracks'));

        // wait for loading to finish
        await waitForLoadingToFinish();

        // when loading is done, verify playlists content rendered and api called correctly

        // should call fetchUserTopTracks with the token
        expect(spotifyApi.fetchUserTopTracks).toHaveBeenCalledTimes(1);
        expect(spotifyApi.fetchUserTopTracks).toHaveBeenCalledWith('test-token', limit, timeRange);

        // should render a heading of level 1 with text 'Your Top 2 Tracks of the Month'
        const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${tracksData.total} Tracks of the Month` });
        expect(heading).toBeInTheDocument();

        // verify each track item rendered, don't check details here as covered in track item tests
        for (const track of tracksData.items) {
            expect(await screen.findByTestId(`track-item-${track.id}`)).toBeInTheDocument();
        }
    });

    test('displays error message on fetchUserTopTracks error', async () => {
        // Mock fetchUserTopTracks to return an error
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockResolvedValue({ data: { items: [], total: 0 }, error: 'Failed to fetch top tracks' });

        // Render the TopTracksPage
        renderTopTracksPage();

        // wait for loading to finish
        await waitForLoadingToFinish();

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Failed to fetch top tracks');
    });

    test('displays error message on fetchUserTopTracks failure', async () => {
        // Mock fetchUserTopTracks to throw an error
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockRejectedValue(new Error('Network error'));

        // Render the TopTracksPage
        renderTopTracksPage();

        // wait for loading to finish
        await waitForLoadingToFinish();

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Network error');
    });

    test('redirects to login on token expiration', async () => {
        // Mock fetchUserTopTracks to return token expired error
        jest.spyOn(spotifyApi, 'fetchUserTopTracks').mockResolvedValue({ tracks: [], error: 'The access token expired' });

        // Render the TopTracksPage
        renderTopTracksPage();

        // Wait for loading to finish
        await waitForLoadingToFinish();

        // Verify redirection to login page
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    test('verify styling and accessibility attributes using role', async () => {
        // Render the TopTracksPage
        renderTopTracksPage();

        // wait for loading to finish
        await waitForLoadingToFinish();

        // should have div landmark with appropriate class names
        const region = screen.getByRole('region', { name: `Your Top ${tracksData.total} Tracks of the Month` });
        expect(region).toHaveClass('tracks-container', 'page-container');

        // should have heading level 1 with appropriate class name
        const heading1 = screen.getByRole('heading', { level: 1, name: `Your Top ${tracksData.total} Tracks of the Month` });
        expect(heading1).toHaveClass('tracks-title', 'page-title');

        // should have ordered list with appropriate class name
        const list = screen.getByRole('list');
        expect(list).toHaveClass('tracks-list');
    });
});