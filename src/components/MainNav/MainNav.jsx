import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAccountProfile } from '../../api/spotify-me.js';
import AccountNav from '../AccountNav/AccountNav.jsx';
import './MainNav.css';
import { KEY_ACCESS_TOKEN } from '../../constants/storageKeys.js';

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
  // Lazily read cached profile once (outside effect) to avoid initial synchronous setState inside effect.
  const initialProfile = (() => {
    const raw = localStorage.getItem('spotify_profile');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      console.error('Failed to parse cached profile:', raw);
      return null; // ignore parse errors
    }
  })();

  const [profile, setProfile] = useState(initialProfile);
  // Derive initial loading: if we have a token and no cached profile, we will fetch.
  const [loading, setLoading] = useState(() => {
    const token = localStorage.getItem(KEY_ACCESS_TOKEN);
    return !!token && !initialProfile;
  });
  const [error, setError] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem(KEY_ACCESS_TOKEN);
    if (!token || profile) return; // Not authenticated or already have cached profile


    fetchAccountProfile(token)
      .then((result) => {
        if (result.error) {
          console.error('Failed to fetch account profile:', result);
          setError(result.error);
        }
        setProfile(result.data);
        try {
          localStorage.setItem('spotify_profile', JSON.stringify(result.data));
        } catch {
          // ignore errors
        }
      })
      .catch((err) => {
        console.error('Failed to fetch account profile:', err);
        setError(err?.message || 'Failed to load profile');
      })
      .finally(() => { setLoading(false); });
  }, [profile]);

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