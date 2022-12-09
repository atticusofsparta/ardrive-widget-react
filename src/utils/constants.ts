export const ARFS_ID_REGEX = new RegExp(
  '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
);
export const ARNS_TXID_REGEX = new RegExp('^[a-z0-9-s+]{43}$');

export const INITIAL_DRIVE_STATE = {
  files: {
    file: {
      dataTansaction: 'TEST',
      fileId: 'TEST',
      parentFolderId: 'TEST',
      timestamp: 'TEST',
      mime: 'TEST',
      fileName: 'TEST',
      size: 'TEST',
    },
  },
  rootFolder: {
    folderID: 'TEST',
    files: ['file'],
    folders: {
      // actual drive structure is all manage here by folder structure.
      // When getting a file, you just reference the files key in the top level.
      folder: {
        folderId: 'TEST',
        parentFolderId: 'TEST',
        timestamp: 'TEST',
        size: 'TEST',
        files: ['file'],
        folders: {
          subFolder: {
            folderId: 'TEST',
            parentFolderId: 'TEST',
            timestamp: 'TEST',
            mime: 'TEST',
            fileName: 'TEST',
            size: 'TEST',
            files: ['file'],
            folders: {},
          },
        },
      },
    },
    timestamp: 1,
  },
};
