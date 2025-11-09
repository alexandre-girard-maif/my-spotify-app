import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequireToken } from "../../hooks/useRequireToken";
import { fetchPlaylistById } from "../../api/spotify-playlists";
import { handleTokenError } from "../../utils/handleTokenError";

/**
 * Playlist Page
 * @returns {JSX.Element}
 */
export default function PlaylistPage() {
    // Initialize navigate function
    const navigate = useNavigate();

    // retrieve id from params
    const { id } = useParams();

    // require token to fetch top tracks
    const { token } = useRequireToken();

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
                console.log(res);
            })
            .catch(err => { setError(err.message); })
            .finally(() => { setLoading(false); });
    }, [id,token, navigate]);

    return <div>Playlist Page {id}</div>;
}