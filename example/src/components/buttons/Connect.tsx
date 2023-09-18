import { Button } from '@radix-ui/themes';

import { useGlobalState } from '../../services/state/contexts/GlobalState';

function Connect() {
  const [, dispatchGlobalState] = useGlobalState();

  function handleConnect(e: any) {
    e.preventDefault();
    alert('Connect button clicked');

    dispatchGlobalState({
      type: 'setWalletAddress',
      payload: '0x1234567890',
    });
  }

  return <Button onClick={handleConnect}>Connect</Button>;
}

export default Connect;
