var dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

/**
 * Encodes client ID and secret for Basic Auth.
 * @param {*} clientId 
 * @param {*} clientSecret 
 * @returns 
 */
function encodeBasicAuth(clientId, clientSecret) {
  return Buffer.from(clientId + ":" + clientSecret, "utf8").toString("base64");
}

/**
 * Generates an access token using client credentials.
 * @returns 
 */
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

module.exports = {
  generateAccessToken,
};