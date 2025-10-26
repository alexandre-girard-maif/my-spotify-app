// src/api/spotify.js

/**
 * Fetch the Spotify account profile for the given access token.
 * @param {string} token - The Spotify access token.
 * @returns {Promise<{ profile: object|null, error: string|null }>} - The account profile or an error message.
 */
export async function fetchAccountProfile(token) {
  if (!token) {
    return { error: 'No access token found.', profile: null };
  }
  try {
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.error) {
      return { error: data.error.message, profile: null };
    }
    return { profile: data, error: null };
  } catch {
    return { error: 'Failed to fetch account info.', profile: null };
  }
}
