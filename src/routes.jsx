import React from 'react';
// redirect no longer needed directly; helper handles it
import Account from './pages/AccountPage.jsx';
import { fetchAccountProfile, fetchPlaylists, fetchTopArtists, fetchTopTracks } from './api/spotify.js';
import { makeProtectedLoader } from './loaders/protectedLoader.js';
import WelcomePage from './pages/WelcomePage.jsx';
import Login from './pages/LoginPage.jsx';
import TopTracks from './pages/TopTracksPage.jsx';
import TopArtists from './pages/TopArtistsPage.jsx';
import Playlists from './pages/PlaylistsPage.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';

/**
 * Application routes configuration.
 */
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'callback', element: <Callback /> },
      {
        path: 'account',
        element: <Account />,
        loader: makeProtectedLoader(token => fetchAccountProfile(token)),
        hydrateFallbackElement: <div>Loading account info from Spotify...</div>,
      },
      {
        path: 'top-tracks',
        element: <TopTracks />,
        loader: makeProtectedLoader(token => fetchTopTracks(token, 10, 'short_term')),
        hydrateFallbackElement: <div>Loading top tracks from Spotify...</div>,
      },
      {
        path: 'top-artists',
        element: <TopArtists />,
        loader: makeProtectedLoader(token => fetchTopArtists(token, 10, 'short_term')),
        hydrateFallbackElement: <div>Loading top artists from Spotify...</div>,
      },
      {
        path: 'playlists',
        element: <Playlists />,
        loader: makeProtectedLoader(token => fetchPlaylists(token, 10)),
        hydrateFallbackElement: <div>Loading playlists from Spotify...</div>,
      },
    ],
  },
];

export default routes;
