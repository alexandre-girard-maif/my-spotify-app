import React from 'react';
import { fetchAccountProfile } from '../api/spotify.js';
import './AccountPage.css';
import './PageLayout.css';

/**
 * Account component to display user profile information.
 * @returns JSX.Element
 */
export default function AccountPage() {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    document.title = `Account | Spotify App`;
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('Missing access token');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchAccountProfile(token)
      .then(res => {
        if (cancelled) return;
        if (res.error) setError(res.error);
        setProfile(res.profile || null);
      })
      .catch(err => { if (!cancelled) setError(err.message || 'Failed to load profile'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="account-page page-container">
      <h1 className="page-title">Spotify Account Info</h1>
      {loading && <div className="account-loading" role="status">Loading account info…</div>}
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
