// src/components/Skeleton.jsx
import React from 'react';
import '../styles/skeleton.css';

/**
 * Generic skeleton placeholder with optional width/height and count.
 */
export function Skeleton({ width = '100%', height = '16px', count = 1, className = '' }) {
  // Generate stable unique keys once per mount to avoid using indices.
  const keysRef = React.useRef([]);
  if (keysRef.current.length !== count) {
    // Regenerate if count changes.
    keysRef.current = Array.from({ length: count }, () => crypto.randomUUID());
  }
  return (
    <div className={`skeleton-wrapper ${className}`}> 
      {keysRef.current.map(id => (
        <div
          key={id}
          className="skeleton"
          style={{ width, height }}
          data-testid="skeleton-item"
        />
      ))}
    </div>
  );
}

export function SkeletonTextLines({ lines = 3 }) {
  return <Skeleton count={lines} height="14px" className="skeleton-lines" />;
}
