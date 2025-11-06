import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import routes from './routes.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';

// Global styles: order matters (theme first, then base, then components)
import './styles/theme.css';
import './styles/index.css';
import './styles/AppHero.css';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
