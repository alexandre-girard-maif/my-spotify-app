import React from 'react';
import { Skeleton, SkeletonTextLines } from '../components/Skeleton.jsx';
import { useRequireToken } from '../hooks/useRequireToken.js';
import PlayListItem from '../components/PlayListItem.jsx';
import { fetchUserPlaylists } from '../api/spotify-me.js';
import { handleTokenError } from '../utils/handleTokenError.js';
import './PlaylistsPage.css';
import './PageLayout.css';
import { useNavigate } from 'react-router-dom';

/**
 * Number of playlists to fetch
 */
export const limit = 10;

/**
 * Playlists Page
 * @returns {JSX.Element}
 */
export default function PlaylistsPage() {
  // Initialize navigate function
  const navigate = useNavigate();

  // state for playlists data
  const [playlists, setPlaylists] = React.useState([]);

  // state for loading and error
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // require token to fetch playlists
  const { token } = useRequireToken();

  // Set document title
  React.useEffect(() => {
    document.title = `Playlists | Spotify App`;
  }, []);

  
  React.useEffect(() => {
    if (!token) return; // wait until check completes
    // fetch user playlists when token changes
    fetchUserPlaylists(token, limit)
      .then(res => {
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setPlaylists(res.playlists || []);
      })
      .catch(err => { setError(err.message); })
      .finally(() => { setLoading(false); });
  }, [token, navigate]);

  return (
    <div className="playlists-container page-container">
      <h1 className="playlists-title page-title">Your Playlists</h1>
      <h2 className="playlists-count">{limit} Playlists</h2>
      {loading && <output className="playlists-loading" data-testid="loading-indicator">Loading playlists…</output>}
      {error && !loading && <div className="playlists-error" role="alert">{error}</div>}
      {!loading && !error && (
        <ol className="playlists-list">
          {playlists.map((playlist) => (
            <PlayListItem key={playlist.id} playlist={playlist} />
          ))}
        </ol>
      )}
    </div>
  );
}
