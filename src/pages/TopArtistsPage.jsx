import React from 'react';
import { Skeleton, SkeletonTextLines } from '../components/Skeleton.jsx';
import { useRequireToken } from '../hooks/useRequireToken.js';
import TopArtistItem from '../components/TopArtistItem';
import { fetchUserTopArtists } from '../api/spotify-me.js';
import { handleTokenError } from '../utils/handleTokenError.js';
import './TopArtistsPage.css';
import './PageLayout.css';
import { useNavigate } from 'react-router-dom';

/**
 * Top Artists Page
 * @returns {JSX.Element}
 */
export default function TopArtistsPage() {
  const navigate = useNavigate();
  const [artists, setArtists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const limit = 10;
  const timeRange = 'short_term';

  React.useEffect(() => {
    document.title = `Top Artists | Spotify App`;
  }, []);

  const { token, checking } = useRequireToken();

  React.useEffect(() => {
    if (checking || !token) return; // wait for auth check
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUserTopArtists(token, limit, timeRange)
      .then(res => {
        if (cancelled) return;
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setArtists(res.artists || []);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load artists'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, checking, navigate]);

  if (checking) {
    return (
      <div className="artists-container page-container" data-testid="artists-skeleton">
        <Skeleton width="70%" height="32px" />
        <SkeletonTextLines lines={2} />
        <Skeleton count={6} height="56px" />
      </div>
    );
  }

  return (
    <div className="artists-container page-container">
      <h1 className="artists-title page-title">Your Top {artists.length} Artists of the Month</h1>
      {loading && <output className="artists-loading">Loading top artists…</output>}
      {error && !loading && <div className="artists-error" role="alert">{error}</div>}
      {!loading && !error && (
        <ol className="artists-list">
          {artists.map((artist, i) => (
            <TopArtistItem key={artist.id} artist={artist} index={i} />
          ))}
        </ol>
      )}
    </div>
  );
}
