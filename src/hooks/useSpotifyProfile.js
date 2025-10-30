import { useEffect, useState } from "react";
import { fetchAccountProfile } from "../api/spotify-me.js";

/**
 * React hook to obtain the Spotify profile.
 * Strategy:
 *  1. Read cached profile from localStorage (key: spotify_profile) for instant UI.
 *  2. If no cache and we have a token, fetch from API.
 *  3. Cache successful fetch back to localStorage.
 *  4. Surface loading + error states for consumer.
 *
 * @returns {{ profile: object|null, loading: boolean, error: string|null }}
 */
export function useSpotifyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Try read cache first
    try {
      const raw = localStorage.getItem("spotify_profile");
      if (raw) {
        setProfile(JSON.parse(raw));
      }
    } catch {
      /* ignore parse errors */
    }

    const token = localStorage.getItem("spotify_access_token");
    if (!token) return; // Not authenticated

    // If we already have a cached profile, skip fetch.
    if (profile) return; // profile state captured in closure intentionally

    setLoading(true);
    fetchAccountProfile(token)
      .then((result) => {
        if (cancelled) return;
        if (result.error) {
          setError(result.error);
        } else if (result.profile) {
          setProfile(result.profile);
          try {
            localStorage.setItem(
              "spotify_profile",
              JSON.stringify(result.profile)
            );
          } catch {
            /* ignore quota errors */
          }
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || "Failed to load profile");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // We deliberately exclude 'profile' from deps to avoid refetch when it's set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return { profile, loading, error };
}

export default useSpotifyProfile;
