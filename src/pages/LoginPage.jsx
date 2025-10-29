
import { createPkcePair } from '../api/pkce.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { safeRedirect } from '../utils/redirect.js';
import '../styles/theme.css';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
let redirectUri = `${globalThis.location.origin}/callback`;

const scope = 'user-read-private user-read-email user-top-read playlist-read-private';

export default function LoginPage() {
  const missingEnv = !clientId || !redirectUri;
  const navigate = useNavigate();
  const params = new URLSearchParams(globalThis.location.search);
  const rawRedirect = params.get('redirect');
  const decodedRedirect = rawRedirect ? decodeURIComponent(rawRedirect) : null;
  const targetPath = safeRedirect(decodedRedirect);

  // If already authenticated, skip login page and go directly.
  useEffect(() => {
    const existingToken = localStorage.getItem('spotify_access_token');
    if (existingToken) {
      navigate(targetPath, { replace: true });
    }
  }, [navigate, targetPath]);

  const handleLogin = async () => {
    if (missingEnv) return;
    const { codeVerifier, codeChallenge } = await createPkcePair(128);
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    // Store desired redirect target for after callback
    localStorage.setItem('post_auth_redirect', targetPath);
    const args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });
    globalThis.location = `https://accounts.spotify.com/authorize?${args.toString()}`;
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Welcome to My Spotify App</h2>
        <p className="login-desc">
          Log in with your Spotify account to explore your music stats, playlists, and more!
        </p>
        <button
          className={`login-btn btn btn--spotify${missingEnv ? ' btn--disabled' : ''}`}
          onClick={handleLogin}
          disabled={missingEnv}
        >
          Login with Spotify
        </button>
        {missingEnv && (
          <div className="login-error">
            Login is disabled: Spotify client ID or redirect URI is not configured.<br />
            Please set <code>VITE_SPOTIFY_CLIENT_ID</code> and <code>VITE_SPOTIFY_REDIRECT_URI</code> in your <code>.env</code> file.
          </div>
        )}
      </div>
    </div>
  );
}
