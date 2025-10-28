
import React from 'react';
import './TopTracksPage.css';
import TrackItem from '../components/TrackItem.jsx';
import { useLoaderData } from 'react-router-dom';

/**
 * TopTracks Page 
 * @returns {JSX.Element}
 */
export default function TopTracks() {
  // Get tracks from loader data
  const { tracks } = useLoaderData();

  // set document title
    React.useEffect(() => {
      document.title = `Top Tracks | Spotify App`;
    }, []);

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top {tracks.length} Tracks</h1>
      <ol className="tracks-list">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </ol>
    </div>
  );
}
