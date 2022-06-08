import {
  Box, Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { memo, FC } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';
import { Avatar } from 'react/ui/Generic/Avatar';

import { formatUserFullName } from 'services/users/users.service';

import { User } from '../../types/users';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
  },
  avatar: {
    color: theme.palette.common.white,
    fontWeight: 'bold',
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: `0 ${theme.spacing(1.5)}px`,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  inactiveUsers: {
    color: theme.palette.grey['600'],
  },
  grayedAvatar: {
    filter: 'grayscale(1)',
  },
}));

interface CompanyAvatarProps {
  user: User;
}

export const CompanyAvatar: FC<CompanyAvatarProps> = memo(({ user }) => {
  const classes = useStyles();

  if (!user) {
    return null;
  }

  return (
    <Box className={classes.root}>
      <Avatar user={user} className={user.clearedAt ? `${classes.avatar} ${classes.grayedAvatar}` : classes.avatar} />
      <Tooltip title={formatUserFullName(user)} className={clsx(user.clearedAt && classes.inactiveUsers)}>
        <p>{user.firstName}</p>
      </Tooltip>
    </Box>
  );
});
