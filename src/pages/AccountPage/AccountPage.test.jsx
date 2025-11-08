// src/pages/AccountPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AccountPage from './AccountPage.jsx';
import * as spotifyApi from '../../api/spotify-me.js';
import { beforeEach, afterEach, jest } from '@jest/globals';

// Mock profile data
const profileData = {
    display_name: 'Test User',
    email: 'account@example.com',
    images: [{ url: 'https://via.placeholder.com/150' }],
    country: 'US',
    product: 'premium',
    external_urls: {
        spotify: 'https://open.spotify.com/user/account'
    }
};

// Mock token value
const tokenValue = 'test-token';

// Tests for AccountPage
describe('AccountPage', () => {
    // Setup mocks before each test
    beforeEach(() => {
        // Mock localStorage implementation to return a token when requested spotify_access_token
        
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
            if (key === 'spotify_access_token') return tokenValue;
            return null;
        });

        // Mock fetchAccountProfile to return the mock profile data
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ data: profileData, error: null });
    });

    // Restore mocks after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('renders account profile information', async () => {
        // when the profile page is rendered
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );

        // then

        // verify document title
        expect(document.title).toBe('Account | Spotify App');

        // should show loading state with text containing "loading account info"
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });


        // when loading is done, verify profile content rendered and api called correctly

        // should call fetchAccountProfile with the token
        expect(spotifyApi.fetchAccountProfile).toHaveBeenCalledTimes(1);
        expect(spotifyApi.fetchAccountProfile).toHaveBeenCalledWith(tokenValue);

        // should render a heading of level 1 with text 'Spotify Account Info'
        const heading = await screen.findByRole('heading', { level: 1, name: 'Spotify Account Info' });
        expect(heading).toBeInTheDocument();

        // should render the profile avatar image with correct src and alt text 'avatar'
        const img = await screen.findByAltText('avatar');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', profileData.images[0].url);
        expect(img).toHaveAttribute('alt', 'avatar');

        // should render a heading of level 2 with the user's display name
        const heading2 = await screen.findByRole('heading', { level: 2, name: profileData.display_name });
        expect(heading2).toBeInTheDocument();

        // should render profile details: email, country, product
        expect(await screen.findByText(profileData.email)).toBeInTheDocument();
        expect(await screen.findByText(profileData.country)).toBeInTheDocument();
        expect(await screen.findByText(profileData.product)).toBeInTheDocument();

        // should render a link to the user's Spotify profile
        const profileLink = await screen.findByRole('link', { name: 'Open Spotify Profile' });
        expect(profileLink).toBeInTheDocument();
        expect(profileLink).toHaveAttribute('href', profileData.external_urls.spotify);
    });

    test('displays error message on fetch failure', async () => {
        // mock fetchAccountProfile to return an error
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: 'Failed to fetch profile' });

        // when the profile page is rendered
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );

        // should show loading state with text containing "loading account info"
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // when loading is done, verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Failed to fetch profile');
    });

    test('displays error message on fetchUserPlaylists failure', async () => {
        // mock fetchAccountProfile to throw an error
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockRejectedValue(new Error('Network error'));

        // when the profile page is rendered
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );

        // should show loading state with text containing "loading account info"
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Network error');
    });

    test('redirects to login on token expiration', async () => {
        // mock fetchAccountProfile to return token expired error
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: 'The access token expired' });

        // when the profile page is rendered
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                    {/* Dummy login route for redirection when token is expired */}
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        // should show loading state with text containing "loading account info"
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify redirected to login
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});