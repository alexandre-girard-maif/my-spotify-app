import React, { } from 'react';
import { useLoaderData } from 'react-router-dom';
import PlayListItem from '../components/PlayListItem.jsx';

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
          <PlayListItem key={playlist.id} playlist={playlist} />
        ))}
      </ol>
    </div>
  );
}
