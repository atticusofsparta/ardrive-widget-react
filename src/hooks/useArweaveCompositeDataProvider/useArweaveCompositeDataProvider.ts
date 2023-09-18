import { ArFSClient } from '@atticusofsparta/arfs-lite-client';
import Arweave from 'arweave';
import { useEffect, useState } from 'react';

import ArweaveCompositeDataProvider from '../../services/ArweaveCompositeDataProvider';

const DEFAULT_ARWEAVE = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});
const DEFAULT_ARFS_CLIENT = new ArFSClient(DEFAULT_ARWEAVE);
const DEFAULT_PROVIDER = new ArweaveCompositeDataProvider({
  arweave: DEFAULT_ARWEAVE,
  arFSClient: DEFAULT_ARFS_CLIENT,
});

function useArweaveCompositeDataProvider(customArweave?: Arweave) {
  const [dataProvider, setDataProvider] =
    useState<ArweaveCompositeDataProvider>(DEFAULT_PROVIDER);

  useEffect(() => {
    if (customArweave) {
      try {
        const arFSClient = new ArFSClient(customArweave);
        const arweaveCompositeDataProvider = new ArweaveCompositeDataProvider({
          arweave: customArweave,
          arFSClient,
        });
        setDataProvider(arweaveCompositeDataProvider);
      } catch (error) {
        console.error(error);
      }
    }
  }, [customArweave]);

  return dataProvider;
}

export default useArweaveCompositeDataProvider;
