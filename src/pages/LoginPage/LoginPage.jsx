
import { createPkcePair } from '../../api/pkce.js';
import { normalizePostAuthTarget } from '../../utils/redirect.js';
import '../../styles/theme.css';
import '../PageLayout.css';
import './LoginPage.css';

// Spotify OAuth2 parameters from environment variables 
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// Redirect URI must match the one set in Spotify Developer Dashboard
const redirectUri = `${globalThis.location.origin}/callback`;
// Scopes requested from Spotify API to access user data
const scope = 'user-read-private user-read-email user-top-read playlist-read-private';

/**
 * Login Page
 * @returns {JSX.Element}
 */
export default function LoginPage() {
  // Check if client ID is configured
  const missingClientId = !clientId;
  // Parse redirect target from URL parameters
  const params = new URLSearchParams(globalThis.location.search);
  // Support both ?redirect=<encoded> and legacy ?next=<encoded>
  const encodedTarget = params.get('redirect') || params.get('next');
  const safeNext = normalizePostAuthTarget(encodedTarget);

  // Handle login button click to initiate Spotify OAuth2 flow
  const handleLogin = async () => {
    // Prevent login if client ID is missing
    if (missingClientId) return;
    // Create PKCE code verifier and challenge pair for secure OAuth2 flow
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
        className={`login-btn btn btn--spotify${missingClientId ? ' btn--disabled' : ''}`}
        onClick={handleLogin}
        disabled={missingClientId}
        aria-disabled={missingClientId || undefined}
      >
        Login with Spotify
      </button>
      {missingClientId && (
        <div className="login-error" role="alert" aria-live="polite">
          Login is disabled: Spotify client ID is not configured.
          Please set <code>VITE_SPOTIFY_CLIENT_ID</code> in your <code>.env</code> file.
        </div>
      )}
    </div>
  );
}
