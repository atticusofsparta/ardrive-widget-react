import {
  ArFSPublicFile,
  ArFSPublicFolder,
  EntityID,
} from '@atticusofsparta/arfs-lite-client/types/arfs';
import { ArFSDriveEntity } from '@atticusofsparta/arfs-lite-client/types/arfs/drive';

import { DriveStructure, Folder } from '../types';

class ArFSDrive {
  _driveEntity: ArFSDriveEntity;
  _folderEntities: ArFSPublicFolder[];
  _fileEntities: ArFSPublicFile[];
  _drive: DriveStructure;

  constructor(
    drive: ArFSDriveEntity,
    folders: ArFSPublicFolder[],
    files: ArFSPublicFile[],
  ) {
    this._driveEntity = drive;
    this._folderEntities = folders;
    this._fileEntities = files;
    this._drive = this.build();
  }

  build(): DriveStructure {
    let newDrive: DriveStructure = {
      details: this._driveEntity,
      root: this.buildFolderStructure(this._driveEntity.rootFolderId),
    };

    return newDrive;
  }

  getFoldersByParentId(parentId: EntityID) {
    return this._folderEntities.filter((f) => f.parentFolderId === parentId);
  }

  getFilesByParentId(parentId: EntityID) {
    return this._fileEntities.filter((f) => f.parentFolderId === parentId);
  }

  buildFolderStructure(folderEntity: ArFSPublicFolder) {
    let folderStructure: Folder = {
      files: this.getFilesByParentId(folderEntity.folderId),
      folders: [],
      details: folderEntity,
    };

    // Get child folders of the current folder
    const childFolders = this.getFoldersByParentId(folderEntity.folderId);

    // For each child folder, build its structure
    if (childFolders.length) {
      for (const childFolder of childFolders) {
        let childFolderStructure = {
          ...this.buildFolderStructure(childFolder),
        };
        folderStructure.folders.push(childFolderStructure);
      }
    }
    return folderStructure;
  }
}

export default ArFSDrive;
