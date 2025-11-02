// src/utils/handleTokenError.js
// Centralizes handling of token expiry errors and redirecting to login.

/**
 * If error is 'The access token expired', redirect to login with next param.
 * @param {string|null} error - Error message from API
 * @param {function} navigate - React Router navigate function
 * @returns {boolean} true if redirected, false otherwise
 */
export function handleTokenError(error, navigate, loc = globalThis.location) {
  if (error === 'The access token expired') {
    const { origin, pathname, search, hash } = loc;
    const fullTarget = `${origin}${pathname}${search}${hash}`;
    navigate(`/login?next=${encodeURIComponent(fullTarget)}`, { replace: true });
    return true;
  }
  return false;
}
