import { ArFSClient } from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import ArweaveCompositeDataProvider from '../../services/ArweaveCompositeDataProvider';

function useArweaveCompositeDataProvider({
  customArweave,
}: {
  customArweave?: Arweave;
}) {
  const [dataProvider, setDataProvider] = useState<
    ArweaveCompositeDataProvider | undefined
  >(undefined);

  useEffect(() => {
    try {
      const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
      });
      const arFSClient = new ArFSClient(arweave);

      const arweaveCompositeDataProvider = new ArweaveCompositeDataProvider({
        arweave: customArweave ?? arweave,
        arFSClient,
      });
      setDataProvider(arweaveCompositeDataProvider);
    } catch (error) {
      console.error(error);
    }
  }, [customArweave]);

  return dataProvider;
}

export default useArweaveCompositeDataProvider;
