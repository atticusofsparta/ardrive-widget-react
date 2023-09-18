import { useState } from 'react';

import { SEARCH_TYPES } from '../../../types';
import { checkSearchType } from '../../../utils/searchUtils';
import { SearchIcon } from '../../icons';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import './styles.css';

function SearchBar({
  isSearching,
  setSearchType,
  setSearchQuery,
}: {
  searchType?: SEARCH_TYPES;
  setSearchType: (searchType?: SEARCH_TYPES) => void;
  isSearching: boolean;
  setSearchQuery: (searchQuery: string | undefined) => void;
  searchQuery?: string;
}) {
  const [searchBarText, setSearchBarText] = useState('');
  const [isSearchValid, setIsSearchValid] = useState<boolean | null>(null);

  function reset() {
    setSearchBarText('');
    setIsSearchValid(null);
    setSearchType(undefined);
    setSearchQuery('');
  }

  async function handleChange(e: any) {
    e.preventDefault();

    const search = e.target.value;
    if (search === '' || !search.length) {
      reset();
      return;
    }
    const type = checkSearchType(search.trim());
    setSearchType(type);
    setSearchBarText(search);
    if (!type) {
      setIsSearchValid(false);
      return;
    }

    onSubmit(search.trim());
    setIsSearchValid(true);
  }

  async function onSubmit(query: string) {
    if (query === '') {
      reset();
      return;
    }
    setSearchQuery(query);
    setIsSearchValid(true);
  }

  return (
    <div
      className="searchBarContainer"
      style={
        isSearchValid && searchBarText
          ? {
              border: '2px green solid',
            }
          : isSearchValid === false && searchBarText
          ? {
              border: '2px red solid',
            }
          : {}
      }
    >
      <input
        type="text"
        placeholder={`Enter an ArFS Entity ID or Arweave Address`}
        value={searchBarText}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => (e.key === 'Enter' ? onSubmit(searchBarText) : null)}
        maxLength={43}
      />
      {isSearching ? (
        <button className="hollowButton" style={{ border: 'none' }}>
          <CircleProgressBar size={15} />
        </button>
      ) : (
        <button
          className="hollowButton"
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={() => onSubmit(searchBarText)}
        >
          <SearchIcon width="15px" height="15px" fill="black" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
