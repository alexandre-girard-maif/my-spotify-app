
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Account from './pages/AccountPage.jsx';
import { fetchAccountProfile, fetchPlaylists, fetchTopArtists, fetchTopTracks } from './api/spotify.js';
import App from './App.jsx';
import Login from './pages/Login.jsx';

import TopTracks from './pages/TopTracksPage.jsx';
import TopArtists from './pages/TopArtistsPage.jsx';
import Playlists from './pages/PlaylistsPage.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './Layout.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'callback', element: <Callback /> },
      {
        path: 'account',
        element: <Account />,
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          return await fetchAccountProfile(token);
        },
        hydrateFallbackElement: <div>Loading account info from Spotify...</div>,
      },
      { 
        path: 'top-tracks', 
        element: <TopTracks />,
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          return await fetchTopTracks(token, 10, 'short_term');
        },
        hydrateFallbackElement: <div>Loading top tracks from Spotify...</div>,
       },
      { 
        path: 'top-artists', 
        element: <TopArtists /> ,
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          return await fetchTopArtists(token, 10, 'short_term');
        },
        hydrateFallbackElement: <div>Loading top artists from Spotify...</div>,
      },
      { 
        path: 'playlists', 
        element: <Playlists />, 
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          return await fetchPlaylists(token, 10);
        },
        hydrateFallbackElement: <div>Loading playlists from Spotify...</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
