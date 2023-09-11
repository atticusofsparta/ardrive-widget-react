import Widget from "../../../../../src/components/Widget";
import Search from "../../inputs/Search";
import { useEffect, useState } from "react";
import EventEmitter from "eventemitter3";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [ardriveEmitter, setArdriveEmitter] = useState<EventEmitter>();
  const [txId, setTxId] = useState<string>();
  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {

    if (ardriveEmitter && ardriveEmitter.on) {
      ardriveEmitter.on('TX_COPY', (tx: string) => {
        setTxId(tx)
        setSearchparams({search: tx})
      })

    }
  }, [ardriveEmitter])

  return (
    <div className="page flex flex-column align-center">
      <h1>Home</h1>

      <Search 
      icon={ 
      <span style={{
        position: 'absolute',
        right: '10px',
        top: '5px',
      }}
      
      >
        <Widget
        preferredHideMode="icon"
        address={"7waR8v4STuwPnTck1zFVkQqJh5K9q9Zik4Y5-5dV7nk"}
        eventEmitterCallback={(emitter:any) => setArdriveEmitter(emitter)}
        hideOnCopy={true}
        />
        </span>
        }
      />
     
    </div>
  );
}

export default Home;
