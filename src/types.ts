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
  files?: Array<File>;
  folders?: Array<Folder>;
  timestamp: number;
};

export type Folder = {
  parentFolderId: string;
  folderId: string;
  files: Array<File>;
  folders: Array<Folder>;
  timestamp: number;
  folderName: string;
  versions?: Array<Folder>;
  fileCount: number;
  folderCount: number;
  size: number;
};
export type File = {
  dataTansaction: string;
  fileId: string;
  parentFolderId: string;
  timestamp: number;
  mime: string;
  fileName: string;
  versions?: Array<File>;
  size: number;
};
