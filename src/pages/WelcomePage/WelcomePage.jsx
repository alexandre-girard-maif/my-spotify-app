import { useEffect } from 'react';
import './WelcomePage.css';
import '../PageLayout.css';

export default function WelcomePage() {
  // set document title
  useEffect(() => {
    document.title = `Welcome | Spotify App`;
  }, []);

  return (
    <div className="welcome-bg page-container">
      <div className="welcome-card">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          alt="Spotify Logo"
          className="welcome-logo"
        />
  <div className="welcome-title page-title">Welcome to My Spotify App</div>
        <div className="welcome-desc">
          Explore your Spotify music stats, discover your top tracks and artists, and browse your playlists.<br />
        </div>
      </div>
    </div>
  );
}