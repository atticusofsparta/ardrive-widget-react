import { SEARCH_TYPES } from '../types';
import { ARFS_ID_REGEX, ARNS_TXID_REGEX } from './constants';

export function checkSearchType(props: string) {
  try {
    if (ARFS_ID_REGEX.test(props)) {
      return SEARCH_TYPES.ARFS_ID;
    }
    if (ARNS_TXID_REGEX.test(props)) {
      return SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS;
    }
  } catch (error) {
    console.error(error);
  }
}

export function isArweaveTransactionID(id?: string) {
  if (!id) {
    return false;
  }

  return ARNS_TXID_REGEX.test(id);
}

export function isArFSID(id?: string) {
  if (!id) {
    return false;
  }

  return ARFS_ID_REGEX.test(id);
}

export function formatByteCount(byteCount: number) {
  const byteCountTypes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const base = 1024;
  let count = +byteCount;
  let typeIndex = 0;

  while (count >= base && typeIndex < byteCountTypes.length - 1) {
    count /= base;
    typeIndex++;
  }

  return `${count.toFixed(1)} ${byteCountTypes[typeIndex]}`;
}


export async function getCachedItemsByDriveId(driveId: string): Promise<any[]> {
  return new Promise<any[]>((resolve, reject) => {
    const dbOpenRequest = indexedDB.open('arfs-entity-cache-db', 1);

    dbOpenRequest.onerror = (_event: Event) => {
      reject("Error opening database");
    };

    dbOpenRequest.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction('cache', 'readonly');
      const objectStore = transaction.objectStore('cache');

      const items: any[] = [];
      const cursorRequest = objectStore.openCursor();

      cursorRequest.onsuccess = (event: Event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
         
          const itemDriveId = cursor.value.value.driveId?.entityId; // Assuming 'driveId' is an object with 'entityId'
          if (itemDriveId === driveId) {
            items.push(cursor.value);
          }
          cursor.continue();
        } else {
          resolve(items);
        }
      };

      cursorRequest.onerror = (_event: Event) => {
        reject("Error querying by drive ID");
      };
    };
  });
}

/**
 * Decodes a Base64-encoded JSON Data URI string.
 * @param {string} dataUri - The Data URI string to decode and parse.
 * @returns {any} - The parsed JSON object.
 * @throws {Error} - Throws an error if the Data URI is invalid or if JSON parsing fails.
 */
export function decodeJsonDataUri(dataUri: string): any {
  // Validate Data URI scheme
  const schemePattern = /^data:application\/json;base64,/;
  if (!schemePattern.test(dataUri)) {
    throw new Error("Invalid Data URI scheme. Must be 'data:application/json;base64,'");
  }

  // Extract the Base64-encoded part
  const base64String = dataUri.replace(schemePattern, "");

  // Decode the Base64 string
  const decodedString = atob(base64String);

  // Parse the JSON string
  try {
    return JSON.parse(decodedString);
  } catch (error) {
    throw new Error(`An error occurred while parsing JSON: ${error}`);
  }
}

export function decodeStringDataUri(dataUri: string): any {
  
  // Extract the Base64-encoded part
  const base64String = dataUri.split(',')[1];

  // Decode the Base64 string
  return atob(base64String);

}

