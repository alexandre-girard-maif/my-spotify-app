import React from 'react';

export default function TopArtistItem({ artist, index }) {
  return (
    <li className="track-item" data-testid={`top-artist-item-${artist.id}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {artist.images && artist.images[1] && (
          <img
            src={artist.images[1].url}
            alt={artist.name}
            style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
            {index + 1}. {artist.name}
          </div>
          <div style={{ color: '#666', fontSize: '0.95em' }}>
            Genres: {artist.genres.join(', ')}
          </div>
          <div style={{ color: '#888', fontSize: '0.9em' }}>
            Popularity: {artist.popularity}
          </div>
          <div style={{ color: '#888', fontSize: '0.9em' }}>
            Followers: {artist.followers.total.toLocaleString()}
          </div>
        </div>
      </div>
    </li>
  );
}
