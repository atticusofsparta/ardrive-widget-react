import { ArFSClient } from '../services/arweave';
import { ArFSDataProvider, GqlTransaction } from '../types';
import { INITIAL_DRIVE_STATE } from './constants';

export class DriveDataProvider implements ArFSDataProvider {
  driveId: string;
  wallet: string;
  manifests: Array<GqlTransaction>;
  owner: string;
  constructor({
    driveId,
    walletAddress,
  }: {
    driveId: string;
    walletAddress: string;
  }) {
    this.driveId = driveId;
    this.wallet = walletAddress;
    this.manifests = [];
    this.owner = '';
  }
  getFiles() {
    const arfs = new ArFSClient();
    arfs.getDriveTransactions(this.driveId).then((result) => {
      if (result) {
        this.manifests = result;
      }
    });

    this.owner = arfs.getDriveOwner({ transactions: this.manifests });

    return [{}, {}];
  }

  buildDrive() {
    return INITIAL_DRIVE_STATE;
  }
}
