

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
let redirectUri = `${globalThis.location.origin}/callback`;

export default function Callback() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function exchangeToken() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (!code) {
        setError('No code found in URL.');
        setLoading(false);
        return;
      }
      const codeVerifier = localStorage.getItem('spotify_code_verifier');
      if (!codeVerifier) {
        setError('No code verifier found.');
        setLoading(false);
        return;
      }
      try {
        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier,
        });
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        });
        const data = await response.json();
        if (data.access_token) {
          localStorage.setItem('spotify_access_token', data.access_token);
          const storedNext = localStorage.getItem('post_auth_redirect');
          const target = storedNext?.startsWith('/') ? storedNext : '/';  localStorage.removeItem('post_auth_redirect');
          globalThis.location.replace(globalThis.location.origin + target);
        } else {
          setError(data.error_description || 'Failed to get access token.');
        }
      } catch {
        setError('Network or server error.');
      }
      setLoading(false);
    }
    exchangeToken();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
      <h1>Spotify Callback</h1>
      {loading && <p>Processing authentication...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
