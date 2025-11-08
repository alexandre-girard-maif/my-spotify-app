// src/App.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock pages that might use Vite-specific import.meta features
jest.mock('./pages/Callback.jsx', () => () => <div data-testid="callback-page">Callback Page</div>);
jest.mock('./pages/LoginPage/LoginPage.jsx', () => () => <div data-testid="login-page">Login Page</div>);

import App from './App.jsx';
import { APP_NAME } from './constants/appMeta.js';

describe('App basic render', () => {
    test('renders welcome page content and navigation', () => {
        render(<App />);
        // Welcome title (div with text content)
    // Assert dynamic branding using APP_NAME constant
    expect(screen.getByText(new RegExp(`welcome to ${APP_NAME.toLowerCase()}`, 'i'))).toBeInTheDocument();
        // One of the nav links to confirm layout rendered
        expect(screen.getByRole('link', { name: /top tracks/i })).toBeInTheDocument();
    });
});
  