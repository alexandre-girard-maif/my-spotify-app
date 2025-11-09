import './TopArtistItem.css';

/**
 * TopArtistItem component displays information about a single top artist.
 * @param {Object} param0 - Component props
 * @param {Object} param0.artist - The artist object containing artist information
 * @param {number} param0.index - The index of the artist in the list
 * @returns {JSX.Element} The rendered component
 */
export default function TopArtistItem({ artist, index }) {
  return (
    <li className="artist-item" data-testid={`top-artist-item-${artist.id}`}>
      {artist.images?.[1] && (
        <img
          src={artist.images[1].url}
          alt={artist.name}
          className="artist-cover"
        />
      )}
      <div className="artist-details">
        <div className="artist-details-header">
          <div className="artist-title">
            {index + 1}. {artist.name}
          </div>
          <div className="artist-genres">
            Genres: {artist.genres.join(', ')}
          </div>
        </div>
        <div className="artist-popularity">
          Popularity: {artist.popularity}
        </div>
        <div className="artist-followers">
          Followers: {artist.followers.total.toLocaleString()}
        </div>
      </div>
      <a
        href={artist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="artist-link"
      >
        View Artist
      </a>
    </li>
  );
}
