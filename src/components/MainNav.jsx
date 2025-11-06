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

  useEffect(() => {
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
    // if (profile) return; // Skip fetch if we already have cached profile

    // Fetch profile from API
    fetchAccountProfile(token)
      .then((result) => {
        if (result.error) {
          console.error('Failed to fetch account profile:', result);
        } else {
          setProfile(result.data);
          // Cache profile in localStorage
          try {
            localStorage.setItem('spotify_profile', JSON.stringify(result.data));
          } catch {
            /* ignore quota errors */
          }
        }
      })
      .catch((err) => {
        // Log fetch errors silently
        console.error('Failed to fetch account profile:', err);
      })
  }, []); // run once, keep closure over initial profile state intentionally

  return (
    <div className="main-nav-wrapper">
      <nav className="layout-nav main-nav-flex">
        <TopTracksLink />
        <TopArtistsLink />
        <PlaylistsLink />
      </nav>
      <AccountNav profile={profile} />
    </div>
  );
}