
import { Link, Outlet } from 'react-router-dom';
import { version } from '../../../package.json';
import MainNav from '../MainNav/MainNav';
import './Layout.css';
import { APP_NAME } from '../../constants/appMeta.js';

export default function Layout() {
  return (
    <div className="layout-root">
      <header className="layout-header" role="banner">
        <Link to="/" className="layout-brand" aria-label={`Go to home - ${APP_NAME}`}>{APP_NAME}</Link>
        <MainNav />
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer" role="contentinfo">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME} – v{version}
        </p>
      </footer>
    </div>
  );
}
