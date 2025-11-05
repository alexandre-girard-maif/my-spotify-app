import { describe, test, expect } from '@jest/globals';
import { normalizePostAuthTarget } from './redirect.js';

describe('normalizePostAuthTarget', () => {
  const mockLoc = { origin: 'https://example.com' };

  test('returns / when empty', () => {
    expect(normalizePostAuthTarget(null, mockLoc)).toBe('/');
    expect(normalizePostAuthTarget(undefined, mockLoc)).toBe('/');
    expect(normalizePostAuthTarget('', mockLoc)).toBe('/');

    expect(normalizePostAuthTarget(null)).toBe('/');
    expect(normalizePostAuthTarget(undefined)).toBe('/');
    expect(normalizePostAuthTarget('')).toBe('/');
  });

  test('accepts simple relative path', () => {
    expect(normalizePostAuthTarget(encodeURIComponent('/account'), mockLoc)).toBe('/account');
  });

  test('rejects path without leading slash', () => {
    expect(normalizePostAuthTarget(encodeURIComponent('account'), mockLoc)).toBe('/');
  });

  test('accepts same-origin absolute URL and strips origin', () => {
    const full = encodeURIComponent('https://example.com/playlist?id=1#top');
    expect(normalizePostAuthTarget(full, mockLoc)).toBe('/playlist?id=1#top');
  });

  test('rejects cross-origin absolute URL', () => {
    const full = encodeURIComponent('https://evil.com/steal');
    expect(normalizePostAuthTarget(full, mockLoc)).toBe('/');
  });

  test('handles already unencoded relative path', () => {
    expect(normalizePostAuthTarget('/stats', mockLoc)).toBe('/stats');
  });

  test('falls back on malformed URI sequence', () => {
    // '%E0%A4%A' is incomplete sequence
    expect(normalizePostAuthTarget('%E0%A4%A', mockLoc)).toBe('/');
  });
});
