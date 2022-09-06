import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,

} from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import React, { FC, useCallback, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useThunkDispatch } from 'redux/store';

import { logoutCurrentUser } from '../../../../../redux/users/actions';
import { User, UserRole } from '../../../../../types/users';
import { empreinttTheme } from '../../../branding/theme';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '20px',
    marginLeft: theme.spacing(8),
    '&:hover': {
      color: 'yellow',
      borderBottom: '1px solid white',
    },
  },
  marginRight: {
    marginRight: theme.spacing(4),
  },
}));

interface EmpreinttAppBarProps {
  user?: User;
}
const EmpreinttAppBar:FC<EmpreinttAppBarProps> = ({
  user,
}) => {
  const dispatch = useThunkDispatch();

  const history = useHistory();

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfile = useCallback(() => {
    history.push('/profile');
    handleClose();
  }, [handleClose, history]);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem('MY_USER_EMAIL');
    localStorage.removeItem('MY_USER_TOKEN_INFO');
    await dispatch(logoutCurrentUser());
    handleClose();
    // history.push('/');
  }, [dispatch, handleClose]);

  const profile = useCallback(() => (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToAppIcon />
          Log out
        </MenuItem>
      </Menu>
    </>
  ), [anchorEl, handleClose, handleLogout, handleProfile, open]);

  const menu = useCallback((currentUser: User | undefined) => {
    switch (currentUser?.role) {
      case UserRole.ADMIN:
        return (
          <>
            <Link className={clsx(classes.link)} to="/companies">
              Companies
            </Link>
            <Link className={clsx(classes.link, classes.marginRight)} to="/agency">
              Agency users
            </Link>
            <Link className={clsx(classes.link, classes.marginRight)} to="/workers">
              Workers
            </Link>
            {profile()}
          </>
        );
        break;
      case UserRole.TEMPORARY_WORKER:
        return (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {profile()}
          </>
        );
        break;
      case UserRole.EMPLOYMENT_AGENCY:
        return (
          <>
            {profile()}
          </>
        );
        break;
      default:
        return (
          <Link className={clsx(classes.link, classes.marginRight)} to="/auth/register/callback">
            Mon compte
          </Link>
        );
    }
  }, [classes.link, classes.marginRight, profile]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: empreinttTheme.palette.link.main }}>
              Empreintt
            </Link>
          </Typography>
          {menu(user)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default EmpreinttAppBar;
