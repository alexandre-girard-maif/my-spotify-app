
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { version } from '../package.json';
import MainNav from './components/MainNav';

export default function Layout() {
  return (
    <div className="layout-root">
      <header className="layout-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ marginRight: 32, fontSize: '1.4rem', fontWeight: 700, lineHeight: 1, textDecoration: 'none', color: 'inherit' }} aria-label="Go to home">My Spotify App</Link>
        <MainNav />
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
