import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SimpleCard from '../components/SimpleCard';
import './DashboardPage.css';
import './PageLayout.css';
import { useRequireToken } from '../hooks/useRequireToken.js';
import { fetchUserTopArtists, fetchUserTopTracks } from '../api/spotify-me.js';
import { Skeleton, SkeletonTextLines } from '../components/Skeleton.jsx';

/**
 * Dashboard page component.
 * @returns {JSX.Element} The rendered dashboard page.
 */
const DashboardPage = () => {
    const loaderData = useLoaderData();
    const [topArtist, setTopArtist] = React.useState(loaderData?.topArtist || {});
    const [topTrack, setTopTrack] = React.useState(loaderData?.topTrack || {});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(loaderData?.error || null);
    const limit = 1;
    const timeRange = 'short_term';

    // set document title
    React.useEffect(() => {
        document.title = `Dashboard | Spotify App`;
    }, []);

    const { token, checking } = useRequireToken();

    React.useEffect(() => {
        // Skip fetching if loader already provided the data
        const shouldFetch = !loaderData?.topArtist || !loaderData?.topTrack;
        if (checking || !token || !shouldFetch) {
            setLoading(false); // loader data present or still checking auth
            return;
        }
        let cancelled = false;
        setLoading(true);
        setError(null);

        const artistsPromise = fetchUserTopArtists(token, limit, timeRange)
            .then(res => {
                if (cancelled) return;
                if (res.error) setError(res.error);
                setTopArtist(res.artists?.[0] || {});
            })
            .catch(err => { if (!cancelled) setError(err.message || 'Failed to load artists'); });

        const tracksPromise = fetchUserTopTracks(token, limit, timeRange)
            .then(res => {
                if (cancelled) return;
                if (res.error) setError(res.error);
                setTopTrack(res.tracks?.[0] || {});
            })
            .catch(err => { if (!cancelled) setError(err.message || 'Failed to load tracks'); });

        Promise.all([artistsPromise, tracksPromise])
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [token, checking, loaderData]);

    if (checking) {
        return (
            <div className="dashboard-container page-container" data-testid="dashboard-skeleton">
                <Skeleton width="60%" height="40px" />
                <SkeletonTextLines lines={1} />
                <div className="dashboard-skeleton-cards">
                    <Skeleton count={2} width="300px" height="300px" />
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container page-container">
            <h1 className="dashboard-title page-title">Welcome to Your Dashboard</h1>
            <p className="dashboard-subtitle">Preferred track and artist of the month.</p>
            {loading && <output className="dashboard-loading">Loading top artist and track...</output>}
            {error && !loading && <div className="dashboard-error" role="alert">{error}</div>}
            {!loading && !error && (
                <section className="dashboard-content">
                    <div className="card preferred-artist-card">
                        <SimpleCard
                            imageUrl={topArtist?.images?.[0]?.url}
                            title={topArtist?.name}
                            subtitle={Array.isArray(topArtist?.genres) ? topArtist.genres.join(', ') : ''}
                            link={topArtist?.external_urls?.spotify}
                        />
                    </div>
                    <div className="card preferred-track-card">
                        <SimpleCard
                            imageUrl={topTrack?.album?.images?.[1]?.url}
                            title={topTrack?.name}
                            subtitle={Array.isArray(topTrack?.artists) ? topTrack.artists.map(a => a.name).join(', ') : ''}
                            link={topTrack?.external_urls?.spotify}
                        />
                    </div>
                </section>
            )}
        </div>
    );
};

export default DashboardPage;