import { ArweaveAddress, EntityID } from '@atticusofsparta/arfs-lite-client';
import { EnterFullScreenIcon, ExitFullScreenIcon } from '@radix-ui/react-icons';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import useArweaveCompositeDataProvider from '../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';
import ArFSDrive from '../services/ArFSDrive';
import { ENTITY_TYPES, Theme } from '../types';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';
import CircleProgressBar from './progress/CircleProgressBar/CircleProgressBar';
import { Files, Menu, Navbar, Search } from './views';
import WidgetHidden from './views/WidgetHidden/WidgetHidden';

function Widget({
  theme = 'dark',
  mode = 'select',
  customArweave,
  address,
  defaultView = 'search',
  preferredHideMode = 'icon',
  defaultEntityId,
}: {
  address?: string | (() => string); // default account to load for drive selector
  defaultEntityId?: string; // default entity to load for drive selector
  customArweave?: Arweave;
  transactionIdCallback?: (txid: string) => string; // returns data txid of the arfs file
  mode?: 'select' | 'download'; // determined by implementation whether or to return the transaction id or download the file
  theme?: 'light' | 'dark' | Theme; // light, dark, or custom theme
  defaultView?: 'search' | 'files' | 'drive'; // default view to show when widget is opened
  preferredHideMode?: 'icon' | 'dropdown' | 'invisible'; // widget hide behavior
}) {
  const arweaveDataProvider = useArweaveCompositeDataProvider(customArweave);
  const [view, setView] = useState<'search' | 'files' | 'drive'>(defaultView);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [hideWidget, setHideWidget] = useState<boolean>(true);
  // const [hideMode, setHideMode] = useState<'icon' | 'dropdown' | 'invisible'>(
  //   preferredHideMode,
  // );
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [, setCurrentTheme] = useState<Theme>(DARK_THEME);
  const [, setDataMode] = useState<'select' | 'download'>(mode); // what happens when a file is selected
  const [, setArweave] = useState<Arweave | undefined>(customArweave);
  //
  const [, setArweaveAddress] = useState<string | undefined>(address);
  const [arfsEntityId, setArfsEntityId] = useState<EntityID | undefined>(
    defaultEntityId ? new EntityID(defaultEntityId) : undefined,
  );
  const [entityType, setEntityType] = useState<ENTITY_TYPES | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadPercentage] = useState<number>(0);

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
    if (arfsEntityId && arfsEntityId.toString().length > 0) {
      updateDrive(arfsEntityId);
      return;
    }

    setDrive(undefined);
  }, [arfsEntityId]);

  async function updateDrive(id: EntityID) {
    try {
      setLoading(true);
      setView('files');
      if (entityType === ENTITY_TYPES.DRIVE && id) {
        // TODO: setup event listeners to get loading feedback from the arfs client91
        // const cachedEntities = await getCachedItemsByDriveId(id.toString())
        // console.log(cachedEntities)

        const owner = await arweaveDataProvider._ArFSClient.getOwnerForDriveId(
          id,
        );
        const driveEntity =
          await arweaveDataProvider._ArFSClient.getPublicDrive({
            driveId: id,
            owner,
          });

        const newDrive = await arweaveDataProvider.buildDrive(driveEntity);
        setDrive(newDrive);
      }
      if (entityType === ENTITY_TYPES.FOLDER && id) {
        const entityTypeResult = await arweaveDataProvider.getEntityType(id);
        if (
          !entityTypeResult ||
          entityTypeResult.type !== ENTITY_TYPES.FOLDER
        ) {
          throw new Error('Invalid entity type');
        }
        const folderEntity =
          await arweaveDataProvider._ArFSClient.getPublicFolder({
            folderId: id,
            owner: new ArweaveAddress(entityTypeResult.owner),
          });

        const newDrive = await arweaveDataProvider.buildDriveForFolder(
          folderEntity,
        );
        setDrive(newDrive);
      }
      if (entityType === ENTITY_TYPES.FILE && id) {
        const entityTypeResult = await arweaveDataProvider.getEntityType(id);
        if (!entityTypeResult || entityTypeResult.type !== ENTITY_TYPES.FILE) {
          throw new Error('Invalid entity type');
        }
        const fileEntity = await arweaveDataProvider._ArFSClient.getPublicFile({
          fileId: id,
          owner: new ArweaveAddress(entityTypeResult.owner),
        });

        const newDrive = await arweaveDataProvider.buildDriveForFile(
          fileEntity,
        );
        setDrive(newDrive);
      }
    } catch (error) {
      console.error(error);
      setView('search');
    } finally {
      setLoading(false);
    }
  }

  function getDefaultAddress(address: string | (() => string)) {
    if (typeof address === 'function') {
      return address();
    } else {
      return address;
    }
  }

  function handleStartFolder (id: EntityID, type: ENTITY_TYPES, arfsDrive: ArFSDrive | undefined) {
    switch (type){
      case ENTITY_TYPES.FOLDER:
        return id;
      case ENTITY_TYPES.FILE:{
        const file = arfsDrive?._fileEntities?.find(file => file.entityId.toString() === id.toString());
        return arfsDrive?._folderEntities?.find(folder => folder.entityId.toString() === file.parentFolderId.toString())?.entityId;
      }
      default:
        return undefined
    }
  }

  return (
    <>
      {!hideWidget ? (
        <div className={`widget`} style={fullScreen ? {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 0,

        } : {
          position:"relative"
        }}>
          <Navbar
            hideWidget={hideWidget}
            setHideWidget={setHideWidget}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />

          <div className="viewContainer fade-in">
            {!loading ? (
              showMenu ? (
                <Menu
                  hideWidget={hideWidget}
                  setHideWidget={setHideWidget}
                  setShowMenu={setShowMenu}
                  setView={setView}
                  view={view}
                  fullScreen={fullScreen}
                />
              ) : view === 'search' ? (
                <Search
                  addressCallback={(address) => setArweaveAddress(address)}
                  entityIdCallback={(entityId) => {
                    setArfsEntityId(new EntityID(entityId.toString()));
                  }}
                  entityTypeCallback={(type?: ENTITY_TYPES) =>
                    setEntityType(type)
                  }
                  defaultAddress={
                    address ? getDefaultAddress(address) : undefined
                  }
                  defaultEntityId={defaultEntityId}
                  fullScreen={fullScreen}
                />
              ) : view === 'files' ? (
                <Files
                  drive={drive}
                  loadingDrive={loading}
                  loadPercentage={loadPercentage}
                  startFolder={ handleStartFolder(arfsEntityId, entityType, drive) }
                  fullScreen={fullScreen}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            <button
              className={'full-screen-button'}
              onClick={() => setFullScreen(!fullScreen)}
            >
              {fullScreen ? (
                <ExitFullScreenIcon
                  width={24}
                  height={24}
                  color={'var(--text-dark-theme)'}
                />
              ) : (
                <EnterFullScreenIcon
                  width={24}
                  height={24}
                  color={'var(--text-dark-theme)'}
                />
              )}
            </button>
          </div>
          {loading ?
            <div
            className="flex-column center"
            style={{
              position: 'absolute',
              zIndex: 100,
              margin: 'auto',
              top: "25%",
              bottom: "25%",
              left: "25%",
              right:"25%"

            }}
          >
            <span
              className="textLarge white"
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'absolute',
                margin: 'auto',
              }}
            >
              Loading Drive...
            </span>
            <CircleProgressBar size={250} color="var(--primary)" />
          </div>
            : <></>}
        </div>
      ) : (
        <WidgetHidden
          mode={preferredHideMode}
          hideWidget={hideWidget}
          setHideWidget={setHideWidget}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      )}
    </>
  );
}

export default Widget;
