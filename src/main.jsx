
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Account from './pages/AccountPage.jsx';
import { fetchAccountProfile } from './api/spotify.js';
import App from './App.jsx';
import Login from './pages/Login.jsx';

import TopTracks from './pages/TopTracks.jsx';
import TopArtists from './pages/TopArtists.jsx';
import Playlists from './pages/Playlists.jsx';
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
      { path: 'top-tracks', element: <TopTracks /> },
      { path: 'top-artists', element: <TopArtists /> },
      { path: 'playlists', element: <Playlists /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
