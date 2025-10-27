import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SimpleCard from '../components/SimpleCard';
import './DashboardPage.css';

const DashboardPage = () => {
    const { topTrack, topArtist } = useLoaderData();

    console.log('DashboardPage received topTrack and topArtist from loader:');
    console.log('Top Track:', topTrack);
    console.log('Top Artist:', topArtist);

    // set document title
    React.useEffect(() => {
      document.title = `Dashboard | Spotify App`;
    }, []);

    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <p>Explore your favorite tracks and artists.</p>
        </header>

        <section className="dashboard-content">
          <div className="card preferred-artist-card">
            <h2>Preferred Artist</h2>
            <SimpleCard 
              imageUrl={topArtist.images[0].url} 
              title={topArtist.name} 
                subtitle={topArtist.genres.join(', ')}
            />
          </div>

          <div className="card preferred-track-card">
            <h2>Preferred Track</h2>
            <SimpleCard 
              imageUrl={topTrack.album.images[1].url} 
              title={topTrack.name} 
              subtitle={topTrack.artists.map(artist => artist.name).join(', ')}
            />
          </div>
        </section>
      </div>
    );
};

export default DashboardPage;