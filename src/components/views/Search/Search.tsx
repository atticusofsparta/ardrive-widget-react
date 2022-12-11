import SearchBar from '../../inputs/SearchBar/SearchBar';

function Search() {
  return (
    <div className="flex-column space-between" style={{ height: '100%' }}>
      <div className="flex-column gap">
        <div className="flex-row gap center">
          <button className="accentButton buttonMedium white textMedium">
            Drive Import
          </button>
          <button className="accentButton buttonMedium white textMedium">
            Folder Import
          </button>
          <button className="accentButton buttonMedium white textMedium">
            File Import
          </button>
        </div>
        <SearchBar />
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
