/**
 * Spotify API interaction functions with /me endpoints.
 */

import { SPOTIFY_API_BASE } from "./spotify-commons";

/**
 * Fetch the user's top artists from Spotify.
 * @param {string} token - The Spotify access token.
 * @param {number} [limit=10] - The number of artists to fetch.
 * @param {string} [timeRange='short_term'] - The time range for top artists.
 * @returns {Promise<{ artists: object[], error: string|null }>} - The artists or an error message.
 */
export async function fetchUserTopArtists(token, limit = 10, timeRange = 'short_term') {
  // early return if no token
  if (!token) {
    return { error: 'No access token found.', artists: [] };
  }

  try {
    // fetch top artists from Spotify API
    const res = await fetch(`${SPOTIFY_API_BASE}/me/top/artists?limit=${limit}&time_range=${timeRange}`,
      { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();

    // handle potential API error
    if (data.error) {
      return { error: data.error.message, artists: [] };
    }

    // return fetched artists
    return { artists: data.items, error: null };
  } catch {
    return { error: 'Failed to fetch top artists.', artists: [] };
  }
}

/**
 * Fetch the Spotify account profile for the given access token.
 * @param {string} token - The Spotify access token.
 * @returns {Promise<{ profile: object|null, error: string|null }>} - The account profile or an error message.
 */
export async function fetchAccountProfile(token) {
  // early return if no token
  if (!token) {
    return { error: 'No access token found.', profile: null };
  }

  try {
    // fetch account profile from Spotify API
    const res = await fetch(`${SPOTIFY_API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    // handle potential API error
    if (data.error) {
      return { error: data.error.message, profile: null };
    }

    // return fetched profile
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
  // early return if no token
  if (!token) {
    return { error: 'No access token found.', playlists: [] };
  }

  try {
    // fetch playlists from Spotify API
    const res = await fetch(`${SPOTIFY_API_BASE}/me/playlists?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    // handle potential API error
    if (data.error) {
      return { error: data.error.message, playlists: [] };
    }

    // return fetched playlists
    return { playlists: data.items, error: null };
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
  // early return if no token
  if (!token) {
    return { error: 'No access token found.', tracks: [] };
  }
  try {
    // fetch top tracks from Spotify API
    const res = await fetch(`${SPOTIFY_API_BASE}/me/top/tracks?limit=${limit}&time_range=${timeRange}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    // handle potential API error
    if (data.error) {
      return { error: data.error.message, tracks: [] };
    }
    // return fetched tracks
    return { tracks: data.items, error: null };
  } catch {
    return { error: 'Failed to fetch top tracks.', tracks: [] };
  }
}