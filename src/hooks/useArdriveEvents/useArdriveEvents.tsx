import EventEmitter from 'eventemitter3';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ardriveEvents: any;
  }
}

// this holds the state of the events that have happened in the widget.
export function useArdriveEvents() {
  const [ardriveEmitter, setArdriveEmitter] = useState<EventEmitter>();
  const [widgetHidden, setWidgetHidden] = useState<boolean>();
  const [defaultAddress, setdefaultAddress] = useState<string>();
  const [defaultArfsId, setDefaultArfsId] = useState<string>();
  const [lastTxCopy, setLastTxCopy] = useState<string>();
  const [lastArfsIdCopy, setLastArfsIdCopy] = useState<string>();
  const [loadedArfsId, setLoadedArfsId] = useState<string>();
  const [loadedEntityType, setLoadedEntityType] = useState<
    'drive' | 'folder' | 'file'
  >();

  useEffect(() => {
    if (window.ardriveEvents && !ardriveEmitter) {
      setArdriveEmitter(window.ardriveEvents);
    }
    if (!ardriveEmitter) return;

    ardriveEmitter.on('TX_COPY', (tx: string) => {
      setLastTxCopy(tx);
    });
    ardriveEmitter.on('ARFS_ID_COPY', (arfsId: string) => {
      setLastArfsIdCopy(arfsId);
    });
    ardriveEmitter.on('WIDGET_HIDDEN', (hidden: boolean) => {
      setWidgetHidden(hidden);
    });
    ardriveEmitter.on('DEFAULT_ADDRESS', (address: string) => {
      setdefaultAddress(address);
    });
    ardriveEmitter.on('DEFAULT_ARFS_ID', (arfsId: string) => {
      setDefaultArfsId(arfsId);
    });
    ardriveEmitter.on('ENTITY_LOADED', (arfsId: string, type: string) => {
      setLoadedArfsId(arfsId);
      setLoadedEntityType(type as 'drive' | 'folder' | 'file');
    });
    ardriveEmitter.on('RESET', () => {
      setLastTxCopy(undefined);
      setLastArfsIdCopy(undefined);
      setWidgetHidden(undefined);
      setdefaultAddress(undefined);
      setDefaultArfsId(undefined);
      setLoadedArfsId(undefined);
      setLoadedEntityType(undefined);
    });
  }, [window]);

  return {
    ardriveEmitter,
    widgetHidden,
    defaultAddress,
    defaultArfsId,
    lastTxCopy,
    lastArfsIdCopy,
    loadedArfsId,
    loadedEntityType,
  };
}
