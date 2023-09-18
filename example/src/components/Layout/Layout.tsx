import { Outlet } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

function Layout() {
  return (
    <>
      <div
        className="flex flex-row dark"
        style={{
          backgroundColor: 'var(--card-bg)',
          boxSizing: 'border-box',
          margin: '0px',
          padding: '0px',
        }}
      >
        <Navbar />
      </div>
      <div className="page-container dark">
        <Outlet />
        {/* TODO: add errors here */}
      </div>
      <div
        className="flex flex-row"
        style={{
          boxSizing: 'border-box',
        }}
      >
        <Footer />
      </div>
    </>
  );
}

export default Layout;
