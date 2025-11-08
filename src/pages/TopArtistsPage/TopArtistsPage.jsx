import { useState, useEffect } from 'react';
import { buildTitle } from '../../constants/appMeta.js';
import { useRequireToken } from '../../hooks/useRequireToken.js';
import TopArtistItem from '../../components/TopArtistItem/TopArtistItem.jsx';
import { fetchUserTopArtists } from '../../api/spotify-me.js';
import { handleTokenError } from '../../utils/handleTokenError.js';
import './TopArtistsPage.css';
import '../PageLayout.css';
import { useNavigate } from 'react-router-dom';

/**
 * Number of artists to fetch
 */
export const limit = 10;

/** 
 * Time range for top artists
 */
export const timeRange = 'short_term';

/**
 * Top Artists Page
 * @returns {JSX.Element}
 */
export default function TopArtistsPage() {
  // Initialize navigate function
  const navigate = useNavigate();

  // state for artists data
  const [artists, setArtists] = useState([]);

  // state for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // require token to fetch playlists
  const { token } = useRequireToken();

  // Set document title
  useEffect(() => { document.title = buildTitle('Top Artists'); }, []);

  useEffect(() => {
    if (!token) return; // wait for auth check
    // fetch user top artists when token changes
    fetchUserTopArtists(token, limit, timeRange)
      .then(res => {
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setArtists(res.data.items);
      })
      .catch(err => { setError(err.message); })
      .finally(() => { setLoading(false); });
  }, [token, navigate]);

  return (
    <section className="artists-container page-container" aria-labelledby="artists-title">
      <h1 id="artists-title" className="artists-title page-title">Your Top {limit} Artists of the Month</h1>
      {loading && <output className="artists-loading" data-testid="loading-indicator">Loading top artists…</output>}
      {error && !loading && <div className="artists-error" role="alert">{error}</div>}
      {!loading && !error && (
        <ol className="artists-list">
          {artists.map((artist, i) => (
            <TopArtistItem key={artist.id} artist={artist} index={i} />
          ))}
        </ol>
      )}
    </section>
  );
}
