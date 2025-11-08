import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { useEffect } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useRequireToken } from './useRequireToken.js';
import { KEY_ACCESS_TOKEN } from '../constants/storageKeys.js';

function HookConsumer({ onValue }) {
  const value = useRequireToken();
  useEffect(() => { onValue(value); }, [value, onValue]);
  return null;
}

describe('useRequireToken', () => {
  let getItemSpy;

  beforeEach(() => {
    // Mock localStorage
    getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns token after checking when token exists', async () => {
  getItemSpy.mockImplementation((key) => key === KEY_ACCESS_TOKEN ? 'token-value' : null);
    const values = [];
    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route path="/account" element={<HookConsumer onValue={(v)=>values.push(v)} />} />
        </Routes>
      </MemoryRouter>
    );
    // Initial state: checking true, token null
    expect(values[0]).toEqual({ token: null, checking: true });
    await waitFor(() => {
      const last = values[values.length-1];
      expect(last.checking).toBe(false);
    });
    const final = values[values.length-1];
    expect(final.token).toBe('token-value');
  });

  test('redirects to /login when token missing', async () => {
  getItemSpy.mockImplementation((key) => key === KEY_ACCESS_TOKEN ? null : null);
    const values = [];
    render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route path="/account" element={<HookConsumer onValue={(v)=>values.push(v)} />} />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(values[0]).toEqual({ token: null, checking: true });
    await waitFor(() => {
      const last = values[values.length-1];
      expect(last.checking).toBe(false);
    });
    const final = values[values.length-1];
    expect(final.token).toBe(null);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  test('cleanup prevents state update after unmount before microtask resolves', async () => {
    // Delay getItem until next tick and unmount earlier
  getItemSpy.mockImplementation((key) => key === KEY_ACCESS_TOKEN ? 'late-token' : null);
    const values = [];
    const { unmount } = render(
      <MemoryRouter initialEntries={['/account']}>
        <Routes>
          <Route path="/account" element={<HookConsumer onValue={(v)=>values.push(v)} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(values[0]).toEqual({ token: null, checking: true });
    // Unmount immediately before microtask runs
    unmount();
    // Allow microtasks flush
    await new Promise(r => setTimeout(r,0));
    // Should remain only initial value (no state updates after unmount)
    expect(values.length).toBe(1);
  });
});
