import React from 'react';

/**
 * Playlist item component
 * @param {*}  playlist 
 * @returns JSX.Element
 */
export default function PlayListItem({ playlist }) {
  return (
    <li key={playlist.id} data-testid={`playlist-item-${playlist.id}`} className="playlist-item">
      <img
        src={playlist.images[0]?.url}
        alt="cover"
        className="playlist-cover"
      />
      <div className="playlist-details">
        <div className="playlist-details-header">
          <div className="playlist-title">{playlist.name}</div>
          <div className="playlist-owner">By {playlist.owner.display_name}</div>
        </div>
        <div className="playlist-tracks">{playlist.tracks.total} tracks</div>
      </div>
      <a
        href={playlist.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="playlist-link"
      >
        Open
      </a>
    </li>
  );
}
