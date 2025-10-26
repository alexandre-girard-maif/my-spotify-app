
import React from 'react';
import { createRoot } from 'react-dom/client';
import routes from './routes.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import './App.css'

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
