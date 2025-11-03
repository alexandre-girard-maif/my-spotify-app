import WelcomePage from './pages/WelcomePage.jsx';
import TopTracksPage from './pages/TopTracksPage.jsx';
import TopArtistsPage from './pages/TopArtistsPage/TopArtistsPage.jsx';
import PlaylistsPage from './pages/PlaylistsPage.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import AccountPage from './pages/AccountPage/AccountPage.jsx';

/**
 * Application routes configuration.
 */
const routes = [
  {
    // main layout
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
      {
        // 404 page
        path: "*",
        element: <NotFoundPage />
      }
    ],
  },
];

export default routes;