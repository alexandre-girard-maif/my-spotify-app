import React from 'react';
import { useRequireToken } from '../hooks/useRequireToken.js';
import PlayListItem from '../components/PlayListItem.jsx';
import { fetchUserPlaylists } from '../api/spotify.js';
import './PlaylistsPage.css';
import './PageLayout.css';

/**
 * Playlists Page
 * @returns {JSX.Element}
 */
export default function Playlists() {
  const [playlists, setPlaylists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const limit = 10;

  React.useEffect(() => {
    document.title = `Playlists | Spotify App`;
  }, []);

  const { token, checking } = useRequireToken();

  React.useEffect(() => {
    if (checking || !token) return; // wait until check completes
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUserPlaylists(token, limit)
      .then(res => {
        if (cancelled) return;
        if (res.error) setError(res.error);
        setPlaylists(res.playlists || []);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load playlists'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, checking]);

  if (checking) {
    return <div className="playlists-container page-container" />;
  }

  return (
    <div className="playlists-container page-container">
      <h1 className="playlists-title page-title">Your Playlists</h1>
      <h2 className="playlists-count">{playlists.length} Playlists</h2>
      {loading && <div className="playlists-loading" role="status">Loading playlists…</div>}
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
