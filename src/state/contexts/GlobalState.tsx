import React, { Dispatch, createContext, useContext, useReducer } from 'react';

import { DriveStructure } from '../../types';
import type { Action } from '../reducers/GlobalReducer';

export type GlobalState = {
  gateway: string;
  walletAddress?: string;
  driveID?: string;
  isSearching: boolean;
  drive?: DriveStructure;
  errors: Array<Error>;
};

const initialState: GlobalState = {
  gateway: 'arweave.net',
  walletAddress: undefined,
  driveID: undefined,
  isSearching: false,
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
