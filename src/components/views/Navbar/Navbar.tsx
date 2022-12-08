import { SetStateAction } from 'react';
import { Dispatch } from 'react';

import { ChevronDownIcon, CloseIcon, MenuIcon } from '../../icons';
import ArdriveLogo from '../../icons/ArDrive-Logo.png';

function Navbar({
  hideWidget,
  setHideWidget,
  showMenu,
  setShowMenu,
}: {
  hideWidget: boolean;
  setHideWidget: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex-row space-between" style={{ alignItems: 'center' }}>
      <img src={ArdriveLogo} alt="logo" height={41} width={195} />
      {hideWidget === true ? (
        <button
          className="hollowButton"
          onClick={() => setHideWidget(false)}
          style={{
            border: 'solid 4px white',
            borderRadius: '12px',
            height: '40px',
            width: '40px',
          }}
        >
          <ChevronDownIcon width="30px" height="30px" fill="white" />
        </button>
      ) : (
        <button
          className="hollowButton"
          style={{ border: 'none', height: '40px', width: '40px' }}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? (
            <CloseIcon width="40px" height="40px" fill="white" />
          ) : (
            <MenuIcon width="40px" height="40px" fill="white" />
          )}
        </button>
      )}
    </div>
  );
}

export default Navbar;
