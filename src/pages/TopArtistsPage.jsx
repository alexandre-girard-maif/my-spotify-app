import React from 'react';
import { useRequireToken } from '../hooks/useRequireToken.js';
import TopArtistItem from '../components/TopArtistItem';
import { fetchUserTopArtists } from '../api/spotify-me.js';
import { handleTokenError } from '../utils/handleTokenError.js';
import './TopArtistsPage.css';
import './PageLayout.css';
import { useNavigate } from 'react-router-dom';

/**
 * Number of artists to fetch
 */
const limit = 10;

/** 
 * Time range for top artists
 */
const timeRange = 'short_term';

/**
 * Top Artists Page
 * @returns {JSX.Element}
 */
export default function TopArtistsPage() {
  // Initialize navigate function
  const navigate = useNavigate();

  // state for artists data
  const [artists, setArtists] = React.useState([]);

  // state for loading and error
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  // require token to fetch playlists
  const { token } = useRequireToken();

  // Set document title
  React.useEffect(() => {
    document.title = `Top Artists | Spotify App`;
  }, []);

  React.useEffect(() => {
    if (!token) return; // wait for auth check
    // fetch user top artists when token changes
    fetchUserTopArtists(token, limit, timeRange)
      .then(res => {
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setArtists(res.artists || []);
      })
      .catch(err => { setError(err.message ); })
      .finally(() => { setLoading(false); });
  }, [token, navigate]);

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
