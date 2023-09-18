import '@radix-ui/themes/styles.css';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound';
import {
  Address,
  BlockHeight,
  Contract,
  Documentation,
  Forum,
  Home,
  IDM,
  TokenLists,
  Transaction,
} from './components/pages';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} errorElement={<NotFound />}>
        <Route path="/" element={<Home />} />
        <Route path="/address/:address" element={<Address />} />
        <Route path="/block/:blockHeight" element={<BlockHeight />} />
        <Route path="/contract/:address" element={<Contract />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/idm/:address" element={<IDM />} />
        <Route path="/tokens" element={<TokenLists />} />
        <Route path="/transaction/:transaction" element={<Transaction />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
