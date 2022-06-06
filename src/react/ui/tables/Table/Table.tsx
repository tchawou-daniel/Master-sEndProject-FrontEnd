import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { FC } from 'react';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

interface TableProps {
  className?: string;
  innerRef?: string;
}

const useStyle = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    // Compensating top and bottom for border spacing.
    margin: '-10px 0',
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
    width: '100%',

    '& > thead > tr': {
      backgroundColor: theme.palette.grey[100],

      '& > th': {
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.divider,
        padding: '18px',
        '&:first-of-type': {
          borderTopLeftRadius: theme.shape.borderRadius,
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderLeftStyle: 'solid',
        },
        '&:last-of-type': {
          borderTopRightRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
          borderRightStyle: 'solid',
        },
      },
    },

    '& > tbody > tr': {
      backgroundColor: theme.palette.common.white,
      '& > td': {
        padding: '20px',
        '&:first-of-type': {
          borderTopLeftRadius: theme.shape.borderRadius,
          borderBottomLeftRadius: theme.shape.borderRadius,
        },
        '&:last-of-type': {
          borderTopRightRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        },
      },
    },
  },
}));

const Table: FC<TableProps> = ({
  children,
  className,
  innerRef,
  ...restProps
}) => {
  const classes = useStyle();
  return (
    <div className={clsx(classes.root, className)} ref={innerRef} {...restProps}>
      <table className={classes.table}>{children}</table>
    </div>
  );
};

export default Table;
