import {useState, useEffect} from 'react'
import SearchBar from '../../inputs/SearchBar/SearchBar';
import { DriveStructure } from '../../../types';

function Search({

}:{

}) {

  const [searchType, setSearchType] = useState<'drive' | 'folder' | 'file'>()
  const [searchQuery, setSearchQuery] = useState<string>()
  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(()=>{
    console.log(searchType, searchQuery, isSearching)
  },[searchType, searchQuery, isSearching])









  return (
    <div className="flex-column space-between" style={{ height: '100%' }}>
      <div className="flex-column gap">
        <div className="flex-row gap center">
          <button className="button-primary buttonMedium white textMedium">
            Drive Import
          </button>
          <button className="button-primary buttonMedium white textMedium">
            Folder Import
          </button>
          <button className="button-primary buttonMedium white textMedium">
            File Import
          </button>
        </div>
        <SearchBar
        isSearching={isSearching}
        searchType={searchType}
        setSearchType={setSearchType}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        />
        <button className="hollowButton buttonLarge white textLarge">
          View Drive
        </button>
        <div className="flex-row gap">
          <button className="hollowButton buttonMedium white textLarge">
            View File
          </button>
          <button className="hollowButton buttonMedium white textLarge">
            View Folder
          </button>
        </div>
      </div>
      <button className="link white">What is Ardrive?</button>
    </div>
  );
}

export default Search;
