import React from 'react';
import { useRequireToken } from '../hooks/useRequireToken.js';
import TopArtistItem from '../components/TopArtistItem';
import { fetchUserTopArtists } from '../api/spotify.js';
import './TopArtistsPage.css';
import './PageLayout.css';

/**
 * Top Artists Page
 * @returns {JSX.Element}
 */
export default function TopArtists() {
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
        if (res.error) setError(res.error);
        setArtists(res.artists || []);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load artists'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, checking]);

  if (checking) {
    return <div className="artists-container page-container" />;
  }

  return (
    <div className="artists-container page-container">
      <h1 className="artists-title page-title">Your Top {artists.length} Artists of the Month</h1>
      {loading && <div className="artists-loading" role="status">Loading top artists…</div>}
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
