import React from 'react';
import { useLoaderData } from 'react-router-dom';

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

  // if (error) return <div style={{ color: 'red', marginTop: '20vh', textAlign: 'center' }}>Error: {error}</div>;
  // if (!profile) return <div style={{ marginTop: '20vh', textAlign: 'center' }}>Loading account info...</div>;

  return (
    <div style={{ marginTop: '10vh', textAlign: 'center' }}>
      <h1>Spotify Account Info</h1>
      <img src={profile.images?.[0]?.url} alt="avatar" style={{ borderRadius: '50%', width: 120, height: 120 }} />
      <h2>{profile.display_name}</h2>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Country:</b> {profile.country}</p>
      <p><b>Product:</b> {profile.product}</p>
      <a href={profile.external_urls.spotify} target="_blank" rel="noopener noreferrer">Open Spotify Profile</a>
    </div>
  );
}
