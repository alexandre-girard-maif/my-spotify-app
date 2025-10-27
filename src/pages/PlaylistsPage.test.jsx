// src/pages/PlaylistsPage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlaylistsPage from '././PlaylistsPage';
import { createRoutesStub } from 'react-router-dom';
import { act } from 'react';

const playlistsData = [
    { id: 'playlist1', name: 'My Playlist 1', images: [{ url: 'https://via.placeholder.com/56' }], owner: { display_name: 'User1' }, tracks: { total: 5 }, external_urls: { spotify: 'https://open.spotify.com/playlist/playlist1' } },
    { id: 'playlist2', name: 'My Playlist 2', images: [{ url: 'https://via.placeholder.com/56' }], owner: { display_name: 'User2' }, tracks: { total: 10 }, external_urls: { spotify: 'https://open.spotify.com/playlist/playlist2' }  },
];

describe('PlaylistsPage', () => {
    const Stub = createRoutesStub([
        { 
            path: '/playlists', 
            Component: PlaylistsPage, 
            loader: async () => ({
                playlists: playlistsData,
                error: null,
            }),
            HydrateFallback: () => null, // No fallback needed for this test
        }
    ]);

    test('sets the document title correctly', async () => {
        act(() => {
            render(<Stub initialEntries={['/playlists']} />);
        });

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 1, name: 'Your Playlists' })
        expect(heading).toBeInTheDocument()


        // expect the document title to be set
        expect(document.title).toBe('Playlists | Spotify App')

        const countHeading = await screen.findByRole('heading', { level: 2, name: `${playlistsData.length} Playlists` })
        expect(countHeading).toBeInTheDocument()

        // Verify all playlist items are rendered
        for (const playlist of playlistsData) {
            const playlistItem = await screen.findByTestId(`playlist-item-${playlist.id}`);
            expect(playlistItem).toBeInTheDocument()
        }

        // uncomment below to debug screen
        // screen.debug();
    });
});
