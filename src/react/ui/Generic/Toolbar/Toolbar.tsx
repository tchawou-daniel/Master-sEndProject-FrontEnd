import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC, memo, ReactNode } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  toolbar: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(0, 1),
    minHeight: theme.spacing(6.5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  leftActions: {
    marginRight: theme.spacing(2),
  },
  rightActions: {
    marginLeft: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing(3)}px`,
  },
  headerContainerWithHeaderContent: {
    marginBottom: theme.spacing(2),
  },
  separator: {
    flex: 1,
  },
}));

interface ToolbarProps {
  leftActions?: string | ReactNode;
  rightActions?: string | ReactNode;
  containerClassName?: string,
  children?: ReactNode;

}

const Toolbar: FC<ToolbarProps> = ({
  leftActions,
  rightActions,
  containerClassName,
  children,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={clsx(classes.toolbar, containerClassName)}>
      <Box className={classes.headerContainer}>
        <Box className={clsx(classes.header, children && classes.headerContainerWithHeaderContent)}>
          {leftActions && (<Box className={classes.leftActions}>{leftActions}</Box>)}
          <Box className={classes.separator} />
          {rightActions && (<Box className={classes.rightActions}>{rightActions}</Box>)}
        </Box>
      </Box>

    </Paper>
  );
};

export default memo(Toolbar);
