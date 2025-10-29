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
    // Defer the token check so that components can render an initial skeleton frame.
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const existing = localStorage.getItem(SPOTIFY_TOKEN_KEY);
      if (!existing) {
        // Include origin + path so that the login page can restore full context.
        // We intentionally use globalThis.location pieces (not react-router) to avoid coupling.
        const { origin, pathname, search, hash } = globalThis.location;
        const fullTarget = `${origin}${pathname}${search}${hash}`;
        navigate(`/login?next=${encodeURIComponent(fullTarget)}`, { replace: true });
        setChecking(false);
        return;
      }
      setToken(existing);
      setChecking(false);
    });
    return () => { active = false; };
  }, [navigate]);

  return { token, checking };
}
