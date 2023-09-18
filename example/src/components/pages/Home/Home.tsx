import ArdriveWidget from 'ardrive-widget-react';
import 'ardrive-widget-react/styles.css?inline';
import EventEmitter from 'eventemitter3';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Search from '../../inputs/Search';

function Home() {
  const [ardriveEmitter, setArdriveEmitter] = useState<EventEmitter>();
  const [, setTxId] = useState<string>();
  const [, setSearchparams] = useSearchParams();

  useEffect(() => {
    if (ardriveEmitter && ardriveEmitter.on) {
      ardriveEmitter.on('TX_COPY', (tx: string) => {
        setTxId(tx);
        setSearchparams({ search: tx });
      });
    }
  }, [ardriveEmitter]);

  return (
    <div className="page flex flex-column align-center">
      <h1>Home</h1>

      <Search
        icon={
          <span
            style={{
              position: 'absolute',
              right: '10px',
              top: '5px',
            }}
          >
            <ArdriveWidget
              preferredHideMode="icon"
              address={'7waR8v4STuwPnTck1zFVkQqJh5K9q9Zik4Y5-5dV7nk'}
              eventEmitterCallback={(emitter: any) =>
                setArdriveEmitter(emitter)
              }
              hideOnCopy={true}
            />
          </span>
        }
      />
    </div>
  );
}

export default Home;
