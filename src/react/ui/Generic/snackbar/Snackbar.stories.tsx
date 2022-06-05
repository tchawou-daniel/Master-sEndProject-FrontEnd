import { Meta } from '@storybook/react/types-6-0';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback } from 'react';

import useSnackbars from 'react/common/useSnackbars';

export default {
  title: 'Generic/Snackbar',
} as Meta;

export const Variants: FC = () => {
  const { snackInfo, snackError, snackSuccess, snackWarning } = useSnackbars();

  return (
    <>
      <button type="button" onClick={() => snackInfo('Message !')}>
        Info
      </button>
      <button type="button" onClick={() => snackWarning('Message !')}>
        Warning
      </button>
      <button type="button" onClick={() => snackError('Message !')}>
        Error
      </button>
      <button type="button" onClick={() => snackSuccess('Message !')}>
        Success
      </button>
    </>
  );
};

export const Custom: FC = () => {
  const snackbar = useSnackbar();

  const handleClick = useCallback(() => {
    snackbar.enqueueSnackbar('this will not be displayed', {
      content: () => <div>Overriding content!</div>,
    });
  }, [snackbar]);

  return (
    <button type="button" onClick={handleClick}>
      Hello
    </button>
  );
};
