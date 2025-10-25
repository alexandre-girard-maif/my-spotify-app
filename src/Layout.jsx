
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { version } from '../package.json';
import './App.css';

export default function Layout() {
  return (
    <div className="layout-root">
      <header className="layout-header">
        <h1>My Spotify App</h1>
        <nav className="layout-nav">
          <NavLink to="/top-tracks" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Top Tracks</NavLink>
          <NavLink to="/playlists" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Playlists</NavLink>
          <NavLink to="/account" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Account</NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Login</NavLink>
        </nav>
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
