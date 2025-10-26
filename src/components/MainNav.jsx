import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainNav() {
  return (
    <nav className="layout-nav" style={{ flex: 1 }}>
      <NavLink to="/top-tracks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Tracks</NavLink>
      <NavLink to="/top-artists" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Artists</NavLink>
      <NavLink to="/playlists" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Playlists</NavLink>
      <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Account</NavLink>
    </nav>
  );
}
