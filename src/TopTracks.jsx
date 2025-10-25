import React, { useEffect, useState } from 'react';

export default function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('No access token found.');
      setLoading(false);
      return;
    }
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=25', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setTracks(data.items || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch top tracks.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ marginTop: '20vh', textAlign: 'center' }}>Loading top tracks...</div>;
  if (error) return <div style={{ color: 'red', marginTop: '20vh', textAlign: 'center' }}>Error: {error}</div>;

  return (
    <div style={{ margin: '5vh auto', maxWidth: 800 }}>
      <h1 style={{ textAlign: 'center' }}>Your Top 25 Tracks</h1>
      <ol style={{ padding: 0, listStyle: 'decimal inside' }}>
        {tracks.map((track, idx) => (
          <li key={track.id} style={{ margin: '1.5em 0', display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={track.album.images[2]?.url || track.album.images[0]?.url} alt="cover" style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{track.name}</div>
              <div style={{ color: '#666' }}>{track.artists.map(a => a.name).join(', ')}</div>
              <div style={{ fontSize: '0.9em' }}>{track.album.name}</div>
            </div>
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', color: '#1DB954', textDecoration: 'none', fontWeight: 'bold' }}>Open</a>
          </li>
        ))}
      </ol>
    </div>
  );
}
