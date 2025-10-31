import React from 'react';
import { Skeleton, SkeletonTextLines } from '../components/Skeleton.jsx';
import { useRequireToken } from '../hooks/useRequireToken.js';
import PlayListItem from '../components/PlayListItem.jsx';
import { fetchUserPlaylists } from '../api/spotify-me.js';
import './PlaylistsPage.css';
import './PageLayout.css';
import { useNavigate } from 'react-router-dom';

/**
 * Playlists Page
 * @returns {JSX.Element}
 */
export default function Playlists() {
  const navigate = useNavigate();
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
        if (res.error) {
          // if error is about access token expiry redirect to login
          if (res.error === 'The access token expired') {
            const { origin, pathname, search, hash } = globalThis.location;
            const fullTarget = `${origin}${pathname}${search}${hash}`;
            navigate(`/login?next=${encodeURIComponent(fullTarget)}`, { replace: true });
          } else {
            setError(res.error);
          }
        }
        setPlaylists(res.playlists || []);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load playlists'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, checking]);

  if (checking) {
    return (
      <div className="playlists-container page-container" data-testid="playlists-skeleton">
        <Skeleton width="55%" height="32px" />
        <Skeleton width="40%" height="24px" />
        <SkeletonTextLines lines={2} />
        <Skeleton count={4} height="56px" />
      </div>
    );
  }

  return (
    <div className="playlists-container page-container">
      <h1 className="playlists-title page-title">Your Playlists</h1>
      <h2 className="playlists-count">{playlists.length} Playlists</h2>
  {loading && <output className="playlists-loading">Loading playlists…</output>}
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
