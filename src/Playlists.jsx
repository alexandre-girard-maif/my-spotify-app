import React, { useEffect, useState } from 'react';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('No access token found.');
      setLoading(false);
      return;
    }
    fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setPlaylists(data.items || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch playlists.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="tracks-loading">Loading playlists...</div>;
  if (error) return <div className="tracks-error">Error: {error}</div>;

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Playlists</h1>
      <h2>{playlists.length} Playlists</h2>
      <ol className="tracks-list">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="track-item">
            <img
              src={playlist.images[0]?.url}
              alt="cover"
              className="track-cover"
              style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }}
            />
            <div>
              <div className="track-title">{playlist.name}</div>
              <div className="track-artists">{playlist.owner.display_name}</div>
              <div className="track-album">{playlist.tracks.total} tracks</div>
            </div>
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="track-link"
            >
              Open
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
