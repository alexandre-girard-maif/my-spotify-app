import React from 'react';

/**
 * TopArtistItem component displays information about a single top artist.
 * @param {Object} param0 - Component props
 * @param {Object} param0.artist - The artist object containing artist information
 * @param {number} param0.index - The index of the artist in the list
 * @returns {JSX.Element} The rendered component
 */
export default function TopArtistItem({ artist, index }) {
  console.log('Rendering TopArtistItem for artist:', artist.images);

  return (
    <li className="track-item" data-testid={`top-artist-item-${artist.id}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {artist.images?.[1] && (
          <img
            src={artist.images[1].url}
            alt={artist.name}
            style={{ width: 56, height: 56, borderRadius: '50%' }}
          />
        )}
        <div>
          <div style={{ fontWeight: 'bold' }}>
            {index + 1}. {artist.name}
          </div>
          <div style={{ color: '#666' }}>
            Genres: {artist.genres.join(', ')}
          </div>
          <div style={{ color: '#888' }}>
            Popularity: {artist.popularity}
          </div>
          <div style={{ color: '#888' }}>
            Followers: {artist.followers.total.toLocaleString()}
          </div>
        </div>
      </div>
    </li>
  );
}
