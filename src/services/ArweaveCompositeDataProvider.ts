import { ArFSClientType, EntityID, ArFSDriveEntity } from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';

import { ArFSDataProvider, ENTITY_TYPES } from '../types';
import ArFSDrive from './ArFSDrive';
import { entityQuery } from './arweave';

class ArweaveCompositeDataProvider implements ArFSDataProvider {
  _arweave: Arweave;
  _ArFSClient: ArFSClientType;

  constructor({
    arweave,
    arFSClient,
  }: {
    arweave: Arweave;
    arFSClient: ArFSClientType;
  }) {
    this._arweave = arweave;
    this._ArFSClient = arFSClient;
  }

  async buildDrive(drive: ArFSDriveEntity): Promise<ArFSDrive> {
    const owner = await this._ArFSClient.getOwnerForDriveId(drive.driveId);
    const folders = await this._ArFSClient.getAllFoldersOfPublicDrive({
      driveId: drive.driveId,
      owner,
      latestRevisionsOnly: true,
    });
    const files = await this._ArFSClient.getPublicFilesWithParentFolderIds({
      folderIDs: folders.map((f) => f.folderId),
      owner,
      latestRevisionsOnly: true,
    });
    return new ArFSDrive(drive, folders, files);
  }

  async getEntityType(entityId: EntityID): Promise<ENTITY_TYPES | undefined> {
    
    const ids = ['Drive-Id', 'Folder-Id', 'File-Id'];
    const queries = ids.map((entityType) =>
      entityQuery({ id: entityId.toString(), entityType, modifiers: { first: 1 } }),
    );

    const [driveRes, folderRes, fileRes] = await Promise.all(
      queries.map((query, index) =>
        this._arweave.api
          .post('/graphql', query)
          .then((res) =>
            res.data.data.transactions.edges[0]?.node?.tags?.find(
              (t:any) => t.name === ids[index],
            ),
          ),
      ),
    );

    if (driveRes) {
      return ENTITY_TYPES.DRIVE;
    }
    if (folderRes) {
      return ENTITY_TYPES.FOLDER;
    }
    if (fileRes) {
      return ENTITY_TYPES.FILE;
    }
  }
}

export default ArweaveCompositeDataProvider;
