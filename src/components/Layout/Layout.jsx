
import { Link, Outlet } from 'react-router-dom';
import { version } from '../../../package.json';
import MainNav from '../MainNav/MainNav';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout-root">
    <header className="layout-header" role="banner">
      <Link to="/" className="layout-brand" aria-label="Go to home">Music Discovery App</Link>
        <MainNav />
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer" role="contentinfo">
        <p>
          &copy; {new Date().getFullYear()} Music Discovery App – v{version}
        </p>
      </footer>
    </div>
  );
}
