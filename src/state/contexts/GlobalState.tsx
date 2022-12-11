import React, { Dispatch, createContext, useContext, useReducer } from 'react';

import { DriveStructure } from '../../types';
import type { Action } from '../reducers/GlobalReducer';

export type GlobalState = {
  gateway: string; // arweave gateway
  walletAddress?: string; // connected wallet (only passed down from parent app)
  driveIDs?: string[]; // drives that have been attached to this widget or are owned by connected wallet
  isSearching: boolean;
  searchQuery?: string; // arfsId, arweaveId, or name of a file. Can only search for file names on attached drives.
  searchType?: string;
  driveOwner?: string;
  drive?: DriveStructure; // attached drive - can only attach one at a time.
  errors: Array<Error>;
};

const initialState: GlobalState = {
  gateway: 'arweave.net',
  walletAddress: undefined,
  driveIDs: undefined,
  isSearching: false,
  searchQuery: '',
  searchType: undefined,
  driveOwner: undefined,
  errors: [],
};

const GlobalStateContext = createContext<[GlobalState, Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

export const useGlobalState = (): [GlobalState, Dispatch<Action>] =>
  useContext(GlobalStateContext);

type StateProviderProps = {
  reducer: React.Reducer<GlobalState, Action>;
  children: React.ReactNode;
};

/** Create provider to wrap app in */
export default function GlobalStateProvider({
  reducer,
  children,
}: StateProviderProps): JSX.Element {
  const [state, dispatchGlobalState] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatchGlobalState]}>
      {children}
    </GlobalStateContext.Provider>
  );
}
