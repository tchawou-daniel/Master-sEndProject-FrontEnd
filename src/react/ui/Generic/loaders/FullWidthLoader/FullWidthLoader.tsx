import { Fade } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, memo } from 'react';

import { colors, EmpreinttThemeType } from '../../../branding/theme';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  bar: {
    backgroundColor: theme.palette.tertiary.main,
  },
  root: {
    backgroundColor: colors['blue-100'],
    position: 'absolute',
    width: '100%',
    marginTop: 0,
  },
}));

interface FullWidthLoaderProps {
  show: boolean;
}

const FullWidthLoader: FC<FullWidthLoaderProps> = ({ show }) => {
  const classes = useStyles();
  return (
    <div style={{ position: 'relative', height: 0, width: '100%' }}>
      <Fade
        in={show}
        style={{
          transitionDelay: show ? '200ms' : '0ms',
        }}
        timeout={500}
      >
        <LinearProgress classes={classes} />
      </Fade>
    </div>
  );
};

export default memo(FullWidthLoader);
