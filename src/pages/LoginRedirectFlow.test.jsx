import { describe, expect, test } from '@jest/globals';
import { safeRedirect } from '../utils/redirect.js';

describe('safeRedirect', () => {
  test('keeps valid internal path', () => {
    expect(safeRedirect('/account')).toBe('/account');
  });
  test('rejects external absolute URL', () => {
    expect(safeRedirect('https://evil.com/attack')).toBe('/');
  });
  test('rejects protocol-relative URL', () => {
    expect(safeRedirect('//evil.com/attack')).toBe('/');
  });
  test('rejects missing leading slash', () => {
    expect(safeRedirect('account')).toBe('/');
  });
  test('rejects backslash in path', () => {
    expect(safeRedirect('/bad\\path')).toBe('/');
  });
  test('absolute URL falls back to root', () => {
    expect(safeRedirect('https://example.com/playlists?x=1')).toBe('/');
  });
});

describe('redirect param simulation', () => {
  test('stores sanitized redirect', () => {
    window.history.pushState({}, '', '/login?redirect=%2Ftop-tracks');
    const params = new URLSearchParams(globalThis.location.search);
    const raw = params.get('redirect');
    const decoded = raw ? decodeURIComponent(raw) : null;
    const safe = safeRedirect(decoded);
    localStorage.setItem('post_auth_redirect', safe);
    expect(localStorage.getItem('post_auth_redirect')).toBe('/top-tracks');
  });
});
