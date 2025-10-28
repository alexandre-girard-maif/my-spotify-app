
import React from 'react';
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

  React.useEffect(() => {
    document.title = `Top Tracks | Spotify App`;
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('Missing access token');
      setLoading(false);
      return;
    }
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
  }, []);

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
