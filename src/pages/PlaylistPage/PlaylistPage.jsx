import { useParams } from "react-router-dom";

/**
 * Playlist Page
 * @returns {JSX.Element}
 */
export default function PlaylistPage() {
    // retrieve id from params
    const { id } = useParams();
    return <div>Playlist Page {id}</div>;
}