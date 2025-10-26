import React from 'react';
import { NavLink } from 'react-router-dom';

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
const AccountLink = () => <NavItem to="/account">Account</NavItem>;

export default function MainNav() {
  return (
    <nav className="layout-nav" style={{ flex: 1 }}>
      <TopTracksLink />
      <TopArtistsLink />
      <PlaylistsLink />
      <AccountLink />
    </nav>
  );
}

// Optionally export for reuse/testing
export { NavItem, TopTracksLink, TopArtistsLink, PlaylistsLink, AccountLink };
