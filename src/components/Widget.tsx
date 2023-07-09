import { useState, useEffect } from 'react';
import {DARK_THEME, LIGHT_THEME} from '../utils/constants'
import { Files, Menu, Navbar, Search } from './views';
import Arweave from 'arweave';
import { Theme } from '../types';

function Widget({
theme = 'dark',
mode = 'select',
customArweave,
address,
defaultView = 'search',
preferredHideMode = 'dropdown',
defaultEntityId,
cacheResults = false
}:{
    address?: string |( () => string); // default account to load for drive selector
    defaultEntityId?: string // default entity to load for drive selector
    customArweave?: Arweave
    transactionIdCallback?: (txid:string) => string; // returns data txid of the arfs file
    mode?: 'select' | "download" // determined by implementation whether or to return the transaction id or download the file
    theme?: 'light' | 'dark' | Theme // light, dark, or custom theme
    defaultView?: 'search' | 'files' | 'drive' // default view to show when widget is opened
    preferredHideMode?: "icon" | "dropdown" | "invisible" // widget hide behavior
    cacheResults?: boolean // whether or not to cache results
    
}) {
  const [view, setView] = useState<'search' | 'files' | 'drive'>(defaultView);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [hideWidget, setHideWidget] = useState<boolean>(true);
  const [hideMode, setHideMode] = useState<"icon" | "dropdown" | "invisible">(preferredHideMode);
  const [currentTheme, setCurrentTheme] = useState<Theme>(DARK_THEME)
  const [dataMode, setDataMode] = useState<'select' | 'download'>(mode) // what happens when a file is selected
  const [arweave, setArweave] = useState<Arweave>()
  //
  const [arweaveAddress, setArweaveAddress] = useState<string>()
  const [arfsEntityId, setArfsEntityId] = useState<string>()

  useEffect(()=>{

    switch(theme){
        case 'dark':
            setCurrentTheme(DARK_THEME)
            break;
        case 'light':
            setCurrentTheme(LIGHT_THEME)
            break;
        default: setCurrentTheme(theme)
            break;
    }
    if (mode){
        setDataMode(mode)
    }
    if (customArweave){
        setArweave(customArweave)
    }
    if (address){
        if (typeof address === 'function'){
            setArweaveAddress(address())
        } else {
            setArweaveAddress(address)
        }
    }
    if (defaultView){
        setView(defaultView)
    }

    if (defaultEntityId){
        setArfsEntityId(defaultEntityId)
    }

  },[theme, address, mode, customArweave, defaultEntityId, defaultView])

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

export default Widget;
