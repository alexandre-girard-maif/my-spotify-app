
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Account from './pages/Account.jsx';
import App from './App.jsx';
import Login from './pages/Login.jsx';

import TopTracks from './pages/TopTracks.jsx';
import TopArtists from './pages/TopArtists.jsx';
import Playlists from './pages/Playlists.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './Layout.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="callback" element={<Callback />} />
          <Route path="account" element={<Account />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="top-artists" element={<TopArtists />} />
          <Route path="playlists" element={<Playlists />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);
