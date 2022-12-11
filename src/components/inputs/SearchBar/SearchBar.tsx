import { useState } from 'react';

import { ArFSClient } from '../../../services/arweave';
import { useGlobalState } from '../../../state/contexts/GlobalState';
import { ARFS_ID_REGEX, ARNS_TXID_REGEX } from '../../../utils/constants';
import { SearchIcon } from '../../icons';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import './styles.css';

function SearchBar() {
  const [{ isSearching, searchType, searchQuery, drive }, dispatchGlobalState] =
    useGlobalState();
  const [searchBarText, setSearchBarText] = useState('');
  const [isSearchValid, setIsSearchValid] = useState<boolean | null>(null);
  const arfsClient = new ArFSClient();

  function reset() {
    setSearchBarText('');
    setIsSearchValid(null);
    dispatchGlobalState({
      type: 'setIsSearching',
      payload: false,
    });
    dispatchGlobalState({
      type: 'setSearchType',
      payload: undefined,
    });
  }

  function handleChange(e: any) {
    e.preventDefault();

    const search = e.target.value;
    if (search === '') {
      reset();
      return;
    }
    setSearchBarText(search);
    // partially reset
    setIsSearchValid(null);
    dispatchGlobalState({
      type: 'setIsSearching',
      payload: false,
    });
  }
  async function onSubmit(e: any) {
    e.preventDefault();

    if (searchBarText === '') {
      reset();
      return;
    }
    const searchIdType = checkSearchType(searchBarText);
    console.log(searchIdType);
    try {
      switch (searchIdType) {
        case 'arfsId':
          setIsSearchValid(true);
          dispatchGlobalState({
            type: 'setIsSearching',
            payload: true,
          });
          dispatchGlobalState({
            type: 'setSearchQuery',
            payload: searchBarText,
          });
          if (searchType == undefined) {
            // if search type not set by the user, find the entity type
            const newSearchType = await getEntityType(searchBarText);
            console.log(newSearchType);
            if (
              newSearchType === 'drive' ||
              newSearchType === 'folder' ||
              newSearchType === 'file'
            ) {
              dispatchGlobalState({
                type: 'setSearchType',
                payload: newSearchType,
              });
            }
          }

          dispatchGlobalState({
            type: 'setIsSearching',
            payload: false,
          });
          break;
        case 'arweaveWalletAddress':
          setIsSearchValid(true);
          dispatchGlobalState({
            type: 'setIsSearching',
            payload: true,
          });
          break;
        case 'fileName':
          setIsSearchValid(true);
          dispatchGlobalState({
            type: 'setIsSearching',
            payload: true,
          });
          break;
        default:
          throw Error('not a valid search type');
      }
    } catch (error) {
      reset();
      console.log(error);
    }
  }
  function checkSearchType(props: string) {
    if (ARFS_ID_REGEX.test(props)) {
      return 'arfsId';
    }
    if (ARNS_TXID_REGEX.test(props)) {
      return 'arweaveWalletAddress';
    }
    return 'fileName';
  }
  async function getEntityType(props: string) {
    try {
      if (ARFS_ID_REGEX.test(props) === false) {
        throw Error('must be an arfs id');
      }
      const manifest = await arfsClient.getUnknownEntityTransactions(props);
      const entityType = manifest[0].node.tags['Entity-Type'];
      dispatchGlobalState({
        type: 'setDriveOwner',
        payload: manifest[0].node.owner.address,
      });
      return entityType;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  return (
    <div
      className="searchBarContainer"
      style={
        isSearchValid
          ? {
              border: '2px green solid',
            }
          : isSearchValid === false
          ? {
              border: '2px red solid',
            }
          : {}
      }
    >
      <input
        type="text"
        placeholder={`Enter${searchType ? searchType : ' '}ID ${
          drive ? 'or file name' : ''
        }`}
        value={searchBarText}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => (e.key === 'Enter' ? onSubmit(e) : null)}
      />
      {isSearching ? (
        <button className="hollowButton" style={{ border: 'none' }}>
          <CircleProgressBar size={15} />
        </button>
      ) : (
        <button
          className="hollowButton"
          style={{ border: 'none' }}
          onClick={(e) => onSubmit(e)}
        >
          <SearchIcon width="15px" height="15px" fill="black" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
