// src/pages/TopArtistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopArtistsPage, { limit, timeRange } from './TopArtistsPage.jsx';
import * as spotifyApi from '../../api/spotify-me.js';
import { beforeEach, afterEach, jest } from '@jest/globals';
import { KEY_ACCESS_TOKEN } from '../../constants/storageKeys.js';
import { buildTitle } from '../../constants/appMeta.js';

// Mock top artists data
const artistsData = {
    items: [
        { id: 'artist1', name: 'Top Artist 1', images: [{ url: 'https://via.placeholder.com/56' }], external_urls: { spotify: 'https://open.spotify.com/artist/artist1' }, genres: ['pop', 'rock'], followers: { total: 1000 } },
        { id: 'artist2', name: 'Top Artist 2', images: [{ url: 'https://via.placeholder.com/56' }], external_urls: { spotify: 'https://open.spotify.com/artist/artist2' }, genres: ['jazz'], followers: { total: 500 } },
    ], total: 2
};

// Mock token value
const tokenValue = 'test-token';

// Tests for TopArtistsPage
describe('TopArtistsPage', () => {
    // Setup mocks before each test
    beforeEach(() => {
        // Mock localStorage token access
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === KEY_ACCESS_TOKEN ? tokenValue : null);

        // Default mock: successful top artists fetch
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ data: artistsData, error: null });
    });

    // Restore mocks after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    // Helper to render TopArtistsPage
    const renderTopArtistsPage = () => {
        return render(
            // render TopArtistsPage within MemoryRouter
            <MemoryRouter initialEntries={['/top-artists']}>
                <Routes>
                    <Route path="/top-artists" element={<TopArtistsPage />} />
                    {/* Dummy login route for redirection when token is expired */}
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    // Helper to wait for loading to finish
    const waitForLoadingToFinish = async () => {
        // initial loading state expectations
        expect(screen.getByRole('status')).toHaveTextContent(/loading top artists/i);
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });
    };

    test('fetches and renders top artists, sets title', async () => {
        // Render the TopArtistsPage
        renderTopArtistsPage();

        // Check document title
        expect(document.title).toBe(buildTitle('Top Artists'));

        // wait for loading to finish
        await waitForLoadingToFinish();

        // when loading is done, verify top artists content rendered and api called correctly

        // should call fetchUserTopArtists with the token
        expect(spotifyApi.fetchUserTopArtists).toHaveBeenCalledTimes(1);
        expect(spotifyApi.fetchUserTopArtists).toHaveBeenCalledWith(tokenValue, limit, timeRange);

        // should render a heading of level 1 with text 'Your Top Artists of the Month'
        const heading = await screen.findByRole('heading', { level: 1, name: `Your Top ${limit} Artists of the Month` });
        expect(heading).toBeInTheDocument();

        // verify each artist item rendered, don't check details here as covered in ArtistItem tests
        for (const artist of artistsData.items) {
            expect(await screen.findByTestId(`top-artist-item-${artist.id}`)).toBeInTheDocument();
        }
    });

    test('displays error message on fetchUserTopArtists error', async () => {
        // Mock fetchUserTopArtists to return an error
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ data: { items: [] }, error: 'Failed to fetch top artists' });

        // Render the TopArtistsPage
        renderTopArtistsPage();

        // wait for loading to finish
        await waitForLoadingToFinish();

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/failed to fetch top artists/i);
    });

    test('displays error message on fetchUserTopArtists failure', async () => {
        // Mock fetchUserTopArtists to throw an error
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockRejectedValue(new Error('Network error'));

        // Render the TopArtistsPage
        renderTopArtistsPage();

        // wait for loading to finish
        await waitForLoadingToFinish();

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Network error');
    });

    test('redirects to login on token expiration', async () => {
        // Mock fetchUserTopArtists to return token expired error
        jest.spyOn(spotifyApi, 'fetchUserTopArtists').mockResolvedValue({ artists: [], error: 'The access token expired' });

        // Render the TopArtistsPage
        renderTopArtistsPage();

        // Wait for loading to finish
        await waitForLoadingToFinish();

        // Verify redirection to login page
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });

    test('verify styling and accessibility attributes using role', async () => {
        // Render the TopArtistsPage
        renderTopArtistsPage();

        // wait for loading to finish
        await waitForLoadingToFinish();

        // should have section landmark with appropriate class names
        const region = screen.getByRole('region', { name: `Your Top ${limit} Artists of the Month` });
        expect(region).toHaveClass('artists-container', 'page-container');

        // should have heading level 1 with appropriate class name
        const heading1 = screen.getByRole('heading', { level: 1, name: `Your Top ${limit} Artists of the Month` });
        expect(heading1).toHaveClass('artists-title', 'page-title');

        // should have ordered list with appropriate class name
        const list = screen.getByRole('list');
        expect(list).toHaveClass('artists-list');
    });
});