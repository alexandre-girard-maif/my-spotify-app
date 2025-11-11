import { SPOTIFY_API_BASE } from "./spotify-commons.js";

/**
 * Fetch a Spotify playlist by its ID.
 * @param {string} token - The Spotify access token.
 * @param {string} playlistId - The ID of the playlist to fetch.
 * @returns {Promise<{ playlist: object|null, error: string|null }>} - The playlist data or an error message.
 */
export async function fetchPlaylistById(token, playlistId) {
  // early return if no token
  if (!token) {
    return { error: 'No access token found.', data: null };
  }
  try {
    // fetch playlist from Spotify API
    const res = await fetch(`${SPOTIFY_API_BASE}/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    // handle potential API error
    if (data.error) {
      return { error: data.error.message, data: null };
    }
    // return fetched playlist
    return { data, error: null };
  } catch {
    return { error: 'Failed to fetch playlist.', data: null };
  }
}
