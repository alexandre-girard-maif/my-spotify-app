import React from 'react';

export default function TrackItem({ track }) {
  return (
    <li className="track-item">
      <img
        src={track.album.images[2]?.url || track.album.images[0]?.url}
        alt="cover"
        className="track-cover"
      />
      <div>
        <div className="track-title">{track.name}</div>
        <div className="track-artists">{track.artists.map(a => a.name).join(', ')}</div>
        <div className="track-album">{track.album.name}</div>
        <div className="track-popularity">Popularity: {track.popularity}</div>
      </div>
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="track-link"
      >
        Open
      </a>
    </li>
  );
}
