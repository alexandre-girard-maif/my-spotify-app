// redirect no longer needed directly; helper handles it
import Account from './pages/AccountPage.jsx';
import { fetchAccountProfile, fetchUserPlaylists } from './api/spotify.js';
import { makeProtectedLoader } from './loaders/protectedLoader.js';
import WelcomePage from './pages/WelcomePage.jsx';
import TopTracks from './pages/TopTracksPage.jsx';
import TopArtists from './pages/TopArtistsPage.jsx';
import Playlists from './pages/PlaylistsPage.jsx';
import Callback from './pages/Callback.jsx';
import Layout from './Layout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

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
        loader: makeProtectedLoader(token => fetchAccountProfile(token)),
        hydrateFallbackElement: <div>Loading account info from Spotify...</div>,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        loader: makeProtectedLoader(async (token) => {
          // Retrieve multiple data points for dashboard
          // Top 1 track and artist for summary
          const topTrack = (await fetchUserTopTracks(token, 1, 'short_term')).tracks[0];
          const topArtist = (await fetchUserTopArtists(token, 1, 'short_term')).artists[0];

          console.log('Dashboard loader fetched topTrack and topArtist');
          console.log('Top Track:', topTrack);
          console.log('Top Artist:', topArtist);

          return { topTrack, topArtist };
        }),
        hydrateFallbackElement: <div>Loading dashboard...</div>,
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
        loader: makeProtectedLoader(token => fetchUserPlaylists(token, 10)),
        hydrateFallbackElement: <div>Loading playlists from Spotify...</div>,
      },
    ],
  },
];

export default routes;
