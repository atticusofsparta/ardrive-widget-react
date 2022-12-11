import Arweave from 'arweave';

import {
  GqlQueryTagArray,
  GqlResultTagArray,
  GqlTransaction,
  TagsObject,
} from '../types';
import { ARFS_ID_REGEX } from '../utils/constants';

export const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

export class ArFSClient implements ArFSClient {
  async getDriveTransactions(
    id: string,
  ): Promise<Array<GqlTransaction> | undefined> {
    // step 1: get original (oldest) drive manifest (query by HEIGHT_ASC, oldest first)
    // step 2: save owner from that manifest
    // the above safeguards against having an attacker upload fake manifests from their account which can have performance affects in
    // loading drive state.
    // step 3: can continue to query for ALL drive-id transactions from that owners wallet.
    // step 4: delete extraneous manifest versions
    if (ARFS_ID_REGEX.test(id) === false) {
      // uuid validation
      return;
    }
    const query = entityQuery({ id: id, entityType: 'Drive-Id' });
    if (query == undefined) {
      return;
    }
    const results = await arweave.api.post('/graphql', query);
    if (results) {
      results.data.data.transactions.edges.map((txn: GqlTransaction) => {
        txn.node.tags = this.tagsToObject({ tags: txn.node.tags });
        txn.node.tags['Unix-Time'] = new Number(
          txn.node.tags['Unix-Time'],
        ).valueOf();
      });

      const manifests = results.data.data.transactions.edges.sort(
        (a: any, b: any) => a.node.tags['timestamp'] - b.node.tags['timestamp'],
      );
      return manifests;
    }
  }
  async getUnknownEntityTransactions(id: string) {
    if (ARFS_ID_REGEX.test(id) === false) {
      // uuid validation
      console.log('is not arfs id');
      return;
    }
    try {
      const drivequery = entityQuery({
        id: id,
        entityType: 'Drive-Id',
        modifiers: { first: 1, sort: 'HEIGHT_ASC' },
      });
      const folderquery = entityQuery({
        id: id,
        entityType: 'Folder-Id',
        modifiers: { first: 1, sort: 'HEIGHT_ASC' },
      });
      const filequery = entityQuery({
        id: id,
        entityType: 'File-Id',
        modifiers: { first: 1, sort: 'HEIGHT_ASC' },
      });
      if (filequery == undefined) {
        throw Error('file query was not defined');
      }

      const fileresults = await arweave.api.post('/graphql', filequery);

      if (fileresults.data.data?.transactions?.edges?.length > 0) {
        fileresults.data.data.transactions.edges.map((txn: GqlTransaction) => {
          txn.node.tags = this.tagsToObject({ tags: txn.node.tags });
          txn.node.tags['Unix-Time'] = new Number(
            txn.node.tags['Unix-Time'],
          ).valueOf();
        });
        const manifests = fileresults.data.data.transactions.edges.sort(
          (a: any, b: any) =>
            a.node.tags['timestamp'] - b.node.tags['timestamp'],
        );
        const fileEntityResult = manifests;
        console.log('file entity');
        return fileEntityResult;
      }

      if (folderquery == undefined) {
        throw Error('folder query was not defined');
      }

      const folderresults = await arweave.api.post('/graphql', folderquery);
      if (folderresults.data.data?.transactions?.edges.length > 0) {
        folderresults.data.data.transactions.edges.map(
          (txn: GqlTransaction) => {
            txn.node.tags = this.tagsToObject({ tags: txn.node.tags });
            txn.node.tags['Unix-Time'] = new Number(
              txn.node.tags['Unix-Time'],
            ).valueOf();
          },
        );

        const manifests = folderresults.data.data.transactions.edges.sort(
          (a: any, b: any) =>
            a.node.tags['timestamp'] - b.node.tags['timestamp'],
        );
        console.log('folder entity');

        return manifests;
      }

      if (drivequery == undefined) {
        throw Error('drive query was not defined');
      }

      const driveresults = await arweave.api.post('/graphql', drivequery);
      if (driveresults.data.data?.transactions?.edges.length > 0) {
        driveresults.data.data.transactions.edges.map((txn: GqlTransaction) => {
          txn.node.tags = this.tagsToObject({ tags: txn.node.tags });
          txn.node.tags['Unix-Time'] = new Number(
            txn.node.tags['Unix-Time'],
          ).valueOf();
        });

        const manifests = driveresults.data.data.transactions.edges.sort(
          (a: any, b: any) =>
            a.node.tags['timestamp'] - b.node.tags['timestamp'],
        );
        console.log('drive entity');

        return manifests;
      }
    } catch (error) {
      console.log('it no worky');
      console.error(error);
    }
  }

  getDriveOwner({
    transactions,
  }: {
    transactions: Array<GqlTransaction>;
  }): string {
    // this function assumes the drive was already sorted by the oldest timestamp. It *SHOULD* return the first index, since the first thing an owner creats is the drive entity
    for (let i = 0; i < transactions.length - 1; i++) {
      if (transactions[i].node.tags['Entity-Type'] === 'drive') {
        return transactions[i].node.owner.address;
      }
    }
    return 'no owner found';
  }

  tagsToObject({ tags }: { tags: GqlResultTagArray }): TagsObject {
    const tagObject: { [x: string]: string } = {};
    tags.map((tag) => (tagObject[tag.name] = tag.value));
    return tagObject;
  }
}

export const entityQuery = ({
  id,
  entityType,
  modifiers,
}: {
  id: string;
  entityType: string;
  modifiers?: { first?: number; sort?: 'HEIGHT_DESC' | 'HEIGHT_ASC' };
}) => {
  switch (entityType) {
    case 'Drive-Id': {
      const drivetags: GqlQueryTagArray = [
        {
          name: 'Drive-Id',
          values: [id],
        },
      ];
      const drivequery = buildQuery({
        tags: drivetags,
        modifiers: modifiers,
      });
      return drivequery;
    }
    case 'Folder-Id': {
      const foldertags: GqlQueryTagArray = [
        {
          name: 'Folder-Id',
          values: [id],
        },
      ];
      const folderquery = buildQuery({
        tags: foldertags,
        modifiers: modifiers,
      });
      return folderquery;
    }
    case 'File-Id': {
      const filetags: GqlQueryTagArray = [
        {
          name: 'File-Id',
          values: [id],
        },
      ];
      const filequery = buildQuery({ tags: filetags, modifiers: modifiers });
      return filequery;
    }
    default:
      return undefined;
  }
};

export const buildQuery = ({
  modifiers,
  tags,
}: {
  modifiers?: { first?: number; sort?: 'HEIGHT_DESC' | 'HEIGHT_ASC' };
  tags: GqlQueryTagArray;
}) => {
  const queryObject = {
    query: `{
      transactions(first:${modifiers?.first},sort:${modifiers?.sort}
        tags: [{
            name: "${tags[0].name}",
            values: ["${tags[0].values[0]}"]
        }]
      ) {
        edges {
          node {
            id
            owner {
              address
            }
            data {
              size
            }
            block {
              height
              timestamp
            }
            tags {
              name,
              value
            }
          }
        }
      }
    }`,
  };
  return queryObject;
};
