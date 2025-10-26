import React, { useEffect, useState } from 'react';

export default function TopArtists() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(25);
  const [timeRange, setTimeRange] = useState('short_term');

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('No access token found.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setArtists(data.items || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch top artists.');
        setLoading(false);
      });
  }, [limit, timeRange]);

  if (loading) return <div className="tracks-loading">Loading top artists...</div>;
  if (error) return <div className="tracks-error">Error: {error}</div>;

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top Artists</h1>
      <form style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }} onSubmit={e => e.preventDefault()}>
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
      </form>
      <ol className="tracks-list">
        {artists.map((artist, i) => (
          <li key={artist.id} className="track-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {artist.images && artist.images[1] && (
                <img src={artist.images[1].url} alt={artist.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
              )}
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{i + 1}. {artist.name}</div>
                <div style={{ color: '#666', fontSize: '0.95em' }}>Genres: {artist.genres.join(', ')}</div>
                <div style={{ color: '#888', fontSize: '0.9em' }}>Popularity: {artist.popularity}</div>
                <div style={{ color: '#888', fontSize: '0.9em' }}>Followers: {artist.followers.total.toLocaleString()}</div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
