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

    render(<Stub initialEntries={['/']} />);

    // Access title via text (not a semantic heading element in markup)
    // Text node may include unexpected whitespace/newlines; use regex matcher
    const titleElement = screen.getByText(/Welcome to My Spotify App/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Welcome to My Spotify App');

        // verify document title is set
        expect(document.title).toBe('Welcome | Spotify App');
    });
});
