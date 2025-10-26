// src/pages/WelcomePage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router-dom';

import WelcomePage from './WelcomePage.jsx';

describe('WelcomePage', () => {
    test('renders welcome message', () => {
        const Stub = createRoutesStub([
            {
                path: '/',
                Component: WelcomePage,
            }
        ]);

        const { container } = render(<Stub initialEntries={['/']} />);
        
        // get by class app-hero-title
        const titleElement = container.querySelector('.app-hero-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.textContent).toBe('Welcome to My Spotify App');

        // verify document title is set
        expect(document.title).toBe('Welcome | Spotify App');

        // verify links
        const topTracksLink = screen.getByText('Top Tracks');
        expect(topTracksLink).toBeInTheDocument();
        expect(topTracksLink.closest('a')).toHaveAttribute('href', '/top-tracks');

        const topArtistsLink = screen.getByText('Top Artists');
        expect(topArtistsLink).toBeInTheDocument();
        expect(topArtistsLink.closest('a')).toHaveAttribute('href', '/top-artists');

        const playlistsLink = screen.getByText('Playlists');
        expect(playlistsLink).toBeInTheDocument();
        expect(playlistsLink.closest('a')).toHaveAttribute('href', '/playlists');
    });
});
