import { DriveStructure } from '../types';

export const ARFS_ID_REGEX = new RegExp(
  '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
);
export const ARNS_TXID_REGEX = new RegExp('^[a-z0-9-s+]{43}$');
export const TEST_DRIVE_ID = 'feb06a23-7447-4efe-977c-c361edae5fd7';

export const INITIAL_DRIVE_STATE: DriveStructure = {
  timestamp: 1,
  owner: 'owner',
  driveName: 'name',
  fileCount: 1,
  folderCount: 1,
  size: 1,
  files: {
    file: {
      dataTansaction: 'TEST',
      fileId: 'TEST',
      parentFolderId: 'TEST',
      timestamp: 1,
      mime: 'TEST',
      fileName: 'TEST',
      size: 1,
    },
  },
  rootFolder: {
    folderId: 'TEST',
    folders: {
      // actual drive structure is all manage here by folder structure.
      // When getting a file, you just reference the files key in the top level.
      folder: {
        folderId: 'TEST',
        parentFolderId: 'TEST',
        timestamp: 1,
        size: 1,
        files: ['file'],
        fileCount: 1,
        folderCount: 1,
        folderName: 'name',
        folders: {
          subFolder: {
            folderId: 'TEST',
            parentFolderId: 'TEST',
            timestamp: 1,
            folderName: 'TEST',
            size: 1,
            files: ['file'],
            folders: {},
            fileCount: 1,
            folderCount: 1,
          },
        },
      },
    },
    timestamp: 1,
  },
};
