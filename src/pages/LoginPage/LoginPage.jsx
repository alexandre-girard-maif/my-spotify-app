
import { createPkcePair } from '../../api/pkce.js';
import { normalizePostAuthTarget } from '../../utils/redirect.js';
import { storePostAuthRedirect } from '../../utils/authRedirect.js';
import { KEY_CODE_VERIFIER } from '../../constants/storageKeys.js';
import '../../styles/theme.css';
import '../PageLayout.css';
import './LoginPage.css';
import { APP_NAME } from '../../constants/appMeta.js';

// Redirect URI must match the one set in Spotify Developer Dashboard
const redirectUri = `${globalThis.location.origin}/callback`;
// Scopes requested from Spotify API to access user data
const scope = 'user-read-private user-read-email user-top-read playlist-read-private';

/**
 * Login Page
 * @param {Object} props
 * @param {string} [props.clientIdOverride] optional explicit client id (e.g. for tests)
 * @param {(url:string)=>void} [props.onNavigate] optional navigation handler injection; defaults to assigning location.href
 * @returns {JSX.Element}
 */
export default function LoginPage({ clientIdOverride, onNavigate }) {
  // Resolve client id at render time so tests can set env after import or pass override.
  const effectiveClientId = clientIdOverride ?? import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const missingClientId = !effectiveClientId;

  // Parse redirect target from URL parameters
  const params = new URLSearchParams(globalThis.location.search);
  // Support both ?redirect=<encoded> and legacy ?next=<encoded>
  const encodedTarget = params.get('redirect') || params.get('next');
  const safeNext = normalizePostAuthTarget(encodedTarget);

  // navigation handler (dependency injection for testability / decoupling)
  const navigate = typeof onNavigate === 'function' ? onNavigate : (url) => { globalThis.location.href = url; };

  // Handle login button click to initiate Spotify OAuth2 flow
  const handleLogin = async () => {
    // Create PKCE code verifier and challenge pair for secure OAuth2 flow
  const { codeVerifier, codeChallenge } = await createPkcePair(128);
  localStorage.setItem(KEY_CODE_VERIFIER, codeVerifier);
  storePostAuthRedirect(safeNext);
    const args = new URLSearchParams({
      response_type: 'code',
      client_id: effectiveClientId,
      scope: scope,
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });
    const authUrl = `https://accounts.spotify.com/authorize?${args.toString()}`;
    navigate(authUrl);
  };

  return (
    <div className="login-container page-container">
      <h1 className="login-title page-title">Welcome to {APP_NAME}</h1>
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
