
import { generateRandomString, generateCodeChallenge } from './api/pkce.js';


const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scope = 'user-read-private user-read-email user-top-read';

export default function Login() {
  const handleLogin = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('spotify_code_verifier', codeVerifier);
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
      <h1>Login to Spotify</h1>
      <button onClick={handleLogin} style={{ padding: '1em 2em', fontSize: '1.2em', borderRadius: '5px', background: '#1DB954', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Login with Spotify
      </button>
    </div>
  );
}
