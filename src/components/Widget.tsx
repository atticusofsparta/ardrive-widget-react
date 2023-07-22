import { ArweaveAddress, EntityID } from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import useArweaveCompositeDataProvider from '../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';
import ArFSDrive from '../services/ArFSDrive';
import { ENTITY_TYPES, Theme } from '../types';
import { DARK_THEME, LIGHT_THEME } from '../utils/constants';
import CircleProgressBar from './progress/CircleProgressBar/CircleProgressBar';
import { Files, Menu, Navbar, Search } from './views';

function Widget({
  theme = 'dark',
  mode = 'select',
  customArweave,
  address,
  defaultView = 'search',
  //preferredHideMode = 'dropdown',
  defaultEntityId,
}: //cacheResults = false,
{
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
  // const [hideMode, setHideMode] = useState<'icon' | 'dropdown' | 'invisible'>(
  //   preferredHideMode,
  // );
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
      if (entityType === ENTITY_TYPES.DRIVE && id) {
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
        const driveEntity =
          await arweaveDataProvider._ArFSClient.getPublicDrive({
            driveId: new EntityID(
              JSON.parse(JSON.stringify(folderEntity.driveId))['entityId'],
            ),
            owner: new ArweaveAddress(entityTypeResult.owner),
          });
        const newDrive = await arweaveDataProvider.buildDrive(driveEntity);
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
        const driveEntity =
          await arweaveDataProvider._ArFSClient.getPublicDrive({
            driveId: new EntityID(
              JSON.parse(JSON.stringify(fileEntity.driveId))['entityId'],
            ),
            owner: new ArweaveAddress(entityTypeResult.owner),
          });
        const newDrive = await arweaveDataProvider.buildDrive(driveEntity);
        setDrive(newDrive);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setView('files');
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

          <div className="viewContainer fade-in">
            {!loading ? (
              view === 'search' ? (
                <Search
                  addressCallback={(address) => setArweaveAddress(address)}
                  entityIdCallback={(entityId) =>
                    setArfsEntityId(new EntityID(entityId.toString()))
                  }
                  entityTypeCallback={(type?: ENTITY_TYPES) =>
                    setEntityType(type)
                  }
                  defaultAddress={
                    address ? getDefaultAddress(address) : undefined
                  }
                  defaultEntityId={defaultEntityId}
                />
              ) : view === 'files' ? (
                <Files drive={drive} />
              ) : (
                <></>
              )
            ) : (
              <div
                className="flex-column center"
                style={{ marginTop: '110px' }}
              >
                <CircleProgressBar size={80} color="white" />
              </div>
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
