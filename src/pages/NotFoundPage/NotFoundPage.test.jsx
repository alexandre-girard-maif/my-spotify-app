// src/pages/NotFoundPage/NotFoundPage.test.jsx
import { describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';

describe('NotFoundPage', () => {
    test('renders 404 message, home button and sets document title', () => {
        const Stub = createRoutesStub([
            { path: '/non-existent', Component: NotFoundPage }
        ]);

        const { container } = render(<Stub initialEntries={['/non-existent']} />);

        const titleElement = container.querySelector('.notfound-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent('404 – Page Not Found');

        const messageElement = container.querySelector('.notfound-message');
        expect(messageElement).toBeInTheDocument();
        expect(messageElement).toHaveTextContent(/doesn’t exist/i);

        const button = screen.getByRole('button', { name: /go to home/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('notfound-home-btn');

        expect(document.title).toBe('Not Found | Spotify App');
    });

    test('navigates to home when button clicked', async () => {
        const HomeStub = () => <div data-testid="home-page">Home Page</div>;
        const Stub = createRoutesStub([
            { path: '/', Component: HomeStub },
            { path: '/missing', Component: NotFoundPage }
        ]);
        render(<Stub initialEntries={['/missing']} />);
        expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();
        const button = screen.getByRole('button', { name: /go to home/i });
        await userEvent.click(button);
        // After click, wait for home page content
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
    });
});
