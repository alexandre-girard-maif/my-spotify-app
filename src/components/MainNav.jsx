import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSpotifyProfile } from '../hooks/useSpotifyProfile.js';
import AccountNav from './AccountNav';

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

// Links for main navigation items
const TopTracksLink = () => <NavItem to="/top-tracks">Top Tracks</NavItem>;
const TopArtistsLink = () => <NavItem to="/top-artists">Top Artists</NavItem>;
const PlaylistsLink = () => <NavItem to="/playlists">Playlists</NavItem>;

/**
 * Main navigation component that includes links to top tracks, top artists, playlists,
 * and the user account section with avatar.
 * @returns {JSX.Element}
 */
export default function MainNav() {
  const { profile, loading } = useSpotifyProfile();

  return (
    <div className="main-nav-wrapper">
      <nav className="layout-nav main-nav-flex">
        <TopTracksLink />
        <TopArtistsLink />
        <PlaylistsLink />
      </nav>
      <AccountNav profile={profile} loading={loading} />
    </div>
  );
}