import { useCallback } from 'react';

import useSnackbars from './useSnackbars';

/**
 * Stolen from https://github.com/bchoubert/bc-font-website/blob/master/src/services/Clipboard.service.ts
 * @param text
 */
const copyToClipboard = (text: string): void => {
  const textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export default () => {
  const { snackInfo } = useSnackbars();

  const copy = useCallback((text: string) => {
    copyToClipboard(text);

    snackInfo('Copied to clipboard!', { autoHideDuration: 1000 });
  }, [snackInfo]);

  return { copy };
};
