import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { User, UserRole } from '../../../../../types/users';
import { empreinttTheme } from '../../../theme';

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
  rigthMargin: {
    marginRight: theme.spacing(4),
  },
}));

interface EmpreinttAppBarProps {
  user?: User;
}
const EmpreinttAppBar:FC<EmpreinttAppBarProps> = ({
  user,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // eslint-disable-next-line consistent-return
  const menu = (currentUser: User | undefined) => {
    console.log(user);
    switch (currentUser?.role) {
      case UserRole.ADMIN:
        return (
          <div>
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        );
        break;
      case UserRole.TEMPORARY_WORKER:
        break;
      default:
        return (
          <Link className={clsx(classes.link, classes.rigthMargin)} to="/auth/register/callback">
            Compte
          </Link>
        );
    }
  };

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
