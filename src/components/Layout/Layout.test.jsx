// Layout.test.jsx

import { describe, expect, test } from '@jest/globals';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router';
import { version } from '../../../package.json';
import { APP_NAME } from '../../constants/appMeta';

describe('Layout Component', () => {
    test('renders the layout with correct elements', () => {
        render(<MemoryRouter><Layout /></MemoryRouter>);

        // Header
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
        const homeLink = screen.getByRole('link', { name: /go to home/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');

        // Navigation
        const topTracksLink = screen.getByRole('link', { name: /top tracks/i });
        expect(topTracksLink).toHaveAttribute('href', '/top-tracks');

        const topArtistsLink = screen.getByRole('link', { name: /top artists/i });
        expect(topArtistsLink).toHaveAttribute('href', '/top-artists');

        const playlistsLink = screen.getByRole('link', { name: /playlists/i });
        expect(playlistsLink).toHaveAttribute('href', '/playlists');

        // Footer
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent(`© ${new Date().getFullYear()} ${APP_NAME} – v${version}`);
    });
});