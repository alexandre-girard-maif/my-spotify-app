// redirect.js - helpers for validating internal redirect paths
// Ensures we only navigate to same-origin internal routes and avoid open redirects.
// Rules:
//  - Accept only strings starting with '/' (no protocol, no '//').
//  - Reject paths containing backslashes or starting with '//' (potential protocol-relative).
//  - Fallback to '/' when invalid.
//  - Strip any origin if accidentally provided.

/**
 * Validate and sanitize an internal redirect path.
 * @param {string|null|undefined} input Raw redirect value.
 * @returns {string} Safe path (leading slash) or '/'.
 */
export function safeRedirect(input) {
  if (typeof input !== 'string' || input.length === 0) return '/';
  // Remove origin portion if a full URL was mistakenly given.
  // Absolute URLs are not allowed – treat as unsafe and fallback.
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(input)) return '/';
  if (input.startsWith('//')) return '/';
  if (!input.startsWith('/')) return '/';
  if (input.includes('\\')) return '/';
  // Basic normalization: collapse multiple leading slashes (already prevented above)
  return input === '' ? '/' : input;
}
