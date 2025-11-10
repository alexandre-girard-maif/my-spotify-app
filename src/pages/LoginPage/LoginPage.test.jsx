import { describe, test, beforeEach, afterEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';
import { APP_NAME } from '../../constants/appMeta';
/* eslint-env node */

// Mock createPkcePair to avoid heavy crypto work and make deterministic assertions
jest.mock('../../api/pkce.js', () => ({
    createPkcePair: jest.fn().mockResolvedValue({ codeVerifier: 'verifier123', codeChallenge: 'challenge456' })
}));

const ORIGINAL_ENV = { ...globalThis.process?.env };

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    if (globalThis.process) {
        globalThis.process.env = { ...ORIGINAL_ENV };
    }
    jest.clearAllMocks();
});

describe('LoginPage', () => {
    test('renders heading', () => {
        // use explicit override prop to avoid relying on env mutation
        render(<LoginPage clientIdOverride="test-client-id" />);
        const heading = screen.getByRole('heading', { name: `Welcome to ${APP_NAME}` });
        expect(heading).toBeInTheDocument();
        // button should be enabled when client id provided via override
        expect(screen.getByRole('button', { name: /login with spotify/i })).toBeEnabled();
    });

    test('disabled state when client id missing', () => {
        render(<LoginPage />);

        // button should be disabled when no client id
        const button = screen.getByRole('button', { name: /login with spotify/i });
        expect(button).toBeDisabled();
        // announce error message
        expect(screen.getByRole('alert')).toHaveTextContent(/client id is not configured/i);
    });

    test('initiates login flow when client id present', async () => {
        let capturedUrl;
        render(<LoginPage clientIdOverride="test-client-id" onNavigate={(url) => { capturedUrl = url; }} />);
        const button = screen.getByRole('button', { name: /login with spotify/i });
        expect(button).toBeEnabled();
        fireEvent.click(button);
        await waitFor(() => {
            expect(localStorage.getItem('spotify_code_verifier')).toBe('verifier123');
        });
        expect(capturedUrl).toMatch(/https:\/\/accounts\.spotify\.com\/authorize\?/);
        expect(capturedUrl).toContain('client_id=test-client-id');
        // default redirect should be root when no redirect query param provided
        expect(localStorage.getItem('post_auth_redirect')).toBe('/');
    });
});