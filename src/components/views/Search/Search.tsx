import {
  ArFSDriveEntity,
  ArFSPublicFile,
  ArFSPublicFolder,
  ArweaveAddress,
  EntityID,
  PrivateKeyData,
} from '@atticusofsparta/arfs-lite-client';
import { useEffect, useState } from 'react';

import useArweaveCompositeDataProvider from '../../../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';
import { ENTITY_TYPES, SEARCH_TYPES } from '../../../types';
import { checkSearchType } from '../../../utils/searchUtils';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';
import {
  ChevronDownIcon,
  DatabaseIcon,
  FilesIcon,
  FolderIcon,
} from '../../icons';
import SearchBar from '../../inputs/SearchBar/SearchBar';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';

export type WithOwner = { owner: string };
export type ArFSPublicDriveWithOwner = ArFSDriveEntity & WithOwner;
export type ArFSPublicFolderWithOwner = ArFSPublicFolder & WithOwner;
export type ArFSPublicFileWithOwner = ArFSPublicFile & WithOwner;

function Search({
  addressCallback,
  entityIdCallback,
  entityTypeCallback,
  defaultAddress,
  defaultEntityId,
}: {
  addressCallback: (address: string) => void;
  entityIdCallback: (entityId: string) => void;
  entityTypeCallback: (entitType?: ENTITY_TYPES) => void;
  defaultAddress?: string;
  defaultEntityId?: string;
}) {
  const [searchType, setSearchType] = useState<SEARCH_TYPES | undefined>(() =>
    defaultAddress
      ? SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS
      : defaultEntityId
      ? SEARCH_TYPES.ARFS_ID
      : undefined,
  );
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    | ArFSPublicDriveWithOwner[]
    | ArFSPublicFolderWithOwner[]
    | ArFSPublicFileWithOwner[]
    | undefined
  >();
  const [arfsEntityType, setArfsEntityType] = useState<ENTITY_TYPES>();

  const arweaveDataProvider = useArweaveCompositeDataProvider();

  function reset() {
    setSearchType(undefined);
    setSearchQuery(undefined);
    setSearchResults(undefined);
    setArfsEntityType(undefined);
    addressCallback(defaultAddress ?? '');
    entityIdCallback(defaultEntityId ?? '');
    entityTypeCallback(undefined);
  }

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      search(searchQuery);
      return;
    }

    if (defaultAddress) {
      setIsSearching(true);
      search(defaultAddress, SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS);
      return;
    }
    if (defaultEntityId) {
      setIsSearching(true);
      search(defaultEntityId, SEARCH_TYPES.ARFS_ID);
      return;
    }

    //reset()
  }, [searchQuery]);

  async function search(query: string, type?: SEARCH_TYPES) {
    if (!query.length) {
      return;
    }
    try {
      setIsSearching(true);
      if (!arweaveDataProvider) {
        throw new Error('Arweave Data Provider is undefined');
      }
      const queryType = type ?? checkSearchType(query);
      switch (queryType) {
        case SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS: {
          const drives =
            await arweaveDataProvider?._ArFSClient.getAllDrivesForAddress({
              address: query,
              privateKeyData: new PrivateKeyData({}),
              latestRevisionsOnly: false,
            });
          const drivesWithOwner: ArFSPublicDriveWithOwner[] = drives.map(
            (drive) => {
              return { ...drive, owner: query } as ArFSPublicDriveWithOwner;
            },
          );
          if (!drivesWithOwner[0].owner.toString().length) {
            throw new Error('No owner found');
          }
          // TODO: add private drive capabilities
          setSearchResults([
            ...drivesWithOwner.filter(
              (drive) => drive.drivePrivacy === 'public',
            ),
          ]);
          setArfsEntityType(ENTITY_TYPES.DRIVE);
          break;
        }
        case SEARCH_TYPES.ARFS_ID: {
          const entityResults = await arweaveDataProvider?.getEntityType(
            new EntityID(query),
          );
          const entitType = entityResults?.type;
          const owner = entityResults?.owner;
          setArfsEntityType(entitType);

          if (entitType === ENTITY_TYPES.DRIVE && owner) {
            const drive = await arweaveDataProvider?._ArFSClient.getPublicDrive(
              {
                driveId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              },
            );
            setSearchResults(
              drive !== undefined ? [{ ...drive, owner }] : undefined,
            );
            setArfsEntityType(entitType);
          }

          if (entitType === ENTITY_TYPES.FOLDER && owner) {
            const folder =
              await arweaveDataProvider?._ArFSClient.getPublicFolder({
                folderId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
            setSearchResults(
              folder !== undefined ? [{ ...folder, owner }] : undefined,
            );
            setArfsEntityType(entitType);
          }

          if (entitType === ENTITY_TYPES.FILE && owner) {
            const file = await arweaveDataProvider._ArFSClient.getPublicFile({
              fileId: new EntityID(query),
              owner: new ArweaveAddress(owner),
            });
            setSearchResults(
              file !== undefined ? [{ ...file, owner }] : undefined,
            );
            setArfsEntityType(entitType);
          }
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setSearchResults(undefined);
    } finally {
      setIsSearching(false);
      setSearchType(undefined);
    }
  }

  function getIcon(entitType: ENTITY_TYPES) {
    switch (entitType) {
      case ENTITY_TYPES.DRIVE:
        return <DatabaseIcon width={30} height={30} />;
      case ENTITY_TYPES.FOLDER:
        return <FolderIcon width={30} height={30} />;
      case ENTITY_TYPES.FILE:
        return <FilesIcon width={30} height={30} />;
      default:
        <></>;
    }
  }

  function handleCallback(result: any) {
    try {
      if (Object.keys(result).includes('folderId')) {
        entityTypeCallback(ENTITY_TYPES.FOLDER);
        entityIdCallback(result.folderId.entityId.toString());
        addressCallback(result.owner);
      }
      if (Object.keys(result).includes('fileId')) {
        entityTypeCallback(ENTITY_TYPES.FILE);
        entityIdCallback(result.fileId.entityId.toString());
        addressCallback(result.owner);
      }
      if (Object.keys(result).includes('driveId')) {
        entityTypeCallback(ENTITY_TYPES.DRIVE);
        entityIdCallback(result.driveId.entityId.toString());
        addressCallback(result.owner);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (isSearching) {
    return (
      <div
        className="flex-column center"
        style={{ width: '100%', height: '100%', marginTop: 110 }}
      >
        <CircleProgressBar size={80} color="white" />
      </div>
    );
  }

  return (
    <>
      <div
        className="flex-column space-between fade-in"
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        <div className="flex-column gap" style={{ height: '100%' }}>
          {!searchResults ? (
            <SearchBar
              isSearching={isSearching}
              searchType={searchType}
              setSearchType={setSearchType}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          ) : (
            <div className="flex-column" style={{ gap: '10px' }}>
              <SearchBar
                isSearching={isSearching}
                searchType={searchType}
                setSearchType={setSearchType}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
              <div
                className="flex-row"
                style={{
                  padding: '5px',
                  gap: '20px',
                  boxShadow: '0px 0px 15px 0px rgb(0,0,0)',
                  borderRadius: '4px',
                  border: ' 1px solid var(--input-text)',
                }}
              >
                <span className="text white flex-column" style={{ flex: 2 }}>
                  Owner
                  <span
                    className="textSmall"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {searchResults[0].owner.toString().slice(0, 10) +
                      '...' +
                      searchResults[0].owner.toString().slice(-10)}
                  </span>
                </span>
                <span className="text white flex-column" style={{ flex: 1 }}>
                  Type
                  <span
                    className="textSmall"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    {arfsEntityType && searchResults.length <= 1
                      ? arfsEntityType.toString().slice(0, 1).toUpperCase() +
                        arfsEntityType?.toString().slice(1)
                      : 'Address'}
                  </span>
                </span>
                <button
                  className="button-primary white"
                  style={{
                    margin: 'auto',
                    height: '30px',
                    padding: '10px 15px',
                    width: '50px',
                  }}
                  onClick={() => reset()}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
          <div
            className="white textLarge flex-column flex-center gap scroll-container"
            style={{
              height: '275px',
              margin: '10px 0px',
              width: '100%',
              boxSizing: 'border-box',
              borderRadius: '5px',
            }}
          >
            {!isSearching ? (
              searchResults ? (
                searchResults.length <= 4 ? (
                  <>
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        className="flex-row textLarge white space-between gap radius hover"
                        style={{
                          width: '100%',
                          minHeight: '50px',
                          boxShadow: 'var(--shadow)',
                          background: 'var(--background)',
                          alignItems: 'center',
                          padding: '0 10px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                          border: '1px solid var(--text-subtle)',
                          fill: 'var(--foreground-muted)',
                        }}
                        onClick={() => handleCallback(result)}
                      >
                        {getIcon(arfsEntityType ?? ENTITY_TYPES.FILE)}
                        {result.name}
                        <ChevronDownIcon
                          width={15}
                          height={15}
                          style={{ transform: 'rotate(-90deg)' }}
                        />
                      </button>
                    ))}
                  </>
                ) : (
                  <ScrollContainer
                    contentStyle={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: '30px',
                      gap: '10px',
                    }}
                    scrollBarContainerStyle={{
                      right: '0px',
                      top: '120px',
                    }}
                    scrollBarContainerHeight={220}
                  >
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        className="flex-row textLarge white space-between gap radius hover"
                        style={{
                          width: '100%',
                          minHeight: '50px',
                          boxShadow: 'var(--shadow)',
                          background: 'var(--background)',
                          alignItems: 'center',
                          padding: '0 10px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                          border: '1px solid var(--text-subtle)',
                          fill: 'var(--foreground-muted)',
                        }}
                        onClick={() => handleCallback(result)}
                      >
                        {getIcon(arfsEntityType ?? ENTITY_TYPES.FILE)}
                        {result.name}
                        <ChevronDownIcon
                          width={15}
                          height={15}
                          style={{ transform: 'rotate(-90deg)' }}
                        />
                      </button>
                    ))}
                  </ScrollContainer>
                )
              ) : (
                <span
                  className="faded flex-column center"
                  style={{ height: '100%', gap: '30px' }}
                >
                  No Results
                </span>
              )
            ) : (
              <span
                className="faded flex-column center"
                style={{ height: '100%' }}
              >
                <CircleProgressBar size={80} color="white" />
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        className="link white flex-row center"
        style={{ position: 'relative', width: '100%', marginTop: '5px' }}
      >
        What is ArDrive?
      </button>
    </>
  );
}

export default Search;
