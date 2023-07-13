import { useState } from 'react';

import Widget from './components/Widget';

function App() {
  const [view, setView] = useState('search');
  const [showMenu, setShowMenu] = useState(true);
  const [hideWidget, setHideWidget] = useState(true);

  return (
    <>
      <Widget />
    </>
  );
}

export default App;
