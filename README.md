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


