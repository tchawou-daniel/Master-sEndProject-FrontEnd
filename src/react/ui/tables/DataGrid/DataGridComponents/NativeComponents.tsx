import {
  SearchPanel, Table, TableGroupRow, TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { TableProps } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {
  FC, useMemo,
} from 'react';

import { empreinttTheme } from 'react/ui/branding/theme';

import { useDatagridStyles } from '../datagridStyles';

// SEARCH
export const DatagridSearchInput = ({ ...restProps }) => (
  // @ts-ignore
  <SearchPanel.Input
    {...restProps}
    className="datagrid-search-input"
  />
);

// CELLS
export const SmallerGroupCellComponent = (props: any) => {
  const styles = useMemo(() => ({
    padding: empreinttTheme.spacing(1),
  }), []);

  return (
    <TableGroupRow.Cell
      {...props}
      style={styles}
    />
  );
};

export const SmallerHeaderCellComponent = (props: any) => {
  const styles = useMemo(() => ({
    padding: empreinttTheme.spacing(1),
    color: empreinttTheme.palette.secondary.main,
    fontWeight: 600,
  }), []);

  return (
    <TableHeaderRow.Cell
      {...props}
      style={styles}
    />
  );
};

export const TableHeaderCell: FC<TableHeaderRow.CellProps> = ({ column, children, ...restProps }) => {
  const classes = useDatagridStyles();
  return (
    <TableHeaderRow.Cell
      column={column}
      {...restProps}
      className={clsx((restProps as any).className, classes.header)}
    >
      {children}
    </TableHeaderRow.Cell>
  );
};

export const TableGroupCell: FC<TableGroupRow.CellProps> = ({ column, children, ...restProps }) => {
  const classes = useDatagridStyles();
  return (
    <TableGroupRow.Cell column={column} {...restProps} className={classes.header}>
      {children}
    </TableGroupRow.Cell>
  );
};

// HEADER
export const TableHeaderContent: FC<TableHeaderRow.ContentProps> = (props) => {
  const classes = useDatagridStyles();

  // @ts-expect-error -- Not in datagrid types but we can add it into columns definitions.
  const subTitle = props.column.subTitle;

  return (
    <TableHeaderRow.Content {...props} className={classes.headerCellContent}>
      {props.children}
      {subTitle && (<div className={classes.subTitle}>{subTitle}</div>)}
    </TableHeaderRow.Content>
  );
};

// TABLES
export const TableComponentBase: FC<TableProps> = ({ classes, ...restProps }) => {
  const ownClasses = useDatagridStyles();
  return <Table.Table {...restProps} className={clsx(ownClasses.root, classes?.root, 'datagrid')} />;
};

// DataGrid on fullWidth
export const InitialWidthTableComponent = withStyles({
  root: {
    width: 'initial',
    minWidth: '100% !important',
  },
})(TableComponentBase);
