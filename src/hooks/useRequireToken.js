// src/hooks/useRequireToken.js
// Hook that returns the spotify access token, redirecting to /login if missing.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SPOTIFY_TOKEN_KEY } from '../constants/auth.js';

export function useRequireToken() {
  const navigate = useNavigate();
  const tokenRef = React.useRef(localStorage.getItem(SPOTIFY_TOKEN_KEY));

  React.useEffect(() => {
    if (!tokenRef.current) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return tokenRef.current;
}
