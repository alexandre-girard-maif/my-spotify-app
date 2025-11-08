import { useEffect } from 'react';
import { buildTitle, APP_NAME } from '../../constants/appMeta.js';
import './WelcomePage.css';
import '../PageLayout.css';

export default function WelcomePage() {
  // set document title
  useEffect(() => {
    document.title = buildTitle('Welcome');
  }, []);

  return (
    <section className="welcome-bg page-container" aria-labelledby="welcome-title">
      <div className="welcome-card">
        <div className="welcome-title page-title">Welcome to {APP_NAME}</div>
        <div className="welcome-desc">
          Explore your music stats, discover your top tracks and artists, and browse your playlists.<br />
        </div>
      </div>
    </section>
  );
}