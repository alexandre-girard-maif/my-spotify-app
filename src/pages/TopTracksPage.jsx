
import React from 'react';
import './TopTracksPage.css';
import './PageLayout.css';
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
    <div className="tracks-container page-container">
      <h1 className="tracks-title page-title">Your Top {tracks.length} Tracks of the Month</h1>
      <ol className="tracks-list">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </ol>
    </div>
  );
}
