// src/components/Skeleton.jsx
import React from 'react';
import '../styles/skeleton.css';

/**
 * Generic skeleton placeholder with optional width/height and count.
 */
export function Skeleton({ width = '100%', height = '16px', count = 1, className = '' }) {
  const items = Array.from({ length: count });
  return (
    <div className={`skeleton-wrapper ${className}`}> 
      {items.map((_, i) => (
        <div
          key={i}
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
