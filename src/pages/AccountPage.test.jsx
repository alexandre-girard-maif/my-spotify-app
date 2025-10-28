// src/pages/AccountPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
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

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('fetches and renders account profile, sets title', async () => {
        render(<AccountPage />);

        // Loading indicator initially
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
});