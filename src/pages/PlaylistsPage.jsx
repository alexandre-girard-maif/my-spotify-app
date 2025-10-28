import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PlayListItem from '../components/PlayListItem.jsx';
import './PlaylistsPage.css';

/**
 * Playlists Page
 * @returns {JSX.Element}
 */
export default function Playlists() {
  
  // Get playlists from loader data
  const { playlists } = useLoaderData();

  // set document title
  React.useEffect(() => {
    document.title = `Playlists | Spotify App`;
  }, []);

  return (
    <div className="playlists-container">
      <h1 className="playlists-title">Your Playlists</h1>
      <h2 className="playlists-count">{playlists.length} Playlists</h2>
      <ol className="playlists-list">
        {playlists.map((playlist) => (
          <PlayListItem key={playlist.id} playlist={playlist} />
        ))}
      </ol>
    </div>
  );
}
