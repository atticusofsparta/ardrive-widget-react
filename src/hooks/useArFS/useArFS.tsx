import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import { DriveStructure } from '../../types';
import { ARFS_ID_REGEX, ARNS_TXID_REGEX } from '../../utils/constants';

function useArFS({
  address,
  arfsId,
}: {
  address?: string;
  arfsId?: string;
  customArweave?: Arweave;
}) {
  const [drive] = useState<DriveStructure>();
  const [owner, setOwner] = useState<string>();

  const [isLoading] = useState<boolean>(false);
  const [entityType] = useState<'drive' | 'folder' | 'file'>();
  const [entityId, setEntityId] = useState<string>(); // save entity id to highlight imported file or folder

  useEffect(() => {
    //onload
    if (address && ARNS_TXID_REGEX.test(address)) {
      setOwner(address);
    }
    if (arfsId && ARFS_ID_REGEX.test(arfsId)) {
      setEntityId(arfsId);
    }
  }, [address, arfsId]);

  useEffect(() => {
    console.log('beep');
  }, [entityId, owner]);

  // async function getDrive({
  //   address,
  //   arfsId,
  // }: {
  //   address?: string;
  //   arfsId?: string;
  // }) {
  //   setIsLoading(true);
  //   // prioritize arfsId
  //   const queryType = arfsId ? 'arfsId' : 'address';
  //   try {
  //     if (
  //       (queryType === 'address' && !address) ||
  //       (address && !ARNS_TXID_REGEX.test(address))
  //     ) {
  //       throw Error('No address or arfs id provided');
  //     }
  //     if (
  //       (queryType === 'arfsId' && !arfsId) ||
  //       (arfsId && !ARFS_ID_REGEX.test(arfsId))
  //     ) {
  //       throw Error('No address or arfs id provided');
  //     }

  //     // const newDrive: DriveStructure | undefined = await arweaveDataProvider?.buildDrive({address, entityId:arfsId})

  //     // if (!newDrive){
  //     //     throw Error('No drive found')
  //     // }

  //     //  return newDrive
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return {
    drive,
    owner,
    isLoading,
    entityType,
    entityId,
  };
}

export default useArFS;
