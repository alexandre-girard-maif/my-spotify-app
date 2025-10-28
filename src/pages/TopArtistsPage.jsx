import React from 'react';
import TopArtistItem from '../components/TopArtistItem';
import { useLoaderData } from 'react-router-dom';
import './TopArtistsPage.css';
import './PageLayout.css';

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
    <div className="artists-container page-container">
      <h1 className="artists-title page-title">Your Top {artists.length} Artists</h1>
      <ol className="artists-list">
        {artists.map((artist, i) => (
          <TopArtistItem key={artist.id} artist={artist} index={i} />
        ))}
      </ol>
    </div>
  );
}
