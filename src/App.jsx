import './App.css'
import TopTracks from './pages/TopTracks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Login from './pages/Login'
import Callback from './pages/Callback'
import Account from './pages/Account'
import TopArtists from './pages/TopArtists'
import Playlists from './pages/Playlists'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TopTracks />} />
          <Route path="login" element={<Login />} />
          <Route path="callback" element={<Callback />} />
          <Route path="account" element={<Account />} />
          <Route path="top-tracks" element={<TopTracks />} />
          <Route path="top-artists" element={<TopArtists />} />
          <Route path="playlists" element={<Playlists />} />
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App
