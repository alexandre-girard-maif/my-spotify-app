// load environment variables from .env.local file
import dotenv from "dotenv";
import { fetchPlaylistById } from "../src/api/spotify-me.js";
dotenv.config({ path: ".env.local" });

/**
 *
 */
function generateAccessToken() {
  // Generate a new Spotify access token
  // eslint-disable-next-line no-undef
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  // eslint-disable-next-line no-undef
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authString = `${clientId}:${clientSecret}`;
  const base64AuthString = btoa(authString);

  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64AuthString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("Error fetching access token:", data.error);
        throw new Error(`Error fetching access token: ${data.error.message}`);
      }
      return data.access_token;
    });
}

const playlistId = "2IgPkhcHbgQ4s4PdCxljAx";

generateAccessToken()
  .then((token) => {
    fetchPlaylistById(token, playlistId)
      .then((data) => {
        // extract track names and artist names
        const tracks = data.playlist.tracks.items.map((item) => ({
          trackName: item.track.name,
          artistNames: item.track.artists
            .map((artist) => artist.name)
            .join(", "),
        }));

        console.log(
          `Playlist: ${data.playlist.name} by ${data.playlist.owner.display_name}`
        );
        console.table(tracks);
      })
      .catch((error) => {
        console.error("Error fetching playlist:", error);
      });
  })
  .catch((error) => {
    console.error("Error in Spotify API sandbox:", error);
  });
