import { LoaderIcon, SearchIcon } from '../../icons';
import './styles.css';

function SearchBar({
  searchType,
  isSearching,
}: {
  searchType: string;
  isSearching: boolean;
}) {
  return (
    <div className="searchBarContainer">
      <input type="text" placeholder={`Enter ${searchType} ID`} />
      {isSearching ? (
        <button className="hollowButton" style={{ border: 'none' }}>
          <LoaderIcon width="30px" height="30px" fill="red" />
        </button>
      ) : (
        <button className="hollowButton" style={{ border: 'none' }}>
          <SearchIcon width="30px" hieght="30px" fill="black" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
