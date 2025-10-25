import React from 'react';

// Utility functions for PKCE
function generateRandomString(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
}

function base64UrlEncode(arrayBuffer) {
  let str = String.fromCharCode.apply(null, Array.from(arrayBuffer));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier) {
  const hashed = await sha256(codeVerifier);
  return base64UrlEncode(hashed);
}

const clientId = '26f6c42b39424f27b64b208d55506267'; // TODO: Replace with your Spotify client ID
const redirectUri = 'http://127.0.0.1:5173/callback'; // TODO: Set this in your Spotify app settings
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
