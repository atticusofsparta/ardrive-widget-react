import { GqlQueryTagArray } from '../types';

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
    default: {
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
      transactions(first:${modifiers?.first ?? 100},sort:${
      modifiers?.sort ?? 'HEIGHT_ASC'
    }
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
