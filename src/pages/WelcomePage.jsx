import React from 'react';
import './WelcomePage.css';
import './PageLayout.css';

export default function WelcomePage() {
  // set document title
  React.useEffect(() => {
    document.title = `Welcome | Spotify App`;
  }, []);

  return (
    <div className="welcome-hero-bg page-container">
      <div className="welcome-hero-card">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          alt="Spotify Logo"
          className="welcome-hero-logo"
        />
  <div className="welcome-hero-title app-hero-title page-title">Welcome to My Spotify App</div>
        <div className="welcome-hero-desc">
          Explore your Spotify music stats, discover your top tracks and artists, and browse your playlists.<br />
        </div>
      </div>
    </div>
  );
}