import { useState, useCallback } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

export function useCopyToClipboard(
  resetDelay: number = 2000
): [CopyStatus, (text: string) => Promise<boolean>] {
  const [status, setStatus] = useState<CopyStatus>('idle');

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard not supported');
        setStatus('error');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');

        // Reset after delay
        setTimeout(() => {
          setStatus('idle');
        }, resetDelay);

        return true;
      } catch (error) {
        console.warn('Copy failed', error);
        setStatus('error');
        return false;
      }
    },
    [resetDelay]
  );

  return [status, copy];
}
