
import { createPkcePair } from '../api/pkce.js';
import '../styles/theme.css';
import './PageLayout.css';
import './LoginPage.css';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = `${globalThis.location.origin}/callback`;
const scope = 'user-read-private user-read-email user-top-read playlist-read-private';

export default function LoginPage() {
  const missingEnv = !clientId || !redirectUri;
  const params = new URLSearchParams(globalThis.location.search);
  const rawRedirect = params.get('redirect');
  const nextParam = rawRedirect ? decodeURIComponent(rawRedirect) : params.get('next');
  const safeNext = nextParam?.startsWith('/') ? nextParam : '/';

  const handleLogin = async () => {
    if (missingEnv) return;
    const { codeVerifier, codeChallenge } = await createPkcePair(128);
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    localStorage.setItem('post_auth_redirect', safeNext);
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
    <div className="login-container page-container">
      <h1 className="login-title page-title">Welcome to My Spotify App</h1>
      <p className="login-desc">Log in with your Spotify account to explore your music stats, playlists, and more!</p>
      <button
        className={`login-btn btn btn--spotify${missingEnv ? ' btn--disabled' : ''}`}
        onClick={handleLogin}
        disabled={missingEnv}
        aria-disabled={missingEnv || undefined}
      >
        Login with Spotify
      </button>
      {missingEnv && (
        <div className="login-error" role="alert" aria-live="polite">
          Login is disabled: Spotify client ID or redirect URI is not configured.
          Please set <code>VITE_SPOTIFY_CLIENT_ID</code> and <code>VITE_SPOTIFY_REDIRECT_URI</code> in your <code>.env</code> file.
        </div>
      )}
    </div>
  );
}
