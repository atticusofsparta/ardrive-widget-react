import { Theme } from '@radix-ui/themes';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';
import GlobalStateProvider from './services/state/contexts/GlobalState';
import { reducer } from './services/state/reducers/GlobalStateReducer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStateProvider reducer={reducer}>
      <Theme
        appearance="dark"
        accentColor="grass"
        grayColor="sand"
        radius="medium"
      >
        <App />
      </Theme>
    </GlobalStateProvider>
  </React.StrictMode>,
);
