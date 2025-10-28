
import React from 'react';
import { useRequireToken } from '../hooks/useRequireToken.js';
import './TopTracksPage.css';
import './PageLayout.css';
import TrackItem from '../components/TrackItem.jsx';
import { fetchUserTopTracks } from '../api/spotify.js';

/**
 * TopTracks Page 
 * @returns {JSX.Element}
 */
export default function TopTracks() {
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const limit = 10;
  const timeRange = 'short_term';

  // set document title
  React.useEffect(() => {
    document.title = `Top Tracks | Spotify App`;
  }, []);

  const token = useRequireToken();

  React.useEffect(() => {
    if (!token) return; // redirect in hook
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUserTopTracks(token, limit, timeRange)
      .then(res => {
        if (cancelled) return;
        if (res.error) setError(res.error);
        setTracks(res.tracks || []);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load tracks'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className="tracks-container page-container">
      <h1 className="tracks-title page-title">Your Top {tracks.length} Tracks of the Month</h1>
      {loading && <div className="tracks-loading" role="status">Loading top tracks…</div>}
      {error && !loading && <div className="tracks-error" role="alert">{error}</div>}
      {!loading && !error && (
        <ol className="tracks-list">
          {tracks.map(track => (
            <TrackItem key={track.id} track={track} />
          ))}
        </ol>
      )}
    </div>
  );
}
