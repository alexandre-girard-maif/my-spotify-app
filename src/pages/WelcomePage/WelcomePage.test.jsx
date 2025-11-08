// src/pages/WelcomePage.test.jsx

import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import WelcomePage from './WelcomePage.jsx';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('WelcomePage', () => {
    // Helpter to render WelcomePage
    const renderWelcomePage = () => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('renders welcome message', () => {
        // Render the WelcomePage
        renderWelcomePage();

        // Check document title
        expect(document.title).toBe('Welcome | Spotify App');

        // Check for welcome message
        const welcomeMessage = screen.getByText(/Welcome to My Spotify App/i);
        expect(welcomeMessage).toBeInTheDocument();

        // should have a description paragraph
        const description = screen.getByText(/Explore your Spotify music stats, discover your top tracks and artists, and browse your playlists./i);
        expect(description).toBeInTheDocument();
    });

    test('verify styling and accessibility attributes using role', async () => {
        // Render the WelcomePage
        renderWelcomePage();

        // should have div landmark with appropriate class names
        const mainContainer = screen.getByRole('region');
        expect(mainContainer).toHaveClass('welcome-bg page-container');
    });
});
