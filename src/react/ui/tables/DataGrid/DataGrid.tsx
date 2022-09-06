import {
  CustomPaging,
  EditingState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SearchState,
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
import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import store from 'store';

import { ReactComponent as PinOffIcon } from '../../../../images/customIcons/mdi_pin-off.svg';
import { ReactComponent as PinIcon } from '../../../../images/customIcons/mdi_pin.svg';
import { useCustomIconStyles } from '../../../common/_common';
import { DefaultActionIconButton } from '../../Generic/Button/Button';

import { DataGridProps } from './Datagrid.props';
import DataGridPlugins, { DataGridPluginDefinition, DataGridPluginPosition } from './DataGridComponents/DataGridPlugin';
import {
  DatagridSearchInput,
  InitialWidthTableComponent,
  TableComponentBase,
  TableGroupCell,
  TableHeaderCell,
  TableHeaderContent,
} from './DataGridComponents/NativeComponents';
import PageChooser from './DataGridComponents/PageChooser';
import { useDatagridStyles } from './datagridStyles';

const DataGrid: FC<DataGridProps> = ({
  id,
  columns,
  rows,
  tableProps,
  children,
  options,
}) => {
  const classes = useDatagridStyles();
  const iconClasses = useCustomIconStyles();

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

  const messages = useMemo(() => ({
    ColumnChooser: {
      showColumnChooser: 'Show Column Chooser',
    },
    SearchPanel: {
      searchPlaceholder: 'Search',
    },
    PaginationPanel: {
      showAll: 'Show all',
      rowsPerPage: 'Rows per page',
      // info: (({ from, to, count }: { from: number, to: number, count: number }) => (
      //   {  '{from}-{to} of {count}' }: { from, to, count },
      // )),
    },
    TableHeaderRow: {
      sortingHint: 'Sort',
    },
  }), []);

  // Customized Paging panel
  const customizedPagingPanel = useMemo(() => {
    const pageLength = (options?.pages?.customPagingTotalItems || rows?.length) / (options?.pages?.pageSize || pageSize);
    return (
      <PagingPanel
        pageSizes={pageSizes}
        messages={messages.PaginationPanel}
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
  }, [pageSizes, classes, currentPage, setCurrentPage, options, rows, pageSize, messages]);

  // SEARCH
  const [searchValue, setSearchState] = useState(store.get(`datagrid_${id}_searchValue`) || '');
  useEffect(() => { store.set(`datagrid_${id}_searchValue`, searchValue); }, [searchValue, id]);

  // HIDDEN COLUMNS
  const [hiddenColumnNames, onHiddenColumnNamesChange] = useState(store.get(`datagrid_${id}_hiddenColumns`) || []);
  useEffect(() => { store.set(`datagrid_${id}_hiddenColumns`, hiddenColumnNames); }, [hiddenColumnNames, id]);

  useEffect(() => {
    if (currentPage > (rows.length / pageSize)) {
      setCurrentPage(0);
    }
  }, [rows, pageSize, currentPage]);

  // FIXED COLUMNS
  const [isFirstColumnPinned, setFirstColumnPinned] = useState<boolean>(!!options?.fixed?.pinnableFirstColumn);

  const fixedColumns = useMemo(
    () => ([
      ...(options?.fixed?.fixedColumns || []),
      isFirstColumnPinned ? (columns?.[0]?.name || '') : '',
    ]),
    [options?.fixed, columns, isFirstColumnPinned],
  );

  // FIXED COLUMNS
  const toggleFirstColumnPinned = useCallback(() => setFirstColumnPinned(p => !p), []);

  // HEADER COMPONENTS
  const headerComponents: DataGridPluginDefinition[] = useMemo(() => {
    const pinLabel = isFirstColumnPinned
      ? 'Unpin first column'
      : 'Pin first column';
    return ([
      ...(options?.fixed?.pinnableFirstColumn ? [{
        key: 'pinnableFirstColumn',
        children: (
          <DefaultActionIconButton
            onClick={toggleFirstColumnPinned}
            tooltipTitle={pinLabel}
            aria-label={pinLabel}
          >
            {isFirstColumnPinned ? (<PinOffIcon className={iconClasses.customIcon} />) : (<PinIcon className={iconClasses.customIcon} />)}
          </DefaultActionIconButton>
        ),
        position: DataGridPluginPosition.rightEnd,
      }] : []),
      ...(options?.additionalHeaderComponents || []).map(ahc => ({ key: ahc.key, children: ahc.children, position: ahc.position })),
    ]);
  }, [options?.additionalHeaderComponents, isFirstColumnPinned, options?.fixed?.pinnableFirstColumn,
    toggleFirstColumnPinned, iconClasses]);

  return (
    <Grid
      rows={rows}
      // @ts-expect-error -- Problem of typing but datagrid actually accepts ReactElements.
      columns={columns}
      getCellValue={options?.getCellValue}
      getRowId={options?.getRowId}
    >
      {!options?.dontRenderToolbar && (<Toolbar />)}

      {options?.sort?.sortable && (<SortingState sorting={sorting} onSortingChange={setSorting} {...options?.sort} />)}

      {options?.search?.searchable && (<SearchState value={searchValue} onValueChange={setSearchState} {...options?.search} />)}
      {options?.search?.searchable && !options?.dontRenderToolbar && (
        <SearchPanel inputComponent={DatagridSearchInput} messages={messages.SearchPanel} />
      )}
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
        <IntegratedSorting columnExtensions={options.sort.integratedColumnExtensions} />
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
      {options?.columnVisibility?.active && !options?.columnVisibility?.disableColumnChooser && (
        <ColumnChooser messages={messages.ColumnChooser} />
      )}

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

      {options?.grouping && (<TableGroupRow cellComponent={options?.tableGroupRowComponent || TableGroupCell} />)}

      <TableHeaderRow
        showSortingControls={options?.sort?.sortable && !options.sort.disableSortingControls}
        cellComponent={options?.tableHeaderRowComponent || TableHeaderCell}
        contentComponent={TableHeaderContent}
        messages={messages.TableHeaderRow}
      />
      {(fixedColumns) && (<TableFixedColumns leftColumns={fixedColumns} />)}
      <DataGridPlugins plugins={Object.values(headerComponents || [])} />

    </Grid>
  );
};

export default DataGrid;
