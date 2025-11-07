import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage.jsx';
import TopTracksPage from './pages/TopTracksPage/TopTracksPage.jsx';
import TopArtistsPage from './pages/TopArtistsPage/TopArtistsPage.jsx';
import PlaylistsPage from './pages/PlaylistsPage/PlaylistsPage.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './components/Layout/Layout.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import AccountPage from './pages/AccountPage/AccountPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'callback', element: <Callback /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'top-tracks', element: <TopTracksPage /> },
      { path: 'top-artists', element: <TopArtistsPage /> },
      { path: 'playlists', element: <PlaylistsPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;