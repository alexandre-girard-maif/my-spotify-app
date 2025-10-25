
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Account from './Account.jsx';
import App from './App.jsx';
import Login from './Login.jsx';

import TopTracks from './TopTracks.jsx';
import Playlists from './Playlists.jsx';
import Callback from './Callback.jsx';
import Layout from './Layout.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="callback" element={<Callback />} />
          <Route path="account" element={<Account />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="playlists" element={<Playlists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
