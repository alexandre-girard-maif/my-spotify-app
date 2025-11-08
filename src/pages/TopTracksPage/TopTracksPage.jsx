import { useState, useEffect } from 'react';
import { buildTitle } from '../../constants/appMeta.js';
import { useRequireToken } from '../../hooks/useRequireToken.js';
import './TopTracksPage.css';
import '../PageLayout.css';
import TrackItem from '../../components/TrackItem/TrackItem.jsx';
import { fetchUserTopTracks } from '../../api/spotify-me.js';
import { handleTokenError } from '../../utils/handleTokenError.js';
import { useNavigate } from 'react-router-dom';

/**
 * Number of top tracks to fetch
 */
export const limit = 10;

/** Time range for top tracks */
export const timeRange = 'short_term';

/**
 * TopTracks Page 
 * @returns {JSX.Element}
 */
export default function TopTracksPage() {
  // Initialize navigate function
  const navigate = useNavigate();

  // state for tracks data
  const [tracks, setTracks] = useState([]);

  // state for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // require token to fetch top tracks
  const { token } = useRequireToken();

  // set document title
  useEffect(() => { document.title = buildTitle('Top Tracks'); }, []);


  useEffect(() => {
    if (!token) return; // wait for check or redirect
    // fetch user top tracks when token changes
    fetchUserTopTracks(token, limit, timeRange)
      .then(res => {
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setTracks(res.data.items);
      })
      .catch(err => { setError(err.message); })
      .finally(() => { setLoading(false); });
  }, [token, navigate]);

  return (
    <section className="tracks-container page-container" aria-labelledby="tracks-title">
      <h1 id="tracks-title" className="tracks-title page-title" >Your Top {tracks.length} Tracks of the Month</h1>
      {loading && <output className="tracks-loading" data-testid="loading-indicator">Loading top tracks…</output>}
      {error && !loading && <div className="tracks-error" role="alert">{error}</div>}
      {!loading && !error && (
        <ol className="tracks-list">
          {tracks.map(track => (
            <TrackItem key={track.id} track={track} />
          ))}
        </ol>
      )}
    </section>
  );
}
