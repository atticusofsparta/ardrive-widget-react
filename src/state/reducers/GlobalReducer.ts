import { DriveStructure } from '../../types';
import { GlobalState } from '../contexts/GlobalState';

export type Action =
  | { type: 'setWalletAddress'; payload: string }
  | { type: 'setGateway'; payload: string }
  | { type: 'setIsSearching'; payload: boolean }
  | { type: 'setSearchQuery'; payload: string }
  | { type: 'setSearchType'; payload: string | undefined }
  | { type: 'setDriveIDs'; payload: string[] }
  | { type: 'setDrive'; payload: DriveStructure }
  | { type: 'setDriveOwner'; payload: string | undefined }
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
    case 'setSearchQuery':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'setSearchType':
      return {
        ...state,
        searchType: action.payload,
      };
    case 'setDriveIDs':
      return {
        ...state,
        driveIDs: action.payload,
      };
    case 'setDrive':
      return {
        ...state,
        drive: action.payload,
      };
    case 'setDriveOwner':
      return {
        ...state,
        driveOwner: action.payload,
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
