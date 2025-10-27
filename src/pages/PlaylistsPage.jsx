import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PlayListItem from '../components/PlayListItem.jsx';

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
