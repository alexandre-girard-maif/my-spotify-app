// Utility helpers for storing and consuming the post-auth redirect target
import { KEY_POST_AUTH_REDIRECT } from '../constants/storageKeys.js';

/**
 * Store post-auth redirect target (defaults to '/')
 * Normalizes falsy input.
 * @param {string|undefined|null} target
 */
export function storePostAuthRedirect(target) {
  const value = (typeof target === 'string' && target.startsWith('/')) ? target : '/';
  localStorage.setItem(KEY_POST_AUTH_REDIRECT, value);
  return value;
}

/**
 * Consume (read & remove) post-auth redirect target; returns '/' fallback.
 * @returns {string}
 */
export function consumePostAuthRedirect() {
  const raw = localStorage.getItem(KEY_POST_AUTH_REDIRECT);
  localStorage.removeItem(KEY_POST_AUTH_REDIRECT);
  if (raw && raw.startsWith('/')) return raw;
  return '/';
}
