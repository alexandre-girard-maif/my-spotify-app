// src/pages/AccountPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AccountPage from './AccountPage.jsx';
import * as spotifyApi from '../api/spotify.js';
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
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: profileData, error: null });
    });

    test('shows skeleton during initial auth checking before data load', async () => {
        // Token already mocked in beforeEach. Skeleton should render on first frame (checking state) before effect resolves.
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        const heading = await screen.findByRole('heading', { level: 1, name: 'Spotify Account Info' });
        expect(heading).toBeInTheDocument();
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

        // Skeleton first frame
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        // Wait for skeleton to be replaced by loading state
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);

        const heading = await screen.findByRole('heading', { level: 1, name: 'Spotify Account Info' });
        expect(heading).toBeInTheDocument();

        expect(document.title).toBe('Account | Spotify App');

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

        await waitFor(() => {
            expect(spotifyApi.fetchAccountProfile).toHaveBeenCalledTimes(1);
            expect(spotifyApi.fetchAccountProfile).toHaveBeenCalledWith(expect.any(String));
        });
    });

    test('redirects to login when access token missing', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
        const apiSpy = jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: null });
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
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
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockRejectedValue(new Error('Network down'));

        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        // Skeleton first frame
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toHaveTextContent(/loading account info/i);
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/network down/i);
    });

    test('shows error when API returns error property', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: 'API failure' });
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        // skeleton frame
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        // loading then error
        expect(screen.getByRole('status')).toBeInTheDocument();
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/api failure/i);
    });

    test('handles profile null with no error (no avatar rendered)', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockResolvedValue({ profile: null, error: null });
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        // loading appears then disappears when finished
        expect(screen.getByRole('status')).toBeInTheDocument();
        await waitFor(() => {
            // loading removed after fetch completes
            expect(screen.queryByRole('status')).not.toBeInTheDocument();
        });
        // no error, but also no profile elements
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(screen.queryByAltText('avatar')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1, name: 'Spotify Account Info' })).toBeInTheDocument();
    });

    test('cancels state updates on unmount before fetch resolves', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        let resolveFn;
        const slowPromise = new Promise(resolve => { resolveFn = resolve; });
        const apiSpy = jest.spyOn(spotifyApi, 'fetchAccountProfile').mockReturnValue(slowPromise);
        const { unmount } = render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        // skeleton frame present
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        // loading should be visible now
        expect(screen.getByRole('status')).toBeInTheDocument();
        // unmount before promise resolves
        unmount();
        // Resolve promise after unmount
        resolveFn({ profile: profileData, error: null });
        // Give microtasks a tick
        await new Promise(r => setTimeout(r, 0));
        // Assert fetch was called once but no error thrown (no state updates to cause act warnings)
        expect(apiSpy).toHaveBeenCalledTimes(1);
    });

    test('cancels state updates on unmount before fetch rejects (error branch)', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        let rejectFn;
        const slowPromise = new Promise((_, reject) => { rejectFn = reject; });
        const apiSpy = jest.spyOn(spotifyApi, 'fetchAccountProfile').mockReturnValue(slowPromise);
        const { unmount } = render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toBeInTheDocument();
        // Unmount then reject promise
        unmount();
        rejectFn(new Error('Delayed failure'));
        await new Promise(r => setTimeout(r, 0));
        expect(apiSpy).toHaveBeenCalledTimes(1);
        // Since component unmounted, no alert should appear
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('shows generic error when error has no message', async () => {
        jest.restoreAllMocks();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => key === 'spotify_access_token' ? 'test-token' : null);
        jest.spyOn(spotifyApi, 'fetchAccountProfile').mockRejectedValue({}); // no message property
        render(
            <MemoryRouter initialEntries={['/account']}>
                <Routes>
                    <Route path="/account" element={<AccountPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByTestId('account-skeleton')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('account-skeleton')).not.toBeInTheDocument();
        });
        expect(screen.getByRole('status')).toBeInTheDocument();
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent(/failed to load profile/i);
    });
});