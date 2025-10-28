// redirect no longer needed directly; helper handles it
import Account from './pages/AccountPage.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
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
      // normal route definitions
      { index: true, element: <WelcomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'callback', element: <Callback /> },
      // protected routes with loaders
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'top-tracks',
        element: <TopTracks />,
      },
      {
        path: 'top-artists',
        element: <TopArtists />,
      },
      {
        path: 'playlists',
        element: <Playlists />,
      },
    ],
  },
];

export default routes;
