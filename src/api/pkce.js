// pkce.js - PKCE utility functions for Spotify authentication

/**
 * Generate a random string of the specified length.
 * @param {*} length 
 * @returns 
 */
export function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Generate a SHA-256 hash of the input string.
 * @param {*} plain 
 * @returns 
 */
export async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

/**
 * Base64 URL encode the input ArrayBuffer.
 * @param {*} arrayBuffer 
 * @returns 
 */
export function base64UrlEncode(arrayBuffer) {
  let str = String.fromCharCode.apply(null, Array.from(arrayBuffer));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Generate a code challenge from the code verifier.
 * @param {*} codeVerifier 
 * @returns 
 */
export async function generateCodeChallenge(codeVerifier) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}
