import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  ChangeSet,
  CustomPaging,
  EditingState, GroupingState,
  GroupingStateProps,
  IntegratedFiltering, IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SearchState,
  Sorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
  ColumnChooser,
  TableColumnVisibility,
  TableInlineCellEditing,
  TableGroupRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import { TableProps } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import store from 'store';

import { empreinttTheme, EmpreinttThemeType, colors } from 'react/ui/branding/theme';

import { DataConnectorObjectField } from '../../../../types/dataConnector';

import PageChooser from './DataGridComponents/PageChooser';

const SearchInput = ({ ...restProps }) => (
  // @ts-ignore
  <SearchPanel.Input
    {...restProps}
    className="datagrid-search-input"
  />
);

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    '& thead tr th:first-child': {
      backgroundColor: colors['brown-100'],
    },
    '& tbody tr td:first-child, & thead tr th:first-child': {
      paddingLeft: '45px',
    },
    '& tbody tr td': {
      padding: '26px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontSize: '12px',
      lineHeight: '150%',
      alignItems: 'center',
      border: 'none',
    },
    backgroundColor: 'white',
  },
  autoWidth: {
    width: 'initial',
  },
  header: {
    padding: '26px',
    backgroundColor: colors['brown-100'],
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    border: 'none',
    minWidth: 0,
    whiteSpace: 'pre-line',
  },
  headerCellContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  subTitle: {
    fontSize: '0.8rem',
    width: '100%',
    color: theme.palette.grey['200'],
  },
  pagingPanelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

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

export interface DataGridProps {
  id: string;
  columns: { name: string; title: string | ReactElement, subTitle?: string }[];
  rows: any;
  tableProps?: any;
  currencyColumns?: string[];

  options?: {
    pages?: {
      // Is table pagineable?
      paginable?: boolean,
      // Show the virtual total number of items when all items are not loaded
      customPagingTotalItems?: number,
      // Overrides on paging state props for currentPage and pageSize handlers
      currentPage?: number,
      onCurrentPageChange?: (currentPage: number) => void,
      pageSize?: number,
      onPageSizeChange?: (pageSize: number) => void,
      overridePageSizeOptions?: number[],
    },
    search?: {
      // Is table searchable?
      searchable?: boolean,
      // Is search managed in parent ?
      overwriteSearch?: boolean,
      // Override default search handlers if all values are not loaded
      value?: string,
      onValueChange?: (value: string) => void,
    },
    sort?: {
      // Is table sortable?
      sortable?: boolean,
      // Is sorting managed in parent ?
      overwriteSort?: boolean,
      // Column extensions to disable sort on some of them
      columnExtensions?: SortingState.ColumnExtension[],
      // integratedColumnExtensions
      integratedColumnExtensions?: IntegratedSorting.ColumnExtension[],
      // Set default sorting of the table (might be overriden by user's settings)
      defaultSorting?: Sorting[],
      // Permits to disable user's interaction on sort
      disableSortingControls?: boolean,
      // Overriding sort handlers if all values are not loaded
      sorting?: Array<Sorting>,
      onSortingChange?: (sorting: Array<Sorting>) => void,
    },
    columnVisibility?: {
      // Has user the choice to hide some columns?
      active?: boolean,
      // Disable column chooser permits to activate column visibility in full control
      disableColumnChooser?: boolean;
      // hiddenColumns handlers
      hiddenColumnNames?: Array<string>,
      onHiddenColumnNamesChange?: (hiddenColumnNames: Array<string>) => void,
      columnExtensions?: Array<TableColumnVisibility.ColumnExtension>
    },
    cellEdit?: {
      active?: boolean,
      createRowChange?: (row: any, value: string | number, columnName: string) => any,
      onCommitChanges?: (changes: ChangeSet) => void,
      columnExtensions?: Array<EditingState.ColumnExtension>,
      defaultEditingRowIds?: Array<number | string>,
    },
    // Fixed columns and rows
    fixed?: {
      fixedColumns?: string[],
    },
    grouping?: GroupingStateProps,
    additionalHeaderComponents?: Record<string, ReactNode>,
    // Provide a global getter for the cell value.
    getCellValue?: (row: any, columnName: any) => string;
    getRowId?: (field: DataConnectorObjectField) => string;
    // dataGrid take full width without overflow
    fullWidth?: boolean,
    // Don't render the toolbar
    // Warning: passing true and activating plugins may break everything!
    dontRenderToolbar?: boolean,
    // Possibiltiy to overwrite the TableHeaderRow component
    tableHeaderRowComponent?: React.ComponentType<TableHeaderRow.CellProps>,
    tableGroupRowComponent?: React.ComponentType<TableGroupRow.CellProps>,
  };
}

export const TableHeaderCell: FC<TableHeaderRow.CellProps> = ({ column, children, ...restProps }) => {
  const classes = useStyles();
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
  const classes = useStyles();
  return (
    <TableGroupRow.Cell column={column} {...restProps} className={classes.header}>
      {children}
    </TableGroupRow.Cell>
  );
};

export const TableHeaderContent: FC<TableHeaderRow.ContentProps> = (props) => {
  const classes = useStyles();

  // @ts-expect-error -- Not in datagrid types but we can add it into columns definitions.
  const subTitle = props.column.subTitle;

  return (
    <TableHeaderRow.Content {...props} className={classes.headerCellContent}>
      {props.children}
      {subTitle && (<div className={classes.subTitle}>{subTitle}</div>)}
    </TableHeaderRow.Content>
  );
};

export const TableComponentBase: FC<TableProps> = ({ classes, ...restProps }) => {
  const ownClasses = useStyles();
  return <Table.Table {...restProps} className={clsx(ownClasses.root, classes?.root, 'datagrid')} />;
};

// DataGrid on fullWidth
export const InitialWidthTableComponent = withStyles({
  root: {
    width: 'initial',
    minWidth: '100% !important',
  },
})(TableComponentBase);

const DataGrid: FC<DataGridProps> = ({
  id,
  columns,
  rows,
  tableProps,
  children,
  options,
}) => {
  const classes = useStyles();

  // SORTING
  const [sorting, setSorting] = useState<any[]>(store.get(`datagrid_${id}_sorting`) || options?.sort?.defaultSorting || []);
  useEffect(() => {
    if (!options?.sort?.overwriteSort) {
      store.set(`datagrid_${id}_sorting`, sorting);
    }
  }, [sorting, id, options]);

  // PAGINABLE
  const [currentPage, setCurrentPage] = useState(0);

  const pageSizes = useMemo(() => options?.pages?.overridePageSizeOptions || [5, 10, 20, 50, 100], [options]);
  const [pageSize, setPageSize] = useState(store.get(`datagrid_${id}_pageSize`) || 10);
  useEffect(() => { store.set(`datagrid_${id}_pageSize`, pageSize); }, [pageSize, id]);

  // Customized Paging panel
  const customizedPagingPanel = useMemo(() => {
    const pageLength = (options?.pages?.customPagingTotalItems || rows?.length || 0) / (options?.pages?.pageSize || pageSize);
    return (
      <PagingPanel
        pageSizes={pageSizes}
        containerComponent={props => (
          <div className={classes.pagingPanelContainer}>
            <PagingPanel.Container {...props}>
              {props.children}
            </PagingPanel.Container>
            {/* If we have less than 5 pages, hide page chooser */}
            {(pageLength > 5) && (
              <PageChooser
                currentPage={options?.pages?.currentPage || currentPage}
                setCurrentPage={(val: number) => {
                  (options?.pages?.onCurrentPageChange || setCurrentPage)(val);
                }}
              />
            )}
          </div>
        )}
      />
    );
  }, [pageSizes, classes, currentPage, setCurrentPage, options, rows, pageSize]);

  // SEARCH
  const [searchValue, setSearchState] = useState(store.get(`datagrid_${id}_searchValue`) || '');
  useEffect(() => { store.set(`datagrid_${id}_searchValue`, searchValue); }, [searchValue, id]);

  // HIDDEN COLUMNS
  const [hiddenColumnNames, onHiddenColumnNamesChange] = useState(store.get(`datagrid_${id}_hiddenColumns`) || []);
  useEffect(() => { store.set(`datagrid_${id}_hiddenColumns`, hiddenColumnNames); }, [hiddenColumnNames, id]);

  const renderPlugin = useCallback(([key, node]) => (
    <Plugin name={key} key={key}>
      <Template name="toolbarContent">
        {node.children}
        <TemplatePlaceholder />
      </Template>
    </Plugin>
  ), []);

  useEffect(() => {
    if (currentPage > (rows?.length / pageSize)) {
      setCurrentPage(0);
    }
  }, [rows, pageSize, currentPage]);

  return (
    <Grid
      rows={rows || []}
      // @ts-expect-error -- Problem of typing but datagrid actually accepts ReactElements.
      columns={columns}
      getCellValue={options?.getCellValue}
      getRowId={options?.getRowId}
    >
      {!options?.dontRenderToolbar && (<Toolbar />)}

      {options?.sort?.sortable && (<SortingState sorting={sorting} onSortingChange={setSorting} {...options?.sort} />)}

      {options?.search?.searchable && (<SearchState value={searchValue} onValueChange={setSearchState} {...options?.search} />)}
      {options?.search?.searchable && !options?.dontRenderToolbar && (<SearchPanel inputComponent={SearchInput} />)}
      {options?.search?.searchable && !options?.search?.overwriteSearch && (<IntegratedFiltering />)}

      {options?.grouping && (
        <GroupingState
          grouping={options?.grouping.grouping}
          defaultExpandedGroups={options?.grouping.defaultExpandedGroups}
          onExpandedGroupsChange={options?.grouping.onExpandedGroupsChange}
        />
      )}
      {options?.grouping && <IntegratedGrouping />}

      {options?.sort?.sortable && !options?.sort?.overwriteSort && (
        <IntegratedSorting
          columnExtensions={options.sort.integratedColumnExtensions}
        />
      )}

      {options?.pages?.paginable && pageSize && (
        <PagingState
          currentPage={currentPage}
          onCurrentPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          {...options.pages}
        />
      )}
      {options?.pages?.paginable && options?.pages?.customPagingTotalItems != null
      && (<CustomPaging totalCount={options.pages.customPagingTotalItems} />)}

      {options?.pages?.paginable && pageSize && !options?.pages?.customPagingTotalItems && <IntegratedPaging />}
      {options?.pages?.paginable && pageSize && customizedPagingPanel}

      <Table tableComponent={options?.fullWidth ? TableComponentBase : InitialWidthTableComponent} {...tableProps} />

      {options?.columnVisibility?.active && (
        <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames || []}
          onHiddenColumnNamesChange={onHiddenColumnNamesChange}
          {...options.columnVisibility}
        />
      )}
      {options?.columnVisibility?.active && !options?.columnVisibility?.disableColumnChooser && (<ColumnChooser />)}

      {options?.cellEdit?.active && options?.cellEdit?.onCommitChanges && (
        <EditingState
          onCommitChanges={options.cellEdit.onCommitChanges}
          createRowChange={options.cellEdit.createRowChange}
          columnExtensions={options.cellEdit.columnExtensions || []}
          defaultEditingRowIds={options.cellEdit.defaultEditingRowIds || []}
        />
      )}

      {options?.cellEdit?.active && options?.cellEdit?.onCommitChanges && (<TableInlineCellEditing startEditAction="click" selectTextOnEditStart />)}

      {children}

      {options?.grouping && (
        <TableGroupRow
          cellComponent={options?.tableGroupRowComponent || TableGroupCell}
        />
      )}

      <TableHeaderRow
        showSortingControls={options?.sort?.sortable && !options.sort.disableSortingControls}
        cellComponent={options?.tableHeaderRowComponent || TableHeaderCell}
        contentComponent={TableHeaderContent}
      />
      {(options?.fixed?.fixedColumns) && (
        <TableFixedColumns
          leftColumns={options.fixed.fixedColumns}
        />
      )}

      {Object.entries(options?.additionalHeaderComponents || {}).map(renderPlugin)}
    </Grid>
  );
};

export default DataGrid;
