import { useState, useEffect } from 'react';
import { fetchAccountProfile } from '../../api/spotify-me.js';
import { useRequireToken } from '../../hooks/useRequireToken.js';
import './AccountPage.css';
import '../PageLayout.css';
import { handleTokenError } from '../../utils/handleTokenError.js';
import { useNavigate } from 'react-router-dom';

/**
 * Account component to display user profile information.
 * @returns JSX.Element
 */
export default function AccountPage() {
  // Initialize navigate function
  const navigate = useNavigate();

  // state for profile data
  const [profile, setProfile] = useState(null);

  // state for loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // require token to fetch profile
  const { token } = useRequireToken();

  // Set document title
  useEffect(() => {
    document.title = `Account | Spotify App`;
  }, []);


  useEffect(() => {
    if (!token) return; // wait for auth check
    // fetch user profile when token changes
    fetchAccountProfile(token)
      .then(res => {
        if (res.error) {
          if (!handleTokenError(res.error, navigate)) {
            setError(res.error);
          }
        }
        setProfile(res.data);
      })
      .catch(err => { setError(err.message); })
      .finally(() => { setLoading(false); });
  }, [token, navigate]);

  return (
    <section className="account-page page-container" aria-labelledby="account-page-title">
      <h1 id="account-page-title" className="page-title">Spotify Account Info</h1>
      {loading && (
        <output className="account-loading" data-testid="loading-indicator" aria-live="polite">
          Loading account info…
        </output>
      )}
      {error && !loading && <div className="account-error" role="alert">{error}</div>}
      {!loading && !error && profile && (
        <>
          <img className="account-avatar" src={profile.images?.[0]?.url} alt="avatar" />
          <h2>{profile.display_name}</h2>
          <section className="account-details" aria-labelledby="account-details-title">
            <h3 id="account-details-title" className="sr-only">Account Details</h3>
            <p className="account-details-item"><b>Email:</b> {profile.email}</p>
            <p className="account-details-item"><b>Country:</b> {profile.country}</p>
            <p className="account-details-item"><b>Product:</b> {profile.product}</p>
          </section>
          <a className="account-link" href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open Spotify Profile</a>
        </>
      )}
    </section>
  );
}
