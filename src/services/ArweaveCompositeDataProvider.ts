import {
  ArFSClientType,
  ArFSDriveEntity,
  EntityID,
} from '@atticusofsparta/arfs-lite-client';
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

  async getEntityType(
    entityId: EntityID,
  ): Promise<{ type: ENTITY_TYPES; owner: string } | undefined> {
    const ids = ['Drive-Id', 'Folder-Id', 'File-Id'];
    const queries = ids.map((entityType) =>
      entityQuery({
        id: entityId.toString(),
        entityType,
        modifiers: { first: 1 },
      }),
    );

    const [driveRes, folderRes, fileRes] = await Promise.all(
      queries.map((query) =>
        this._arweave.api
          .post('/graphql', query)
          .then((res) => res.data.data.transactions.edges[0]?.node),
      ),
    );

    if (folderRes?.tags?.find((t: any) => t.name === 'Folder-Id')) {
      return { type: ENTITY_TYPES.FOLDER, owner: folderRes.owner.address };
    }
    if (fileRes?.tags?.find((t: any) => t.name === 'File-Id')) {
      return { type: ENTITY_TYPES.FILE, owner: fileRes.owner.address };
    }
    if (driveRes?.tags?.find((t: any) => t.name === 'Drive-Id')) {
      return { type: ENTITY_TYPES.DRIVE, owner: driveRes.owner.address };
    }
  }
}

export default ArweaveCompositeDataProvider;
