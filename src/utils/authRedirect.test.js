import { describe, expect, test, beforeEach } from '@jest/globals';
import { storePostAuthRedirect, consumePostAuthRedirect } from './authRedirect.js';
import { KEY_POST_AUTH_REDIRECT } from '../constants/storageKeys.js';

describe('authRedirect utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('storePostAuthRedirect normalizes invalid targets to root', () => {
    expect(storePostAuthRedirect(undefined)).toBe('/');
    expect(storePostAuthRedirect('')).toBe('/');
    expect(storePostAuthRedirect('account')).toBe('/');
    expect(localStorage.getItem(KEY_POST_AUTH_REDIRECT)).toBe('/');
  });

  test('storePostAuthRedirect keeps leading slash targets', () => {
    expect(storePostAuthRedirect('/account')).toBe('/account');
    expect(localStorage.getItem(KEY_POST_AUTH_REDIRECT)).toBe('/account');
  });

  test('consumePostAuthRedirect returns stored value and clears key', () => {
    storePostAuthRedirect('/stats');
    const consumed = consumePostAuthRedirect();
    expect(consumed).toBe('/stats');
    expect(localStorage.getItem(KEY_POST_AUTH_REDIRECT)).toBeNull();
  });

  test('consumePostAuthRedirect falls back to root when missing or invalid', () => {
    expect(consumePostAuthRedirect()).toBe('/');
    // simulate invalid stored value
    localStorage.setItem(KEY_POST_AUTH_REDIRECT, 'stats');
    expect(consumePostAuthRedirect()).toBe('/');
  });
});
