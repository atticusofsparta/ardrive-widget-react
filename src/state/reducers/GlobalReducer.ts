import { GlobalState } from '../contexts/GlobalState';

export type Action =
  | { type: 'setWalletAddress'; payload: string }
  | { type: 'setGateway'; payload: string }
  | { type: 'setIsSearching'; payload: boolean }
  | { type: 'setDriveID'; payload: string }
  | { type: 'setErrors'; payload: Array<Error> };

export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'setWalletAddress':
      return {
        ...state,
        walletAddress: action.payload,
      };
    case 'setGateway':
      return {
        ...state,
        gateway: action.payload,
      };
    case 'setIsSearching':
      return {
        ...state,
        isSearching: action.payload,
      };
    case 'setDriveID':
      return {
        ...state,
        driveID: action.payload,
      };
    case 'setErrors':
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
