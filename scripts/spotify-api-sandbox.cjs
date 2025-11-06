/* ES5 CommonJS sandbox for Spotify API playlist inspection. */
var dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const { fetchPlaylistById } = require("../src/api/spotify-playlists");

function encodeBasicAuth(clientId, clientSecret) {
  return Buffer.from(clientId + ":" + clientSecret, "utf8").toString("base64");
}

function generateAccessToken() {
  var clientId = process.env.SPOTIFY_CLIENT_ID;
  var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return Promise.reject(
      new Error(
        "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local"
      )
    );
  }
  var base64AuthString = encodeBasicAuth(clientId, clientSecret);
  return fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + base64AuthString,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        console.error("Error fetching access token:", data.error);
        throw new Error("Error fetching access token: " + data.error.message);
      }
      return data.access_token;
    });
}

var playlistId = "2IgPkhcHbgQ4s4PdCxljAx";

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
