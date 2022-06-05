import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import {
  SnackbarProvider as NotistackProvider,
  SnackbarProviderProps,
} from 'notistack';
import React, { FC, memo, useRef } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

/*
 * Here we're using !important because it seems that notistack has trouble
 * overriding classes.
 *
 * @see https://github.com/iamhosseindhv/notistack/issues/305
 */
const useClasses = makeStyles((theme: EmpreinttThemeType) => ({
  info: {
    backgroundColor: `${theme.palette.info.main} !important`,
    color: `${theme.palette.common.white} !important`,
  },
  success: { backgroundColor: `${theme.palette.success.main} !important` },
  error: { backgroundColor: `${theme.palette.error.main} !important` },
  warning: { backgroundColor: `${theme.palette.warning.main} !important` },
  btn: {
    color: theme.palette.common.white,
  },
}));

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children,
  classes,
  ...props
}) => {
  const classesOverride = useClasses();
  const notistackRef = useRef<any>();

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      classes={{
        variantInfo: classesOverride.info,
        variantSuccess: classesOverride.success,
        variantWarning: classesOverride.warning,
        variantError: classesOverride.error,
      }}
      action={(key) => (
        /* https://github.com/iamhosseindhv/notistack/issues/156 */
        <Button
          onClick={() => notistackRef?.current?.closeSnackbar?.(key)}
          className={classesOverride.btn}
        >
          <Close />
        </Button>
      )}
      {...props}
    >
      {children}
    </NotistackProvider>
  );
};

export default memo(SnackbarProvider);
