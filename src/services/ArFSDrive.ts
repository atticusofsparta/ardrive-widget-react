import {
  ArFSPublicFile,
  ArFSPublicFolder,
} from '@atticusofsparta/arfs-lite-client/types/arfs';
import { ArFSDriveEntity } from '@atticusofsparta/arfs-lite-client/types/arfs/drive';

class ArFSDrive {
  _driveEntity: ArFSDriveEntity;
  _folderEntities: ArFSPublicFolder[];
  _fileEntities: ArFSPublicFile[];

  constructor(
    drive: ArFSDriveEntity,
    folders: ArFSPublicFolder[],
    files: ArFSPublicFile[],
  ) {
    this._driveEntity = drive;
    this._folderEntities = folders;
    this._fileEntities = files;
  }
}

export default ArFSDrive;
