// src/pages/AccountPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AccountPage from './AccountPage';
import { createRoutesStub } from 'react-router-dom';
import { act } from 'react';

const profileData = {
  display_name: 'Account Information',
  email: 'account@example.com',
  images: [{ url: 'https://via.placeholder.com/150' }],
  country: 'US',
  product: 'premium',
  external_urls: {
    spotify: 'https://open.spotify.com/user/account'
  }
};

describe('AccountPage', () => {
    const Stub = createRoutesStub([
        { 
            path: '/account', 
            Component: AccountPage, 
            loader: async () => ({
                profile: profileData,
                error: null,
            }),
            HydrateFallback: () => null, // No fallback needed for this test
        }
    ]);
    test('sets the document title correctly', async () => {
        act(() => {
            render(<Stub initialEntries={['/account']} />);
        });

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 1, name: 'Spotify Account Info' })
        expect(heading).toBeInTheDocument()

        // expect the document title to be set
        expect(document.title).toBe('Account | Spotify App')

        // Verify profile details are rendered
        const email = await screen.findByText(profileData.email)
        expect(email).toBeInTheDocument()

        const country = await screen.findByText(profileData.country)
        expect(country).toBeInTheDocument()

        const product = await screen.findByText(profileData.product)
        expect(product).toBeInTheDocument()

        // uncomment below to debug screen
        // screen.debug();
    });
});