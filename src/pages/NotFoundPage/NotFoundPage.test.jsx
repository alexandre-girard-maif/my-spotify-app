// src/pages/NotFoundPage/NotFoundPage.test.jsx
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import { buildTitle } from '../../constants/appMeta.js';

// Tests for NotFoundPage
describe('NotFoundPage', () => {
    // Helper to render NotFoundPage
    const renderNotFoundPage = () => {
        return render(
            // render NotFoundPage within MemoryRouter
            <MemoryRouter initialEntries={['/non-existent']}>
                <Routes>
                    <Route path="/non-existent" element={<NotFoundPage />} />
                    <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    test('renders 404 message, home button and sets document title', () => {
        // Render the NotFoundPage
        renderNotFoundPage();

        // Check document title
        expect(document.title).toBe(buildTitle('Not Found'));

        // should render a heading of level 1 with text '404 – Page Not Found'
        const titleElement = screen.getByRole('heading', { name: /404.*Page Not Found/i });
        expect(titleElement).toBeInTheDocument();
        
        // should render the message about non-existence
        const messageElement = screen.getByText(/doesn’t exist/i);
        expect(messageElement).toBeInTheDocument();

        // should render a button to go home
        const button = screen.getByRole('button', { name: /go to home/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('notfound-home-btn');
    });

    test('navigates to home when button clicked', async () => {
        // Render the NotFoundPage
        renderNotFoundPage();

        // when clicking the home button, should navigate to home page
        const button = screen.getByRole('button', { name: /go to home/i });
        await userEvent.click(button);

        // After click, wait for home page content
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
});
