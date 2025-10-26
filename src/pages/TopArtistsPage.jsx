import React, {  } from 'react';
import TopArtistItem from '../components/TopArtistItem';
import { useLoaderData } from 'react-router-dom';

export default function TopArtists() {
  // const [artists, setArtists] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [limit, setLimit] = useState(25);
  // const [timeRange, setTimeRange] = useState('short_term');

  const { artists } = useLoaderData();

  // set document title
    React.useEffect(() => {
      document.title = `Top Artists | Spotify App`;
    }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('spotify_access_token');
  //   if (!token) {
  //     setError('No access token found.');
  //     setLoading(false);
  //     return;
  //   }
  //   setLoading(true);
  //   setError(null);
  //   fetchTopArtists(token, limit, timeRange)
  //     .then(({ artists, error }) => {
  //       if (error) {
  //         setError(error);
  //       } else {
  //         setArtists(artists);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError('Failed to fetch top artists.');
  //       setLoading(false);
  //     });
  // }, [limit, timeRange]);

  // if (loading) return <div className="tracks-loading">Loading top artists...</div>;
  // if (error) return <div className="tracks-error">Error: {error}</div>;

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top Artists</h1>
      {/* <form style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }} onSubmit={e => e.preventDefault()}>
        <label>
          Limit:
          <select value={limit} onChange={e => setLimit(Number(e.target.value))} style={{ marginLeft: 8 }}>
            {[5, 10, 15, 20, 25, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Time Range:
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="short_term">Last 4 weeks</option>
            <option value="medium_term">Last 6 months</option>
            <option value="long_term">All time</option>
          </select>
        </label>
      </form> */}
      <ol className="tracks-list">
        {artists.map((artist, i) => (
          <TopArtistItem key={artist.id} artist={artist} index={i} />
        ))}
      </ol>
    </div>
  );
}
