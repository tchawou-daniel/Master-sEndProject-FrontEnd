import { makeStyles } from '@material-ui/core/styles';
import { DragHandle } from '@material-ui/icons';
import clsx from 'clsx';
import React, { FC } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

interface ListProps {
  className?: string;
  innerRef?: any;
  mode?: 'horizontalWrap' | 'horizontalNoWrap' | 'vertical';
}

interface ListElementProps {
  header?: boolean;
  className?: string;
  innerRef?: any;
  handleProps?: any;
}

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  list: {
    width: '100%',
  },
  horizontal: {
    display: 'flex',
    '& $listElement': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  horizontalWrap: {
    flexWrap: 'wrap',
  },
  horizontalNoWrap: {
    maxWidth: '100%',
    overflow: 'auto',
  },
  listElement: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
  },
  handle: {
    '& > svg': {
      transform: 'rotate(90deg)',
      color: theme.palette.divider,
      verticalAlign: 'bottom',
    },
    marginLeft: theme.spacing(-1),
  },
  listHeader: {
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export const ListElement: FC<ListElementProps> = ({
  children,
  className,
  header,
  innerRef,
  handleProps,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.listElement, header && classes.listHeader, className)} ref={innerRef} {...props}>
      {handleProps && (
        <span className={classes.handle} {...handleProps}>
          <DragHandle />
        </span>
      )}
      {children}
    </div>
  );
};

export const List: FC<ListProps> = ({
  children,
  className,
  mode,
  innerRef,
  ...props
}) => {
  const classes = useStyles();
  return (
    <div
      className={clsx(
        classes.list,
        (mode === 'horizontalWrap' || mode === 'horizontalNoWrap') && classes.horizontal,
        mode === 'horizontalWrap' && classes.horizontalWrap,
        mode === 'horizontalNoWrap' && classes.horizontalNoWrap,
        className,
      )}
      ref={innerRef}
      {...props}
    >
      {children}
    </div>
  );
};
