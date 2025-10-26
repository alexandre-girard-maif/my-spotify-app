// pkce.js - Simplified PKCE helpers for Spotify authentication
// Provides a single high-level async helper to create a verifier/challenge pair
// and a small utility to derive a challenge for an existing verifier (if needed).

// Character set per RFC 7636 recommendations (allowing -._~ for URL safety)
const POSSIBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

function generateRandomVerifier(length = 128) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += POSSIBLE.charAt(Math.floor(Math.random() * POSSIBLE.length));
  }
  return out;
}

function base64UrlEncode(bytes) {
  let str = String.fromCharCode.apply(null, Array.from(bytes));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

export async function generateCodeChallenge(codeVerifier) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}

// High-level helper: returns { codeVerifier, codeChallenge }
export async function createPkcePair(length = 128) {
  const codeVerifier = generateRandomVerifier(length);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  return { codeVerifier, codeChallenge };
}

