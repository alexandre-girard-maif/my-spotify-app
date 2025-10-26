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
  // Replace with a real icon library if available (e.g., Font Awesome, Material Icons)
  return (
    <span
      className="user-icon"
      style={{ fontSize: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      aria-label="User"
      role="img"
    >
      {/* Unicode user icon as fallback */}
      👤
    </span>
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
        className={({ isActive }) => isActive ? 'avatar avatar--active' : 'avatar'}
      >
        {loading && !avatarUrl && (
          <div className="avatar__shimmer" aria-hidden="true" />
        )}
        {!loading && avatarUrl && (
          <img
            src={avatarUrl}
            alt={profile?.display_name || 'Profile avatar'}
            className="avatar__img"
          />
        )}
        {!loading && !avatarUrl && <UserIcon size={26} />}
      </NavLink>
    </div>
  );
}

// Optionally export for reuse/testing
export { NavItem, TopTracksLink, TopArtistsLink, PlaylistsLink, AccountLink };
