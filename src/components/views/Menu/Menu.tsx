import { Dispatch, SetStateAction } from 'react';

import {
  BookIcon,
  DatabaseImportIcon,
  EyesOffIcon,
  FilesIcon,
} from '../../icons';
import './styles.css';

function Menu({
  hideWidget,
  setHideWidget,
  setShowMenu,
  view,
  setView,
  fullScreen,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  view: string;
  setView: Dispatch<SetStateAction<'search' | 'files' | 'drive'>>;
  hideWidget: boolean;
  setHideWidget: Dispatch<SetStateAction<boolean>>;
  fullScreen: boolean;
}) {
  return (
    <div
      className="menu flex-column gap1"
      style={{
        height: fullScreen ? window.innerHeight * 0.75 : 'auto',
      }}
    >
      <button
        className="menuItem"
        onClick={() => {
          if (view !== 'search') {
            setView('search');
          }
          setShowMenu(false);
        }}
      >
        <div className="flex-row gap1 left">
          <DatabaseImportIcon width={'40px'} height={'40px'} />
          <div className="flex-column gap left">
            <span className="textMedium">Import</span>
            <span className="textSmall faded">
              Load a file, folder, or drive from an ID.
            </span>
          </div>
        </div>
      </button>

      <button
        className="menuItem"
        onClick={() => {
          if (view !== 'files') {
            setView('files');
          }
          setShowMenu(false);
        }}
      >
        <div className="flex-row gap1 left">
          <FilesIcon width={'40px'} height={'40px'} />
          <div className="flex-column gap left">
            <span className="textMedium">Files</span>
            <span className="textSmall faded">Browse thru files.</span>
          </div>
        </div>
      </button>

      <button className="menuItem" onClick={() => setHideWidget(!hideWidget)}>
        <div className="flex-row gap1 left">
          <EyesOffIcon width={'40px'} height={'40px'} />
          <div className="flex-column gap left">
            <span className="textMedium">Hide</span>
            <span className="textSmall faded">
              Hide the ArDrive Explorer Widget.
            </span>
          </div>
        </div>
      </button>
      <button className="menuItem">
        <div className="flex-row gap1 left">
          <BookIcon width={'40px'} height={'40px'} />
          <div className="flex-column gap left">
            <span className="textMedium">About</span>
            <span className="textSmall faded">Learn more about ArDrive.</span>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Menu;
