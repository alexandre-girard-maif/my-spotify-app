import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequireToken } from "../../hooks/useRequireToken";
import { fetchPlaylistById } from "../../api/spotify-playlists";
import { handleTokenError } from "../../utils/handleTokenError";
import { buildTitle } from "../../constants/appMeta";

import "./PlaylistPage.css";
import "../PageLayout.css";
import TrackItem from "../../components/TrackItem/TrackItem";

/**
 * Playlist Page
 * @returns {JSX.Element}
 */
export default function PlaylistPage() {
    // Initialize navigate function
    const navigate = useNavigate();

    // retrieve id from params
    const { id } = useParams();

    // state for playlist data
    const [playlist, setPlaylist] = useState(null);

    // require token to fetch top tracks
    const { token } = useRequireToken();

    // set document title
    useEffect(() => { document.title = buildTitle('Playlist'); }, []);

    // state for loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!token) return; // wait for check or redirect

        // fetch playlist data using id and token
        fetchPlaylistById(token, id)
            .then(res => {
                if (res.error) {
                    if (!handleTokenError(res.error, navigate)) {
                        setError(res.error);
                    }
                }
                setPlaylist(res.playlist);
            })
            .catch(err => { setError(err.message); })
            .finally(() => { setLoading(false); });
    }, [id, token, navigate]);

    return (
        <section className="playlist-container page-container">
            {loading && <output className="playlist-loading" data-testid="loading-indicator">Loading playlist…</output>}
            {error && !loading && <div className="playlist-error" role="alert">{error}</div>}
            {!loading && !error && (
                <>
                    <section className="playlist-header">
                        <div className="playlist-header-image">
                            {playlist?.images?.[0]?.url && (
                                <img
                                    className="playlist-cover"
                                    src={playlist.images[0].url}
                                    alt={`Cover of ${playlist.name}`}
                                />
                            )}
                        </div>
                        <div className="playlist-header-text-with-link">
                            <div className="playlist-header-text">
                                <h1 className="playlist-title page-title">{playlist?.name}</h1>
                                <h2
                                    className="playlist-subtitle page-subtitle"
                                    title={playlist?.description || ''}
                                >
                                    {playlist?.description}
                                </h2>
                            </div>
                            {playlist?.external_urls?.spotify && (
                                <a
                                    className="playlist-spotify-link"
                                    href={playlist.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open in Spotify
                                </a>
                            )}
                        </div>
                    </section>
                    <ol className="playlist-list">
                        {playlist?.tracks?.items.map((item, index) => (
                            <div key={`track-item-${item.track?.id}-${index}`}>
                                {item.track && <TrackItem track={item.track} />}
                            </div>
                        ))}
                    </ol>
                </>
            )}
        </section>
    );
}