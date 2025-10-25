import React, { useEffect, useState } from 'react';

export default function TopArtists() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('No access token found.');
      setLoading(false);
      return;
    }
    fetch('https://api.spotify.com/v1/me/top/artists?limit=25', {
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
  }, []);

  if (loading) return <div className="tracks-loading">Loading top artists...</div>;
  if (error) return <div className="tracks-error">Error: {error}</div>;

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top 25 Artists</h1>
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
