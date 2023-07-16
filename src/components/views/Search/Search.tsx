import {
  ArFSPublicFile,
  ArFSPublicFolder,
  ArweaveAddress,
  EntityID,
  PrivateKeyData,
  ArFSPublicDrive,
  ArFSDriveEntity
} from '@atticusofsparta/arfs-lite-client';
import { useEffect, useState } from 'react';

import useArweaveCompositeDataProvider from '../../../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';
import { ENTITY_TYPES, SEARCH_TYPES } from '../../../types';
import SearchBar from '../../inputs/SearchBar/SearchBar';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import { ChevronDownIcon, DatabaseIcon, FilesIcon, FolderIcon } from '../../icons';
import { add, get } from 'lodash';
import { checkSearchType } from '../../../utils/searchUtils';
import ScrollContainer from '../../ScrollContainer/ScrollContainer';

export type WithOwner = { owner:string }
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
  addressCallback: (address:string) => void;
  entityIdCallback: (entityId:string) => void;
  entityTypeCallback: (entitType:ENTITY_TYPES | undefined) => void;
  defaultAddress?: string;
  defaultEntityId?: string;
}) {
  const [searchType, setSearchType] = useState<SEARCH_TYPES | undefined>(()=> defaultAddress ? SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS : defaultEntityId ? SEARCH_TYPES.ARFS_ID : undefined);
  const [searchQuery, setSearchQuery] = useState<string | undefined>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<ArFSPublicDriveWithOwner[] | ArFSPublicFolderWithOwner[] | ArFSPublicFileWithOwner[] | undefined>();
  const [arfsEntityType, setArfsEntityType] = useState<ENTITY_TYPES>();


  const arweaveDataProvider = useArweaveCompositeDataProvider();

  function reset () {
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
      return
    }

    if (defaultAddress) {
      setIsSearching(true);
      search(defaultAddress, SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS);
      return
    }
    if (defaultEntityId) {
      setIsSearching(true);
      search(defaultEntityId, SEARCH_TYPES.ARFS_ID);
      return
    }

  //reset()
  }, [searchQuery]);

  async function search(query: string, type?: SEARCH_TYPES) {

    if (!query) {
      return
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
          const drivesWithOwner: ArFSPublicDriveWithOwner[] = drives.map((drive) => {
            return { ...drive, owner: query } as ArFSPublicDriveWithOwner;
          });
          setSearchResults([...drivesWithOwner]);
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
            const drive = await arweaveDataProvider?._ArFSClient.getPublicDrive({
                driveId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
           setSearchResults(drive !== undefined ? [{...drive, owner}] : undefined);
           setArfsEntityType(entitType);
            
          }

          if (entitType === ENTITY_TYPES.FOLDER && owner) {
            const folder =
              await arweaveDataProvider?._ArFSClient.getPublicFolder({
                folderId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
              setSearchResults(folder !== undefined ? [{...folder, owner}] : undefined);
              setArfsEntityType(entitType);
          }

          if (entitType === ENTITY_TYPES.FILE && owner) {
            const file = await arweaveDataProvider._ArFSClient.getPublicFile({
                fileId: new EntityID(query),
                owner: new ArweaveAddress(owner),
              });
              setSearchResults(file !== undefined ? [{...file, owner}] : undefined);
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

  function handleCallback (result:any) {
    try {
      console.log(result)
   
        if (Object.keys(result).includes('folderId')) {
          entityTypeCallback(ENTITY_TYPES.FOLDER);
          entityIdCallback(result.folderId.entityId.toString());
          
          addressCallback(result.owner);
          return
        }
        if (Object.keys(result).includes('fileId')) {
          entityTypeCallback(ENTITY_TYPES.FILE);
          entityIdCallback(result.fileId.entityId.toString());
          
          addressCallback(result.owner);
          return
        }
        if (Object.keys(result).includes('driveId')) {
          entityTypeCallback(ENTITY_TYPES.DRIVE);
          entityIdCallback(result.driveId.entityId.toString());
          
          addressCallback(result.owner);
          return
        }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
    <div
      className="flex-column space-between"
      style={{ height: '100%', width: '100%', position:"relative" }}
    >
      <div className="flex-column gap" style={{ height: '100%' }}>
{!searchResults ?
        <SearchBar
          isSearching={isSearching}
          searchType={searchType}
          setSearchType={setSearchType}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        /> :
        <div>
          <div className='flex-row space-between'>
          <span className='text white'>
            Owner: {searchResults[0].owner.toString().slice(0, 10) + "..." + searchResults[0].owner.toString().slice(-10)}
            <br />
            Import Type: { arfsEntityType && !defaultAddress ? arfsEntityType.toString().slice(0,1).toUpperCase() + arfsEntityType?.toString().slice(1) : 'Address'}
            </span>
          <button 
          className="button-primary white" 
          style={{ width:"fit-content", height:"fit-content", padding:"10px 15px"}} onClick={()=> reset()}>
            Back to Search
            </button>
          </div>
        </div>
        }
        <div
          className="white textLarge flex-column flex-center gap scroll-container"
          style={{ height: '275px', margin: '10px 0px', width: '100%', boxSizing:"border-box", borderRadius:"5px"}}
        >
          
          {!isSearching ? searchResults ? 
          <ScrollContainer
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            paddingRight: '30px',
            gap: '10px',
          }}
          scrollBarContainerStyle={{
          right: '0px',
          }}
          scrollBarContainerHeight={250}
          >
          {searchResults.map((result)=> 
          <button className='flex-row textLarge white space-between gap radius hover' style={{
            width:"100%", 
            minHeight:'50px',
            boxShadow: 'var(--shadow)',
            background: 'var(--background)',
            alignItems: 'center',
            padding: '0 10px',
            boxSizing:"border-box",
            cursor: 'pointer',
            border: '1px solid var(--text-subtle)',
            fill: 'var(--foreground-muted)',
            }}
            onClick={()=> handleCallback(result)}
            >
            {getIcon(arfsEntityType ?? ENTITY_TYPES.FILE)}
            {result.name}
            <ChevronDownIcon width={15} height={15} style={{transform:"rotate(-90deg)"}}/>
          </button> )}
          </ScrollContainer>
          
           : <span className="faded flex-column center" style={{height:"100%", gap:"30px"}} >
            No Results
            { defaultAddress || defaultEntityId ?
            <button className='button-primary white' style={{padding:"10px 15px", fontSize:"18px"}} onClick={()=> {
              if (defaultAddress) {
                search(defaultAddress, SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS)
              }
              if (defaultEntityId) {
                search(defaultEntityId, SEARCH_TYPES.ARFS_ID)
              }
              }}>
              Reset to defaults
            </button>
            : <></>}
            </span> : (
           
            <span className="faded flex-column center" style={{height:"100%"}} > 
            <CircleProgressBar size={80} color="white" />
            </span>
          )}
        </div>
      </div>
     
    </div>
     <button className="link white flex-row center" style={{position:"relative", width:"100%", marginTop: "5px"}}>What is ArDrive?</button>
     </>
  );
}

export default Search;
