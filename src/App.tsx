import { useState } from 'react';

import Widget from './components/Widget';

function App() {
  const [view, setView] = useState('search');
  const [showMenu, setShowMenu] = useState(true);
  const [hideWidget, setHideWidget] = useState(true);

  return (
    <>
      <Widget
      address={"7waR8v4STuwPnTck1zFVkQqJh5K9q9Zik4Y5-5dV7nk"}
      />
    </>
  );
}

export default App;
