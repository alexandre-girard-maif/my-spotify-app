
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { version } from '../package.json';
import './App.css';

export default function Layout() {
  return (
    <div className="layout-root">
      <header className="layout-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ marginRight: 32 }}>My Spotify App</h1>
        <nav className="layout-nav" style={{ flex: 1 }}>
          <NavLink to="/top-tracks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Tracks</NavLink>
          <NavLink to="/top-artists" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Artists</NavLink>
          <NavLink to="/playlists" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Playlists</NavLink>
          <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Account</NavLink>
        </nav>
        <NavLink to="/login" className={({ isActive }) => isActive ? 'login-btn active' : 'login-btn'} style={{ marginLeft: 24, padding: '8px 20px', borderRadius: 20, background: '#1DB954', color: '#fff', fontWeight: 600, textDecoration: 'none', boxShadow: '0 1px 4px #0002' }}>
          Login
        </NavLink>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        &copy; {new Date().getFullYear()} My Spotify App - {version}
      </footer>
    </div>
  );
}
