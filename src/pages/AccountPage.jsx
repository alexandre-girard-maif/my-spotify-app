import React from 'react';
import { Skeleton, SkeletonTextLines } from '../components/Skeleton.jsx';
import { fetchAccountProfile } from '../api/spotify-me.js';
import { useRequireToken } from '../hooks/useRequireToken.js';
import './AccountPage.css';
import './PageLayout.css';
import { handleTokenError } from '../utils/handleTokenError.js';
import { useNavigate } from 'react-router-dom';

/**
 * Account component to display user profile information.
 * @returns JSX.Element
 */
export default function AccountPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    document.title = `Account | Spotify App`;
  }, []);

  const { token, checking } = useRequireToken();

  React.useEffect(() => {
    if (checking || !token) return; // wait for check or redirect
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchAccountProfile(token)
      .then(res => {
        if (cancelled) return;
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setProfile(res.profile || null);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load profile'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [token, checking]);

  if (checking) {
    return (
      <div className="account-page page-container" data-testid="account-skeleton">
        <Skeleton width="128px" height="128px" />
        <Skeleton width="60%" height="28px" />
        <SkeletonTextLines lines={3} />
      </div>
    );
  }

  return (
    <div className="account-page page-container">
      <h1 className="page-title">Spotify Account Info</h1>
  {loading && <output className="account-loading">Loading account info…</output>}
      {error && !loading && <div className="account-error" role="alert">{error}</div>}
      {!loading && !error && profile && (
        <>
          <img className="account-avatar" src={profile.images?.[0]?.url} alt="avatar" />
          <h2>{profile.display_name}</h2>
          <div className="account-details">
            <p><b>Email:</b> {profile.email}</p>
            <p><b>Country:</b> {profile.country}</p>
            <p><b>Product:</b> {profile.product}</p>
          </div>
          <a className="account-link" href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open Spotify Profile</a>
        </>
      )}
    </div>
  );
}
