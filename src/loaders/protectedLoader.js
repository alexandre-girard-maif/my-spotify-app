import { redirect } from "react-router-dom";

/**
 * Factory for protected route loaders that require a valid spotify_access_token.
 * Adds ?next=<path> to login redirect so post-auth can restore original path.
 * @param {(token:string)=>Promise<any>} fetcher - Async function that returns data object with optional error property.
 * @returns {import('react-router-dom').LoaderFunction}
 */
export function makeProtectedLoader(fetcher) {
  return async ({ request }) => {
    const token = localStorage.getItem("spotify_access_token");
    const url = new URL(request.url);
    const next = encodeURIComponent(url.pathname + url.search);
    if (!token) return redirect(`/login?next=${next}`);
    const result = await fetcher(token);
    // If fetcher returns an object containing an error key, redirect to login preserving intent
    if (result?.error) return redirect(`/login?next=${next}`);
    return result;
  };
}
