import * as Tooltip from '@radix-ui/react-tooltip';import { useState } from 'react';

import { CopyIcon } from '../../../icons';
import './styles.css';

function CopyTextButton({
  body,
  copyText,
  size,
  wrapperStyle = {},
  position = 'absolute',
  copyButtonStyle,
  onCopy
}: {
  copyText: string;
  body?: JSX.Element | string;
  size?: number | string;
  wrapperStyle?: any;
  position?: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
  copyButtonStyle?: any;
  onCopy?: () => void;
}) {
  const [textCopied, setTextCopied] = useState<boolean>(false);

  async function handleCopy() {
    setTextCopied(true);
    if (copyText) {
      await navigator.clipboard.writeText(copyText);
    }
    if (onCopy) {
      onCopy();
    }
    setTimeout(() => {
      setTextCopied(false);
    }, 500);
  }

  return (
    <div className="flex center" style={{ position, ...wrapperStyle }}>
     
        <Tooltip.Provider>
      <Tooltip.Root open={textCopied}>
        <Tooltip.Trigger asChild>
        <button
        className="flex flex-space-between button center"
        style={{
          ...wrapperStyle,
          cursor: 'pointer',
          gap: '8px',
          padding: '0px',
        }}
        onClick={async () => {
          await handleCopy();
        }}
      >
        <span className="flex white center" style={{ fontSize: 'inherit' }}>
          {body}&nbsp;
        </span>
        <CopyIcon
            className="flex center"
            height={size ?? 15}
            width={size ?? 15}
            fill={'inherit'}
            style={{ cursor: 'pointer', scale: size, border:"none", ...copyButtonStyle }}
          />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content style={{
            color: 'var(--text-black)',
            backgroundColor: 'var(--foreground-muted)',
            fontSize: '12px',
            fontWeight:"bold",
            fontFamily:"Wavehaus",
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '3px',
            padding: '4px 8px',
          }} sideOffset={5}>
            Copied
            <Tooltip.Arrow height={0} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
    </div>
  );
}

export default CopyTextButton;
