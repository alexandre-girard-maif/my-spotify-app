// src/components/PlayListItem.test.jsx
import React from 'react';

import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PlayListItem from './PlayListItem';

describe('PlayListItem component', () => {
    test('renders playlist information correctly', () => {
        const playlist = {
            id: 'playlist1',
            name: 'Test Playlist',
            images: [{ url: 'test.jpg' }],
            owner: { display_name: 'Test Owner' },
            tracks: { total: 15 },
            external_urls: { spotify: 'https://open.spotify.com/playlist/playlist1' }
        };
        render(<PlayListItem playlist={playlist} />);
        expect(screen.getByText('Test Playlist')).toBeInTheDocument();
        expect(screen.getByText('By Test Owner')).toBeInTheDocument();
        expect(screen.getByText('15 tracks')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', 'https://open.spotify.com/playlist/playlist1');
    });
});
