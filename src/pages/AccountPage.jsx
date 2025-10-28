import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './AccountPage.css';
import './PageLayout.css';

/**
 * Account component to display user profile information.
 * @returns JSX.Element
 */
export default function AccountPage() {
  const { profile } = useLoaderData();

  // set document title
  React.useEffect(() => {
    document.title = `Account | Spotify App`;
  }, []);

  return (
    <div className="account-page page-container">
      <h1 className="page-title">Spotify Account Info</h1>
      <img className="account-avatar" src={profile.images?.[0]?.url} alt="avatar" />
      <h2>{profile.display_name}</h2>
      <div className="account-details">
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Country:</b> {profile.country}</p>
        <p><b>Product:</b> {profile.product}</p>
      </div>
      <a className="account-link" href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open Spotify Profile</a>
    </div>
  );
}
