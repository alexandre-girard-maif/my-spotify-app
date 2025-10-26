/**
 * Fetch the user's top artists from Spotify.
 * @param {string} token - The Spotify access token.
 * @param {number} [limit=10] - The number of artists to fetch.
 * @param {string} [timeRange='short_term'] - The time range for top artists.
 * @returns {Promise<{ artists: object[], error: string|null }>} - The artists or an error message.
 */
export async function fetchUserTopArtists(token, limit = 10, timeRange = 'short_term') {
  if (!token) {
    return { error: 'No access token found.', artists: [] };
  }
  try {
    const res = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
      { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (data.error) {
      return { error: data.error.message, artists: [] };
    }
    return { artists: data.items || [], error: null };
  } catch {
    return { error: 'Failed to fetch top artists.', artists: [] };
  }
}
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

/**
 * Fetch the user's playlists from Spotify.
 * @param {string} token - The Spotify access token.
 * @param {number} [limit=10] - The number of playlists to fetch.
 * @returns {Promise<{ playlists: object[], error: string|null }>} - The playlists or an error message.
 */
export async function fetchUserPlaylists(token, limit = 10) {
  if (!token) {
    return { error: 'No access token found.', playlists: [] };
  }
  try {
    const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.error) {
      return { error: data.error.message, playlists: [] };
    }
    return { playlists: data.items || [], error: null };
  } catch {
    return { error: 'Failed to fetch playlists.', playlists: [] };
  }
}

/**
 * Fetch the user's top tracks from Spotify.
 * @param {string} token - The Spotify access token.
 * @param {number} [limit=10] - The number of tracks to fetch.
 * @param {string} [timeRange='short_term'] - The time range for top tracks.
 * @returns {Promise<{ tracks: object[], error: string|null }>} - The tracks or an error message.
 */
export async function fetchUserTopTracks(token, limit = 10, timeRange = 'short_term') {
  if (!token) {
    return { error: 'No access token found.', tracks: [] };
  }
  try {
    const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.error) {
      return { error: data.error.message, tracks: [] };
    }
    return { tracks: data.items || [], error: null };
  } catch {
    return { error: 'Failed to fetch top tracks.', tracks: [] };
  }
}
