import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SimpleCard from '../components/SimpleCard';
import './DashboardPage.css';

/**
 * Dashboard page component.
 * @returns {JSX.Element} The rendered dashboard page.
 */
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
                <p>Preferred tracks and artists of the month.</p>
            </header>

            <section className="dashboard-content">
                <div className="card preferred-artist-card">
                    <SimpleCard
                        imageUrl={topArtist.images[0].url}
                        title={topArtist.name}
                        subtitle={topArtist.genres.join(', ')}
                        link={topArtist.external_urls.spotify}
                    />
                </div>

                <div className="card preferred-track-card">
                    <SimpleCard
                        imageUrl={topTrack.album.images[1].url}
                        title={topTrack.name}
                        subtitle={topTrack.artists.map(artist => artist.name).join(', ')}
                        link={topTrack.external_urls.spotify}
                    />
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;