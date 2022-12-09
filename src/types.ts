export interface ArFSDataProvider {
    getFiles():()=> Array<object> // gql query using id and entity type (drive/folder/file)
    getOwner():()=> string // logic to find original drive manifest via gql for a given file using a single file
    buildDrive(): () => DriveStructure // builds the complete drive structure for global state

}


export type DriveStructure = {
  rootFolder: RootFolder;
  timestamp: number;
  owner: string;
  driveName: string;
  fileCount: number;
  folderCount: number;
  size: number;
};

export type RootFolder = {
  folderId: string;
  files?: {[x:string]:File}; // ALL FILES ARE STORED AT TOP LEVEL TO BE REFERENCED BY THEIR ID
  folders?: {[x:string]:Folder} // FOLDER STRUCTURE
  timestamp: number;
};

export type Folder = {
  parentFolderId: string;
  folderId: string;
  files: Array<string>; // ARRAY OF ARFS FILES IDS
  folders: {[x:string]:Folder}; // ARRAY OF ARFS FOLDER IDS
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
