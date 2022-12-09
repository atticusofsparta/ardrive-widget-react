import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

// create props for default account to import a users files passed down by parent app
// create theme provider
// create files object for data urls that parent app can access
//

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
