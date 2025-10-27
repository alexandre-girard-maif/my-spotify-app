import React from 'react';

/**
 * TopArtistItem component displays information about a single top artist.
 * @param {Object} param0 - Component props
 * @param {Object} param0.artist - The artist object containing artist information
 * @param {number} param0.index - The index of the artist in the list
 * @returns {JSX.Element} The rendered component
 */
export default function TopArtistItem({ artist, index }) {
  return (
    <li className="track-item" data-testid={`top-artist-item-${artist.id}`}>
      {artist.images?.[1] && (
        <img
          src={artist.images[1].url}
          alt={artist.name}
          className="track-cover"
        />
      )}
      <div className="track-details">
        <div className="track-details-header">
          <div className="track-title">
            {index + 1}. {artist.name}
          </div>
          <div className="track-artists">
            Genres: {artist.genres.join(', ')}
          </div>
        </div>
        <div className="track-album">
          Popularity: {artist.popularity}
        </div>
        <div className="track-popularity">
          Followers: {artist.followers.total.toLocaleString()}
        </div>
      </div>
    </li>
  );
}
