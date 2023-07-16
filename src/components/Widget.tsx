import { ArFSDriveEntity, ArweaveAddress, EntityID } from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import { ENTITY_TYPES, Theme } from '../types';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';
import { Files, Menu, Navbar, Search } from './views';
import ArFSDrive from '../services/ArFSDrive';
import useArweaveCompositeDataProvider from '../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';

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
  const arweaveDataProvider = useArweaveCompositeDataProvider(customArweave);
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

  const [drive, setDrive] = useState<ArFSDrive>();

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

  useEffect(() => {
    if (arfsEntityId) {
        updateDrive(arfsEntityId)
    }
  
  },[arfsEntityId])

  useEffect(() => {
   // console.log({entityType})
  },[entityType])

  async function updateDrive(id:EntityID) {
    try {
    //  console.log('updating drive', {arfsEntityId, entityType})
      if (entityType === ENTITY_TYPES.DRIVE && id){
        const owner = await arweaveDataProvider._ArFSClient.getOwnerForDriveId(id)
        const driveEntity = await arweaveDataProvider._ArFSClient.getPublicDrive({driveId: id, owner})
      //  console.log(driveEntity)
        const newDrive = await arweaveDataProvider.buildDrive(driveEntity)
        setDrive(newDrive)
      }
      if (entityType === ENTITY_TYPES.FOLDER && id){
        const entityTypeResult = await arweaveDataProvider.getEntityType(id)
        if (!entityTypeResult || entityTypeResult.type !== ENTITY_TYPES.FOLDER) {
          throw new Error('Invalid entity type')
        }
        const folderEntity = await arweaveDataProvider._ArFSClient.getPublicFolder({folderId: id, owner: new ArweaveAddress(entityTypeResult.owner)})
        const driveEntity = await arweaveDataProvider._ArFSClient.getPublicDrive({driveId: folderEntity.driveId, owner: new ArweaveAddress(entityTypeResult.owner)})
        const newDrive = await arweaveDataProvider.buildDrive(driveEntity)
        setDrive(newDrive)

      }
      if (entityType === ENTITY_TYPES.FILE && id){
        const entityTypeResult = await arweaveDataProvider.getEntityType(id)
        if (!entityTypeResult || entityTypeResult.type !== ENTITY_TYPES.FILE) {
          throw new Error('Invalid entity type')
        }
        const fileEntity = await arweaveDataProvider._ArFSClient.getPublicFile({fileId: id, owner: new ArweaveAddress(entityTypeResult.owner)})
        console.log(fileEntity.driveId, entityTypeResult.owner)
        const driveEntity = await arweaveDataProvider._ArFSClient.getPublicDrive({driveId: fileEntity.driveId, owner: new ArweaveAddress(entityTypeResult.owner)})
        const newDrive = await arweaveDataProvider.buildDrive(driveEntity)
        setDrive(newDrive)
      }
    } catch (error) {
      console.error(error)
    }

  }

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
              entityIdCallback={(entityId) => setArfsEntityId(new EntityID(entityId.toString()))}
              entityTypeCallback={(type: ENTITY_TYPES | undefined) => setEntityType(type)}
              defaultAddress={address ? getDefaultAddress(address) : undefined}
              defaultEntityId={defaultEntityId}
              />
            ) : view === 'files' ? (
              <Files
              ids={[]}
              />
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
