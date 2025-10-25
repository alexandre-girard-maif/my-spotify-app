import './App.css'
import TopTracks from './TopTracks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Login from './Login'
import Callback from './Callback'
import Account from './Account'
import TopArtists from './TopArtists'
import Playlists from './Playlists'

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
