import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAccountProfile } from '../api/spotify-me.js';
import AccountNav from './AccountNav';
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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Try read cache first
    try {
      const raw = localStorage.getItem('spotify_profile');
      if (raw) {
        setProfile(JSON.parse(raw));
      }
    } catch {
      /* ignore parse errors */
    }

    const token = localStorage.getItem('spotify_access_token');
    if (!token) return; // Not authenticated
    if (profile) return; // Skip fetch if we already have cached profile

    setLoading(true);
    fetchAccountProfile(token)
      .then((result) => {
        if (cancelled) return;
        if (result.error) {
          setError(result.error);
        } else if (result.data) {
          setProfile(result.data);
          try {
            localStorage.setItem('spotify_profile', JSON.stringify(result.data));
          } catch {
            /* ignore quota errors */
          }
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || 'Failed to load profile');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once, keep closure over initial profile state intentionally

  return (
    <div className="main-nav-wrapper">
      <nav className="layout-nav main-nav-flex">
        <TopTracksLink />
        <TopArtistsLink />
        <PlaylistsLink />
      </nav>
      <AccountNav profile={profile} loading={loading} error={error} />
    </div>
  );
}