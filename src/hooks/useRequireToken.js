// src/hooks/useRequireToken.js
// Hook that returns the spotify access token, redirecting to /login if missing.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SPOTIFY_TOKEN_KEY } from '../constants/auth.js';

export function useRequireToken() {
  const navigate = useNavigate();
  const [checking, setChecking] = React.useState(true);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const existing = localStorage.getItem(SPOTIFY_TOKEN_KEY);
    if (!existing) {
      navigate('/login', { replace: true });
      setChecking(false);
      return;
    }
    setToken(existing);
    setChecking(false);
  }, [navigate]);

  return { token, checking };
}
