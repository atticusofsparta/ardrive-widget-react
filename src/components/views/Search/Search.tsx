import {
  ArFSPublicFile,
  ArFSPublicFolder,
  ArweaveAddress,
  EntityID,
  PrivateKeyData,
} from '@atticusofsparta/arfs-lite-client';
import {
  ArFSDriveEntity,
} from '@atticusofsparta/arfs-lite-client/types/arfs/drive';
import { useEffect, useState } from 'react';

import useArweaveCompositeDataProvider from '../../../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';
import { ENTITY_TYPES, SEARCH_TYPES } from '../../../types';
import SearchBar from '../../inputs/SearchBar/SearchBar';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import { ChevronDownIcon, DatabaseIcon, FilesIcon, FolderIcon } from '../../icons';

function Search({
  addressCallback,
  entityIdCallback,
  entityTypeCallback,
  defaultAddress,
  defaultEntityId,
}: {
  addressCallback: (address:string) => string;
  entityIdCallback: (entityId:string) => string;
  entityTypeCallback: (entitType:ENTITY_TYPES) => ENTITY_TYPES;
  defaultAddress?: string;
  defaultEntityId?: string;
}) {
  const [searchType, setSearchType] = useState<SEARCH_TYPES>();
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    ArFSDriveEntity[] | ArFSPublicFolder[] | ArFSPublicFile[] | undefined
  >();
  const [arfsEntityType, setArfsEntityType] = useState<ENTITY_TYPES>();

  const arweaveDataProvider = useArweaveCompositeDataProvider({});

  useEffect(() => {
    if (defaultAddress) {
      setIsSearching(true);
      search(defaultAddress);
      return
    }
    if (defaultEntityId) {
      setIsSearching(true);
      search(defaultEntityId);
      return
    }
    if (searchQuery) {
      setIsSearching(true);
      search(searchQuery);
      return
    }
  reset()
  }, [searchQuery]);

  function reset () {
    setSearchType(undefined);
    setSearchQuery(undefined);
    setSearchResults(undefined);
  }

  async function search(query: string) {

    if (!query) {
      return
    }
    try {

      setIsSearching(true);
      if (!arweaveDataProvider) {
        throw new Error('Arweave Data Provider is undefined');
      }
      console.log({searchType})
      switch (searchType) {
       
        case SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS: {
          const drives =
            await arweaveDataProvider?._ArFSClient.getAllDrivesForAddress({
              address: query,
              privateKeyData: new PrivateKeyData({}),
              latestRevisionsOnly: false,
            });
          setSearchResults([...drives]);
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
          console.log({entitType, owner, query, searchType})

          if (entitType === ENTITY_TYPES.DRIVE && owner) {
            const drive = await arweaveDataProvider?._ArFSClient.getPublicDrive({
                driveId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
           setSearchResults(drive !== undefined ? [{...drive}] : undefined);
           setArfsEntityType(entitType);
            
          }

          if (entitType === ENTITY_TYPES.FOLDER && owner) {
            const folder =
              await arweaveDataProvider?._ArFSClient.getPublicFolder({
                folderId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
              setSearchResults(folder !== undefined ? [{...folder}] : undefined);
              setArfsEntityType(entitType);
          }

          if (entitType === ENTITY_TYPES.FILE && owner) {
            const file = await arweaveDataProvider._ArFSClient.getPublicFile({
                fileId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
              setSearchResults(file !== undefined ? [{...file}] : undefined);
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

  function getIcon (entitType:ENTITY_TYPES) {
    switch (entitType) {
      case ENTITY_TYPES.DRIVE:
        return <DatabaseIcon width={30} height={30} />
      case ENTITY_TYPES.FOLDER:
        return <FolderIcon width={30} height={30}  />
      case ENTITY_TYPES.FILE:
        return <FilesIcon width={30} height={30}  />
      default: <></>
    }
  }


  return (
    <div
      className="flex-column space-between"
      style={{ height: '100%', width: '100%', position:"relative" }}
    >
      <div className="flex-column gap" style={{ height: '100%' }}>
        <SearchBar
          isSearching={isSearching}
          searchType={searchType}
          setSearchType={setSearchType}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div
          className="white textLarge flex-column flex-center gap scroll-container"
          style={{ height: '275px', margin: '10px 0px', width: '100%', boxSizing:"border-box", borderRadius:"5px"}}
        >
          {!isSearching ? searchResults ? searchResults.map((result)=> 
          <div className='flex-row textLarge white space-between gap radius hover' style={{
            width:"100%", 
            minHeight:'50px',
            boxShadow: 'var(--shadow)',
            alignItems: 'center',
            padding: '0 10px',
            boxSizing:"border-box",
            cursor: 'pointer',
            border: '1px solid var(--text-subtle)',
            fill: 'var(--foreground-muted)',
            }}>
            {getIcon(arfsEntityType ?? ENTITY_TYPES.FILE)}
            {result.name}
            <ChevronDownIcon width={15} height={15} style={{transform:"rotate(-90deg)"}}/>
          </div> 
          
          ) : <span className="faded flex-column center" style={{height:"100%"}} >No Results</span> : (
           
            <span className="faded flex-column center" style={{height:"100%"}} > 
            <CircleProgressBar size={80} color="white" />
            </span>
          )}
        </div>
      </div>
      <button className="link white flex-row center" style={{position:"absolute", bottom:"-10px", left:0, width:"100%"}}>What is ArDrive?</button>
    </div>
  );
}

export default Search;
