import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC, memo } from 'react';

import { NavbarBrandColoured } from 'react/ui/branding/logo';
import { EmpreinttThemeType } from 'react/ui/branding/theme';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  navbar: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px 0',
  },
}));

export const NavbarLandingPage: FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navbar}>
      <NavbarBrandColoured />
    </AppBar>
  );
};

export default memo(NavbarLandingPage);
