
import React from 'react';
import { Skeleton, SkeletonTextLines } from '../components/Skeleton.jsx';
import { useRequireToken } from '../hooks/useRequireToken.js';
import './TopTracksPage.css';
import './PageLayout.css';
import TrackItem from '../components/TrackItem.jsx';
import { fetchUserTopTracks } from '../api/spotify-me.js';
import { handleTokenError } from '../utils/handleTokenError.js';
import { useNavigate } from 'react-router-dom';

/**
 * TopTracks Page 
 * @returns {JSX.Element}
 */
export default function TopTracksPage() {
  const navigate = useNavigate();
  const [tracks, setTracks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const limit = 10;
  const timeRange = 'short_term';

  // set document title
  React.useEffect(() => {
    document.title = `Top Tracks | Spotify App`;
  }, []);

  const { token, checking } = useRequireToken();

  React.useEffect(() => {
    if (checking || !token) return; // wait for check or redirect
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUserTopTracks(token, limit, timeRange)
      .then(res => {
        if (cancelled) return;
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setTracks(res.tracks || []);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load tracks'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, checking, navigate]);

  if (checking) {
    return (
      <div className="tracks-container page-container" data-testid="tracks-skeleton">
        <Skeleton width="70%" height="32px" />
        <SkeletonTextLines lines={2} />
        <Skeleton count={5} height="56px" />
      </div>
    );
  }

  return (
    <div className="tracks-container page-container">
      <h1 className="tracks-title page-title">Your Top {tracks.length} Tracks of the Month</h1>
  {loading && <output className="tracks-loading">Loading top tracks…</output>}
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
