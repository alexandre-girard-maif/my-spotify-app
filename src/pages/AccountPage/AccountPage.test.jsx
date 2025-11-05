// src/pages/AccountPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AccountPage from './AccountPage.jsx';
import * as spotifyApi from '../../api/spotify-me.js';
import { beforeEach, afterEach, jest } from '@jest/globals';

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

describe('AccountPage', () => {
    beforeEach(() => {
        const tokenValue = 'test-token';
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
            if (key === 'spotify_access_token') return tokenValue;
            return null;
        });
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ data: profileData, error: null });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('fetches and renders account profile, sets title', async () => {
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(document.title).toBe('Account | Spotify App');

        // loading state
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify profile content rendered
        const heading = await screen.findByRole('heading', { level: 1, name: 'Spotify Account Info' });
        expect(heading).toBeInTheDocument();

        const img = await screen.findByAltText('avatar');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', profileData.images[0].url);

        const heading2 = await screen.findByRole('heading', { level: 2, name: profileData.display_name });
        expect(heading2).toBeInTheDocument();

        expect(await screen.findByText(profileData.email)).toBeInTheDocument();
        expect(await screen.findByText(profileData.country)).toBeInTheDocument();
        expect(await screen.findByText(profileData.product)).toBeInTheDocument();

        const profileLink = await screen.findByRole('link', { name: 'Open Spotify Profile' });
        expect(profileLink).toBeInTheDocument();
        expect(profileLink).toHaveAttribute('href', profileData.external_urls.spotify);

        // verify API called correctly
        await waitFor(() => {
            expect(spotifyApi.fetchAccountProfile).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchAccountProfile).toHaveBeenCalledWith(expect.any(String));
        });
    });

    test('displays error message on fetch failure', async () => {
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: 'Failed to fetch profile' });

        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify error message displayed
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Failed to fetch profile');
    });

    test('displays error message on fetchUserPlaylists failure', async () => {
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockRejectedValue(new Error('Network error'));

        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
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

    test('redirects to login on token expiration', async () => {
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: 'The access token expired' });

        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        // loading state
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        // wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
        });

        // verify redirected to login
        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});