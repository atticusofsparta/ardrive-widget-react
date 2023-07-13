import { EntityID } from '@atticusofsparta/arfs-lite-client';
import { useEffect, useState } from 'react';

import { SEARCH_TYPES } from '../../../types';
import { checkSearchType } from '../../../utils/searchUtils';
import { SearchIcon } from '../../icons';
import CircleProgressBar from '../../progress/CircleProgressBar/CircleProgressBar';
import './styles.css';

function SearchBar({
  isSearching,
  setSearchType,
  setSearchQuery,
  searchQuery,
}: {
  searchType?: SEARCH_TYPES;
  setSearchType: (searchType?: SEARCH_TYPES) => void;
  isSearching: boolean;
  setSearchQuery: (searchQuery: string | undefined) => void;
  searchQuery?: string;
}) {
  const [searchBarText, setSearchBarText] = useState('');
  const [isSearchValid, setIsSearchValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (searchQuery?.length) {
      setSearchBarText(searchQuery);
    }
  }, [searchQuery]);

  function reset() {
    setSearchBarText('');
    setIsSearchValid(null);
    setSearchType(undefined);
    setSearchQuery(undefined);
  }

  async function handleChange(e: any) {
    e.preventDefault();
    setSearchType(undefined);

    const search = e.target.value;
    if (search === '') {
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
    setIsSearchValid(true);
  }

  async function onSubmit(e: any) {
    e.preventDefault();
    if (searchBarText === '') {
      reset();
      return;
    }
    setSearchQuery(searchBarText);
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
          style={{ border: 'none', cursor: 'pointer' }}
          onClick={(e) => onSubmit(e)}
        >
          <SearchIcon width="15px" height="15px" fill="black" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
