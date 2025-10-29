[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alexandre-girard-maif_my-spotify-app&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=alexandre-girard-maif_my-spotify-app)

# my-spotify-app

A React application that integrates with the Spotify API to provide users with insights into their music preferences, including top tracks, artists, and playlists.

## Features

- User authentication with Spotify
- Display of top tracks, artists, and playlists

## Installation

1. Clone the repository
2. Install dependencies
    ```bash
    npm install
    ```
3. Create a `.env.local` file with your Spotify API credentials
    ```env
    VITE_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
    VITE_SPOTIFY_REDIRECT_URI=http://127.0.0.1:5173/callback
    ```
4. Start the development server
    ```bash
    npm start
    ``` 
5. Open your browser and navigate to `http://127.0.0.1:5173`


## Spotify Copyright & Attribution

This project uses the Spotify Web API to access user data (top tracks, artists, playlists) in accordance with Spotify’s [Developer Terms of Use](https://developer.spotify.com/terms/). All Spotify logos, brand assets, and trademarks are the property of Spotify AB.

The application is an independent, unofficial tool and is not endorsed by, affiliated with, or sponsored by Spotify. User data is fetched only after explicit authorization and is not stored server-side by this application.

If you use or distribute this code, ensure you:
- Provide your own Spotify API credentials.
- Comply with Spotify’s rate limits and branding guidelines.
- Do not misrepresent the app as an official Spotify product.

If you believe any usage here violates Spotify policy, please open an issue so it can be addressed promptly.


