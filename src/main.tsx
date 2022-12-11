import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import GlobalStateProvider from './state/contexts/GlobalState';
import { reducer } from './state/reducers/GlobalReducer';

// create props for default account to import a users files passed down by parent app
// create theme provider
// create files object for data urls that parent app can access
//

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStateProvider reducer={reducer}>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
);
