import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile.js';
import './MainNav.css';

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
    <div className="main-nav-wrapper">
      <nav className="layout-nav main-nav-flex">
        <TopTracksLink />
        <TopArtistsLink />
        <PlaylistsLink />
        <AccountLink />
      </nav>
      <NavLink
        to="/account"
        aria-label={profile?.display_name ? `Account (${profile.display_name})` : 'Account'}
        className={({ isActive }) => isActive ? 'nav-avatar active' : 'nav-avatar'}
      >
        {loading && !avatarUrl && (
          <div className="nav-avatar-shimmer" aria-hidden="true" />
        )}
        {!loading && avatarUrl && (
          <img
            src={avatarUrl}
            alt={profile?.display_name || 'Profile avatar'}
            className="nav-avatar-img"
          />
        )}
        {!loading && !avatarUrl && <UserIcon size={26} />}
      </NavLink>
    </div>
  );
}

// Optionally export for reuse/testing
export { NavItem, TopTracksLink, TopArtistsLink, PlaylistsLink, AccountLink };
