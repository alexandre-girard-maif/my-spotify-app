// src/hooks/useRequireToken.js
// Hook that returns the spotify access token, redirecting to /login if missing.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KEY_ACCESS_TOKEN } from '../constants/storageKeys.js';

export function useRequireToken() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
  const existing = localStorage.getItem(KEY_ACCESS_TOKEN);
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
