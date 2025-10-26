import './AppHero.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="app-hero-bg">
      <div className="app-hero-card">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          alt="Spotify Logo"
          className="app-hero-logo"
        />
        <div className="app-hero-title">Welcome to My Spotify App</div>
        <div className="app-hero-desc">
          Explore your Spotify music stats, discover your top tracks and artists, and browse your playlists.<br />
          Use the links below to get started!
        </div>
        <div className="app-hero-links">
          <Link className="app-hero-link" to="/top-tracks">Top Tracks</Link>
          <Link className="app-hero-link" to="/top-artists">Top Artists</Link>
          <Link className="app-hero-link" to="/playlists">Playlists</Link>
        </div>
      </div>
    </div>
  );
}

export default App
