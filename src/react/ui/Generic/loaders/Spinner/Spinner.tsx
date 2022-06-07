import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

import { colors } from '../../../branding/theme';

const useStyle = makeStyles({
  spinnerContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  background: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  spinnerBoundary: {
    position: 'relative',
  },
  underLabel: {
    position: 'absolute',
    top: 45,
    width: '100%',
    textAlign: 'center',
  },
});

export const SpinnerBoundary: FC = ({ children }) => {
  const classes = useStyle();
  return <div className={classes.spinnerBoundary}>{children}</div>;
};

interface SpinnerProps {
  background?: boolean;
}

export const Spinner: FC<SpinnerProps> = ({ background }) => {
  const classes = useStyle();
  const [isHoldTightMode, setHoldTightMode] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHoldTightMode(true);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(classes.spinnerContainer, background && classes.background)}
      data-testid="spinner"
    >
      <BounceLoader size={40} color={colors['primary-500']} />
      {isHoldTightMode && (
        <Box className={classes.underLabel}>
          Hold on...
        </Box>
      )}
    </div>
  );
};
