import { GlobalState } from '../contexts/GlobalState';

export type Action = { type: 'setWalletAddress'; payload: string | undefined };

export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'setWalletAddress':
      return {
        ...state,
        walletAddress: action.payload,
      };
    default:
      return state;
  }
};
