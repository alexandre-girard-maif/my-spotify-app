import React from 'react';

/**
 * Playlist item component
 * @param {*}  playlist 
 * @returns JSX.Element
 */
export default function PlayListItem({ playlist }) {
  return (
    <li key={playlist.id} data-testid={`playlist-item-${playlist.id}`} className="track-item">
      <img
        src={playlist.images[0]?.url}
        alt="cover"
        className="track-cover"
        style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }}
      />
      <div>
        <div className="track-title">{playlist.name}</div>
        <div className="track-artists">By {playlist.owner.display_name}</div>
        <div className="track-album">{playlist.tracks.total} tracks</div>
      </div>
      <a
        href={playlist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="track-link"
      >
        Open
      </a>
    </li>
  );
}
