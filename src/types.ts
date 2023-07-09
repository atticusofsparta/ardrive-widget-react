import {ArFSClientType} from '@atticusofsparta/arfs-lite-client';
import Arweave from "arweave";

export type Theme = {
  primary: string,
  secondary: string,
  background: string,
  foreground: string,
  foreground_muted: string,
  text: string,
  text_subtle: string,
  input_text: string,
  input_placeholder: string,
  success: string,
  warning: string,
  error: string,
  info: string,
  shadow: string
}

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

 // getFiles(): Array<object>; // gql query using id and entity type (drive/folder/file)
  buildDrive(entityId:string): Promise<any>; // builds the complete drive structure for global state
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
  driveId: string;
  rootFolder: RootFolder;
  timestamp: number;
  owner: string;
  driveName: string;
  files?: { [x: string]: File }; // ALL FILES ARE STORED AT TOP LEVEL TO BE REFERENCED BY THEIR ID {[x: uuid]: file}
  fileCount: number;
  folderCount: number;
  size: number;
};

export type RootFolder = {
  folderId: string;
  files?:string[];
  folders?: { [x: string]: Folder }; // FOLDER STRUCTURE {[x: uuid]: folder}
  timestamp: number;
};

export type Folder = {
  parentFolderId: string;
  folderId: string;
  files?: Array<string>; // ARRAY OF ARFS FILES IDS
  folders?: { [x: string]: Folder }; // ARRAY OF ARFS FOLDER IDS
  timestamp: number; // UNIX
  folderName: string;
  fileCount: number; // TOTAL COMBINED FILE COUNT IN SUB FOLDERS
  folderCount: number; // TOTAL SUBFOLDER COUNT
  size: number; // IN BYTES
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
