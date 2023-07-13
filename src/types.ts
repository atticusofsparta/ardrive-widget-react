import {
  ArFSPublicFile,
  ArFSPublicFolder,
  EntityID,
  ArFSDriveEntity,
  ArFSClientType
} from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';

import ArFSDrive from './services/ArFSDrive';

export type Theme = {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  foreground_muted: string;
  text: string;
  text_subtle: string;
  input_text: string;
  input_placeholder: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  shadow: string;
};

export enum SEARCH_TYPES {
  ARFS_ID = 'arfsId',
  ARWEAVE_WALLET_ADDRESS = 'arweaveWalletAddress',
}

export enum ENTITY_TYPES {
  DRIVE = 'drive',
  FOLDER = 'folder',
  FILE = 'file',
}

export interface ArFSDataProvider {
  _ArFSClient: ArFSClientType;
  _arweave: Arweave;

  buildDrive(drive: ArFSDriveEntity): Promise<ArFSDrive>; // builds the complete drive structure
  getEntityType(entityId: EntityID): Promise<ENTITY_TYPES | undefined>; // returns the entity type of the arfs id
}

export type GqlQueryTagArray = Array<{ name: string; values: Array<string> }>;
export type GqlResultTagArray = [{ name: string; value: string }];
export type TagsObject = { [x: string]: string };
export type GqlTransaction = {
  node: {
    id: string;
    block: any;
    owner: any;
    data: any;
    tags: any;
  };
};
export type DriveStructure = {
  details: ArFSDriveEntity;
  root: {
    folders: Folder[];
    files: ArFSPublicFile[];
  };
};

export type RootFolder = {
  folderId: string;
  files?: string[];
  folders?: { [x: string]: Folder }; // FOLDER STRUCTURE {[x: uuid]: folder}
  timestamp: number;
};

export type Folder = {
  files: ArFSPublicFile[];
  folders: Folder[];
  details: ArFSPublicFolder;
};
export type File = {
  dataTansaction: string; // arweave txid
  fileId: string; // uuid
  parentFolderId: string; // uuid
  timestamp: number; // unit
  mime: string;
  fileName: string;
  size: number; // bytes
};
