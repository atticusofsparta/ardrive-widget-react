import { useEffect, useState } from 'react';


import { SearchIcon } from '../../icons';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import './styles.css';
import { checkSearchType } from '../../../utils/searchUtils';
import useArweaveCompositeDataProvider from '../../../hooks/useArweaveCompositeDataProvider/useArweaveCompositeDataProvider';
import { PrivateKeyData } from '@atticusofsparta/arfs-lite-client';



function SearchBar({
isSearching,
searchType,
setSearchType,
setSearchQuery,
searchQuery
}:{
  searchType?: 'drive' | 'folder' | 'file';
  setSearchType: (searchType?: 'drive' | 'folder' | 'file') => void;
  isSearching: boolean;
  setSearchQuery: (searchQuery:string) => void;
  searchQuery?: string
}) {
  const [searchBarText, setSearchBarText] = useState('');
  const [isSearchValid, setIsSearchValid] = useState<boolean | null>(null);

  const arweaveDataProvider = useArweaveCompositeDataProvider({})


  useEffect(()=>{
    if (searchQuery){
      setSearchBarText(searchQuery)
    }
  },[searchQuery])

  function reset() {
    setSearchBarText('');
    setIsSearchValid(null);
    setSearchType(undefined)
  }

async  function handleChange(e: any) {
    e.preventDefault();

    const search = e.target.value;
    if (search === '') {
      reset();
      return;
    }
    setSearchBarText(search);
    // partially reset
    setIsSearchValid(null);
  }
  async function onSubmit(e: any) {
    e.preventDefault();

    if (searchBarText === '') {
      reset();
      return;
    }
  
    // const searchIdType = checkSearchType(searchBarText);
    // if (!searchIdType) {
    //   throw Error(`Invalid search query: ${searchBarText}`);
    // }
 
    console.log("querying for drives")
    const drives = await arweaveDataProvider?._ArFSClient.getAllDrivesForAddress({address: searchBarText, privateKeyData: new PrivateKeyData({})}).catch((err:any)=>{
      console.error(err)
    })
    console.log(drives)
    if (!drives || drives.length === 0){
      throw Error(`No drives found for address: ${searchBarText}`)
    }
  
   
    try {
      setSearchQuery(searchBarText)
      setIsSearchValid(true);
    } catch (error) {
      console.log(error);
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
        placeholder={`Enter${searchType ? ` ${searchType} ` : ' '}ID ${
          false ? 'or file name' : ''
        }`}
        value={searchBarText}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => (e.key === 'Enter' ? onSubmit(e) : null)}
        maxLength={43}
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
