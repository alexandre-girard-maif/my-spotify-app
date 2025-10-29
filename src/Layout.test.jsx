// Layout.test.jsx

import { describe, expect, test } from '@jest/globals';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router';
import { version } from '../package.json';

describe('Layout Component', () => {
    test('renders the layout with correct elements', () => {
        render(<MemoryRouter><Layout /></MemoryRouter>);
        
        // Header
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
        const titleElement = screen.getByText('My Spotify App');
        expect(titleElement).toBeInTheDocument();
        // Check if the title is wrapped in a link to home
        expect(titleElement.closest('a')).toHaveAttribute('href', '/');

        // Navigation
        const topTracksLink = screen.getByText('Top Tracks');
        expect(topTracksLink).toBeInTheDocument();
        expect(topTracksLink.closest('a')).toHaveAttribute('href', '/top-tracks');

        const topArtistsLink = screen.getByText('Top Artists');
        expect(topArtistsLink).toBeInTheDocument();
        expect(topArtistsLink.closest('a')).toHaveAttribute('href', '/top-artists');

        const playlistsLink = screen.getByText('Playlists');
        expect(playlistsLink).toBeInTheDocument();
        expect(playlistsLink.closest('a')).toHaveAttribute('href', '/playlists');

        // Footer
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent(`© ${new Date().getFullYear()} My Spotify App – v${version}`);
    expect(footerElement).toHaveTextContent(/Spotify and related trademarks are owned by Spotify AB/i);

    });
});