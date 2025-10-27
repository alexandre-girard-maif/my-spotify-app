import React from 'react';
import TopArtistItem from '../components/TopArtistItem';
import { useLoaderData } from 'react-router-dom';

/**
 * Top Artists Page
 * @returns {JSX.Element}
 */
export default function TopArtists() {
  // Get artists from loader data
  const { artists } = useLoaderData();

  // set document title
  React.useEffect(() => {
    document.title = `Top Artists | Spotify App`;
  }, []);

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top {artists.length} Artists</h1>
      <ol className="tracks-list">
        {artists.map((artist, i) => (
          <TopArtistItem key={artist.id} artist={artist} index={i} />
        ))}
      </ol>
    </div>
  );
}
