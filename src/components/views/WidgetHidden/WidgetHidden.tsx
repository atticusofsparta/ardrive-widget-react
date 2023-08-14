import { Dispatch, SetStateAction } from 'react';

import { ArDriveStackIcon } from '../../icons';
import Navbar from '../Navbar/Navbar';

function WidgetHidden({
  mode,
  hideWidget,
  setHideWidget,
  showMenu,
  setShowMenu,
}: {
  mode: 'icon' | 'dropdown' | 'invisible';
  hideWidget: boolean;
  setHideWidget: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      {mode === 'icon' ? (
        <button
          className="button white center"
          style={{ border: 'none'}}
          onClick={() => setHideWidget(false)}
        >
          <ArDriveStackIcon width={'18px'} height={'18px'} />
        </button>
      ) : mode === 'dropdown' ? (
        <div className="widget-hidden">
          <Navbar
            hideWidget={hideWidget}
            setHideWidget={setHideWidget}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>
      ) : <></>}
    </>
  );
}

export default WidgetHidden;
