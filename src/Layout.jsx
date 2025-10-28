
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { version } from '../package.json';
import MainNav from './components/MainNav';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-root">
    <header className="layout-header" role="banner">
      <Link to="/" className="layout-brand" aria-label="Go to home">My Spotify App</Link>
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
