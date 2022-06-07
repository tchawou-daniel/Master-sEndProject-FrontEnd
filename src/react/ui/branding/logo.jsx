import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

// Using relative path because eslint doesn't seems to find svg with absolute path.
import { ReactComponent as SvgLogo } from '../../../assets/images/customIcons/logo.svg';
import { ReactComponent as SvgLogoColoured } from '../../../assets/images/customIcons/logoColoured.svg';

const useStyles = makeStyles((theme) => ({
  title: {
    verticalAlign: 'middle',
    marginLeft: '10px',
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '56px',
    color: theme.palette.secondary.main,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export const NavbarBrandLight = () => {
  const classes = useStyles();
  return (
    <>
      <SvgLogo style={{ width: 48 }} />
      <span className={classes.title}>Empreint</span>
    </>
  );
};

export const NavbarBrandColoured = () => {
  const classes = useStyles();
  return (
    <>
      <SvgLogoColoured style={{ width: 48 }} />
      <span className={classes.title}>Empreint</span>
    </>
  );
};
