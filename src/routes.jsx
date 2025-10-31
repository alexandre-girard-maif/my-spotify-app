// redirect no longer needed directly; helper handles it
import WelcomePage from './pages/WelcomePage.jsx';
import TopTracksPage from './pages/TopTracksPage.jsx';
import TopArtistsPage from './pages/TopArtistsPage.jsx';
import PlaylistsPage from './pages/PlaylistsPage.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AccountPage from './pages/AccountPage.jsx';

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
        element: <AccountPage />,
      },
      {
        path: 'top-tracks',
        element: <TopTracksPage />,
      },
      {
        path: 'top-artists',
        element: <TopArtistsPage />,
      },
      {
        path: 'playlists',
        element: <PlaylistsPage />,
      },
    ],
  },
];

export default routes;
