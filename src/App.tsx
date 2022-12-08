import { useState } from 'react';

import { Files, Menu, Navbar, Notifications, Search } from './components/views';

function App() {
  const [view, setView] = useState('search');
  const [showMenu, setShowMenu] = useState(true);
  const [hideWidget, setHideWidget] = useState(true);

  return (
    <>
      {!hideWidget ? (
        <div className="widget">
          <Navbar
            hideWidget={hideWidget}
            setHideWidget={setHideWidget}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
          <Notifications />
          <div className="viewContainer">
            {view === 'search' ? (
              <Search />
            ) : view === 'files' ? (
              <Files />
            ) : (
              <></>
            )}

            {showMenu ? (
              <Menu
                hideWidget={hideWidget}
                setHideWidget={setHideWidget}
                setShowMenu={setShowMenu}
                setView={setView}
                view={view}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="widget-hidden">
          <Navbar
            hideWidget={hideWidget}
            setHideWidget={setHideWidget}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>
      )}
    </>
  );
}

export default App;
