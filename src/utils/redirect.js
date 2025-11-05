// Utility helpers for post-auth redirect handling.
// Normalizes a raw encoded target from query (?next or ?redirect) into a safe relative path.
// Rules:
//  - Accept both already-encoded or plain strings (one decode attempt)
//  - If absolute URL: only allow same-origin, strip origin, keep path+search+hash
//  - If relative path: must start with '/', otherwise fallback to '/'
//  - On any parsing/decoding error: fallback to '/'
//  - Never return empty string

/**
 * Normalize an encoded redirect target into a safe relative path for storage.
 * @param {string | null | undefined} encodedTarget Raw encoded value from query parameter (?next or ?redirect)
 * @param {Location} [loc=globalThis.location] Location object (can be mocked in tests)
 * @returns {string} Safe relative path beginning with '/'
 */
export function normalizePostAuthTarget(
  encodedTarget,
  loc = globalThis.location
) {
  if (!encodedTarget) return "/";
  try {
    const attempt = decodeURIComponent(encodedTarget);
    if (attempt.startsWith("http://") || attempt.startsWith("https://")) {
      const urlObj = new URL(attempt);
      if (urlObj.origin === loc.origin) {
        return (urlObj.pathname) + urlObj.search + urlObj.hash;
      }
      return "/";
    }
    return attempt.startsWith("/") ? attempt : "/";
  } catch {
    return "/";
  }
}
