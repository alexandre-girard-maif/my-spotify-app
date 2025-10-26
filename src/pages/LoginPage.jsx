
import { generateRandomString, generateCodeChallenge } from '../api/pkce.js';
import './Login.css';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
let redirectUri = `${window.location.origin}/callback`;

const scope = 'user-read-private user-read-email user-top-read playlist-read-private';

export default function LoginPage() {
  const missingEnv = !clientId || !redirectUri;
  // Capture intended post-auth path from query (?next=/desired/path)
  const params = new URLSearchParams(globalThis.location.search);
  const nextParam = params.get('next');
  const safeNext = nextParam?.startsWith('/') ? nextParam : '/';
  const handleLogin = async () => {
    if (missingEnv) return;
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    // Store desired redirect target for after callback
    localStorage.setItem('post_auth_redirect', safeNext);
    const args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });
    window.location = `https://accounts.spotify.com/authorize?${args.toString()}`;
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Spotify Logo" className="login-logo" />
        <h2 className="login-title">Welcome to My Spotify App</h2>
        <p className="login-desc">
          Log in with your Spotify account to explore your music stats, playlists, and more!
        </p>
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={missingEnv}
          style={missingEnv ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          Login with Spotify
        </button>
        {missingEnv && (
          <div style={{ color: '#b91c1c', marginTop: 18, fontWeight: 500, fontSize: '1em' }}>
            Login is disabled: Spotify client ID or redirect URI is not configured.<br />
            Please set <code>VITE_SPOTIFY_CLIENT_ID</code> and <code>VITE_SPOTIFY_REDIRECT_URI</code> in your <code>.env</code> file.
          </div>
        )}
      </div>
    </div>
  );
}
