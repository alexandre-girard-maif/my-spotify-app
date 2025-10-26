import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Playlists() {
  const { playlists } = useLoaderData();

  // set document title
    React.useEffect(() => {
      document.title = `Playlists | Spotify App`;
    }, []);
    
  // const [playlists, setPlaylists] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem('spotify_access_token');
  //   fetchPlaylists(token, 10).then(({ playlists, error }) => {
  //     if (error) setError(error);
  //     else setPlaylists(playlists);
  //     setLoading(false);
  //   });
  // }, []);

  // if (loading) return <div className="tracks-loading">Loading playlists...</div>;
  // if (error) return <div className="tracks-error">Error: {error}</div>;

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
