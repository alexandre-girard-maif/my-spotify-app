import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
import '../PageLayout.css';

/**
 * NotFoundPage component
 * @returns {JSX.Element}
 */
export default function NotFoundPage() {
  // Initialize navigate function
  const navigate = useNavigate();
  React.useEffect(() => { document.title = 'Not Found | Spotify App'; }, []);
  
  return (
    <div className="notfound-container page-container">
      <h1 className="notfound-title page-title">404 – Page Not Found</h1>
      <p className="notfound-message">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
      <button
        type="button"
        className="notfound-home-btn"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
}
