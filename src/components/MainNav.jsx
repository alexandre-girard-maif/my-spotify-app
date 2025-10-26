import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile.js';

// Generic nav item wrapper to reduce duplication and centralize active class logic
function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      end={to === '/'}
    >
      {children}
    </NavLink>
  );
}

// Specific semantic components (could aid future per-link customization)
const TopTracksLink = () => <NavItem to="/top-tracks">Top Tracks</NavItem>;
const TopArtistsLink = () => <NavItem to="/top-artists">Top Artists</NavItem>;
const PlaylistsLink = () => <NavItem to="/playlists">Playlists</NavItem>;
// Account pill replaced by avatar icon on the right; keep stub for potential reuse.
const AccountLink = () => null;

function UserIcon({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="User"
    >
      <circle cx="12" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4.8 20c0-3.2 2.9-5.8 7.2-5.8 4.3 0 7.2 2.6 7.2 5.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MainNav() {
  const { profile, loading } = useSpotifyProfile();
  const avatarUrl = profile?.images?.[0]?.url;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
      <nav className="layout-nav" style={{ flex: 1 }}>
        <TopTracksLink />
        <TopArtistsLink />
        <PlaylistsLink />
        <AccountLink />
      </nav>
      <NavLink
        to="/account"
        aria-label={profile?.display_name ? `Account (${profile.display_name})` : 'Account'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: 'var(--bg-overlay, #222)',
          border: '1px solid var(--border-subtle, #333)',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'var(--text-primary, #fff)',
          position: 'relative',
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
          transition: 'background .18s, transform .18s, box-shadow .18s'
        }}
        className={({ isActive }) => isActive ? 'account-avatar active' : 'account-avatar'}
      >
        {loading && !avatarUrl && (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg,#222 0%,#333 50%,#222 100%)',
              backgroundSize: '200% 100%',
              animation: 'avatar-shimmer 1.1s ease-in-out infinite'
            }}
            aria-hidden="true"
          />
        )}
        {!loading && avatarUrl && (
          <img
            src={avatarUrl}
            alt={profile?.display_name || 'Profile avatar'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {!loading && !avatarUrl && <UserIcon size={26} />}
      </NavLink>
    </div>
  );
}

// Optionally export for reuse/testing
export { NavItem, TopTracksLink, TopArtistsLink, PlaylistsLink, AccountLink };
