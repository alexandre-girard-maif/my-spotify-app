
import React from 'react';
import { Outlet } from 'react-router-dom';
import { version } from '../package.json';
// import './App.css';
import MainNav from './components/MainNav';

export default function Layout() {
  return (
    <div className="layout-root">
      <header className="layout-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ marginRight: 32 }}>My Spotify App</h1>
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
