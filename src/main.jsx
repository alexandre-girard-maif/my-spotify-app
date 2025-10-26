
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';


import Account from './pages/AccountPage.jsx';
import { fetchAccountProfile, fetchPlaylists, fetchTopArtists, fetchTopTracks } from './api/spotify.js';
import WelcomePage from './pages/WelcomePage.jsx';
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
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <Login /> },
      { path: 'callback', element: <Callback /> },
      {
        path: 'account',
        element: <Account />,
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          if (!token) return redirect('/login');
          const result = await fetchAccountProfile(token);
          if (result.error) return redirect('/login');
          return result;
        },
        hydrateFallbackElement: <div>Loading account info from Spotify...</div>,
      },
      { 
        path: 'top-tracks', 
        element: <TopTracks />,
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          if (!token) return redirect('/login');
          const result = await fetchTopTracks(token, 10, 'short_term');
          if (result.error) return redirect('/login');
          return result;
        },
        hydrateFallbackElement: <div>Loading top tracks from Spotify...</div>,
       },
      { 
        path: 'top-artists', 
        element: <TopArtists /> ,
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          if (!token) return redirect('/login');
          const result = await fetchTopArtists(token, 10, 'short_term');
          if (result.error) return redirect('/login');
          return result;
        },
        hydrateFallbackElement: <div>Loading top artists from Spotify...</div>,
      },
      { 
        path: 'playlists', 
        element: <Playlists />, 
        loader: async () => {
          const token = localStorage.getItem('spotify_access_token');
          if (!token) return redirect('/login');
          const result = await fetchPlaylists(token, 10);
          if (result.error) return redirect('/login');
          return result;
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
