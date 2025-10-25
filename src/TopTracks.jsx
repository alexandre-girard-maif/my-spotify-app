
import React, { useEffect, useState } from 'react';
import TrackItem from './TrackItem.jsx';

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
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
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

  if (loading) return <div className="tracks-loading">Loading top tracks...</div>;
  if (error) return <div className="tracks-error">Error: {error}</div>;

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top 10 Tracks</h1>
      <ol className="tracks-list">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </ol>
    </div>
  );
}
