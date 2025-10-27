// pkce.js - Simplified PKCE helpers for Spotify authentication.
//
// Overview:
//  - generateRandomVerifier: securely creates a code_verifier (RFC 7636) using crypto.getRandomValues.
//  - generateCodeChallenge: derives the S256 code_challenge from a code_verifier.
//  - createPkcePair: convenience helper returning { codeVerifier, codeChallenge }.
//
// Security Notes:
//  - Uses Web Crypto API for entropy (crypto.getRandomValues + subtle.digest SHA-256).
//  - Character set includes unreserved URL characters per RFC 7636 (ALPHA / DIGIT / "-" / "." / "_" / "~").
//  - No fallback to Math.random; throws if secure crypto is unavailable so tests/SSR must polyfill.
//
// Usage Example:
//   const { codeVerifier, codeChallenge } = await createPkcePair();
//   localStorage.setItem('spotify_code_verifier', codeVerifier);
//   // Send codeChallenge to authorization endpoint.

// Character set per RFC 7636 recommendations (allowing -._~ for URL safety)
const POSSIBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

/**
 * Obtain a crypto implementation that supports getRandomValues.
 * Throws if not present to avoid insecure fallback.
 * Test environments / SSR must polyfill globalThis.crypto before importing this module.
 * @returns {Crypto} Web Crypto API interface.
 * @throws {Error} when crypto.getRandomValues is unavailable.
 */
function getCrypto() {
  if (globalThis.crypto?.getRandomValues) {
    return globalThis.crypto;
  }
  // Fallback intentionally omitted; enforce secure environment.
  throw new Error('Secure crypto not available: PKCE verifier generation requires crypto.getRandomValues');
}

/**
 * Generate a high-entropy PKCE code_verifier string.
 * Uses secure random bytes mapped into the allowed unreserved character set.
 * @param {number} [length=128] Desired length (RFC 7636 recommends 43..128).
 * @returns {string} code_verifier consisting only of RFC 7636 unreserved characters.
 */
function generateRandomVerifier(length = 128) {
  const cryptoObj = getCrypto();
  const bytes = new Uint8Array(length);
  cryptoObj.getRandomValues(bytes);
  // Map each byte to a character in POSSIBLE via modulo.
  let out = '';
  for (let i = 0; i < length; i++) {
    out += POSSIBLE.charAt(bytes[i] % POSSIBLE.length);
  }
  return out;
}

/**
 * Convert binary data to base64url string (no padding, URL safe).
 * @param {Uint8Array} bytes Input bytes.
 * @returns {string} Base64URL encoded string.
 */
function base64UrlEncode(bytes) {
  let str = String.fromCharCode.apply(null, Array.from(bytes));
  return btoa(str)
    .replaceAll('+', '-') // replace for URL safety
    .replaceAll('/', '_') // replace for URL safety
    .split('=')[0]; // safely remove padding without regex
}

/**
 * Compute SHA-256 digest of a UTF-8 string.
 * @param {string} input Source string.
 * @returns {Promise<Uint8Array>} SHA-256 digest bytes.
 */
async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

/**
 * Derive the PKCE S256 code_challenge from a code_verifier.
 * @param {string} codeVerifier The original high-entropy verifier.
 * @returns {Promise<string>} URL-safe base64 SHA-256 digest.
 */
export async function generateCodeChallenge(codeVerifier) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}

// High-level helper: returns { codeVerifier, codeChallenge }
/**
 * Convenience helper producing both code_verifier and corresponding S256 code_challenge.
 * @param {number} [length=128] Length of the verifier (43..128 per spec; default max).
 * @returns {Promise<{codeVerifier: string, codeChallenge: string}>} Pair object.
 */
export async function createPkcePair(length = 128) {
  const codeVerifier = generateRandomVerifier(length);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}

