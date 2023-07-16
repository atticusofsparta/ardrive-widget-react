import { EntityID } from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import { ENTITY_TYPES, Theme } from '../types';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';
import { Files, Menu, Navbar, Search } from './views';

function Widget({
  theme = 'dark',
  mode = 'select',
  customArweave,
  address,
  defaultView = 'search',
  preferredHideMode = 'dropdown',
  defaultEntityId,
  cacheResults = false,
}: {
  address?: string | (() => string); // default account to load for drive selector
  defaultEntityId?: string; // default entity to load for drive selector
  customArweave?: Arweave;
  transactionIdCallback?: (txid: string) => string; // returns data txid of the arfs file
  mode?: 'select' | 'download'; // determined by implementation whether or to return the transaction id or download the file
  theme?: 'light' | 'dark' | Theme; // light, dark, or custom theme
  defaultView?: 'search' | 'files' | 'drive'; // default view to show when widget is opened
  preferredHideMode?: 'icon' | 'dropdown' | 'invisible'; // widget hide behavior
  cacheResults?: boolean; // whether or not to cache results
}) {
  const [view, setView] = useState<'search' | 'files' | 'drive'>(defaultView);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [hideWidget, setHideWidget] = useState<boolean>(true);
  const [hideMode, setHideMode] = useState<'icon' | 'dropdown' | 'invisible'>(
    preferredHideMode,
  );
  const [currentTheme, setCurrentTheme] = useState<Theme>(DARK_THEME);
  const [dataMode, setDataMode] = useState<'select' | 'download'>(mode); // what happens when a file is selected
  const [arweave, setArweave] = useState<Arweave>();
  //
  const [arweaveAddress, setArweaveAddress] = useState<string>();
  const [arfsEntityId, setArfsEntityId] = useState<EntityID>();
  const [entityType, setEntityType] = useState<ENTITY_TYPES | undefined>(
    undefined,
  );

  useEffect(() => {
    switch (theme) {
      case 'dark':
        setCurrentTheme(DARK_THEME);
        break;
      case 'light':
        setCurrentTheme(LIGHT_THEME);
        break;
      default:
        setCurrentTheme(theme);
        break;
    }
    if (mode) {
      setDataMode(mode);
    }
    if (customArweave) {
      setArweave(customArweave);
    }
    if (address) {
      setArweaveAddress(getDefaultAddress(address));
    }
    if (defaultView) {
      setView(defaultView);
    }

    if (defaultEntityId) {
      setArfsEntityId(new EntityID(defaultEntityId));
    }
  }, [theme, address, mode, customArweave, defaultEntityId, defaultView]);

  function getDefaultAddress (address: string |( () => string)) {
    if (typeof address === 'function') {
      return address();
    } else {
      return address;
    }
  }
  

  return (
    <>
      {!hideWidget ? (
        <div className={`widget`}>
          <Navbar
            hideWidget={hideWidget}
            setHideWidget={setHideWidget}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />

          <div className="viewContainer">
            {view === 'search' ? (
              <Search 
              addressCallback={(address)=> setArweaveAddress(address)}
              entityIdCallback={(entityId) => setArfsEntityId(new EntityID(entityId))}
              entityTypeCallback={(entityType: ENTITY_TYPES | undefined) => setEntityType(entityType)}
              defaultAddress={address ? getDefaultAddress(address) : undefined}
              defaultEntityId={defaultEntityId}
              />
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

export default Widget;
