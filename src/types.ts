export interface ArFSDataProvider {
  getFiles(): Array<object>; // gql query using id and entity type (drive/folder/file)
  buildDrive(): DriveStructure; // builds the complete drive structure for global state
}
export interface ArFSClient {
  getDriveTransactions(): Promise<Array<string> | undefined>;
  getDriveOwner(): string;
  tagsToObject(): TagsObject;
  cleanDriveData(): Array<GqlTransaction>;
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
  rootFolder: RootFolder;
  timestamp: number;
  owner: string;
  driveName: string;
  files?: { [x: string]: File }; // ALL FILES ARE STORED AT TOP LEVEL TO BE REFERENCED BY THEIR ID
  fileCount: number;
  folderCount: number;
  size: number;
};

export type RootFolder = {
  folderId: string;
  folders?: { [x: string]: Folder }; // FOLDER STRUCTURE
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
  dataTansaction: string;
  fileId: string;
  parentFolderId: string;
  timestamp: number;
  mime: string;
  fileName: string;
  size: number;
};
