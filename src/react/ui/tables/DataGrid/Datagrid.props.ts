import {
  ChangeSet,
  EditingState,
  GroupingStateProps,
  IntegratedSorting,
  Sorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  TableHeaderRow,
  TableColumnVisibility,
  TableGroupRow,
} from '@devexpress/dx-react-grid-material-ui';
import React, { ReactNode } from 'react';

import { DataConnectorObjectField } from '../../../../types/dataConnector';

import { DataGridPluginDefinition } from './DataGridComponents/DataGridPlugin';

// PROPS
interface DataGridPropsOptionsPages {
// Is table pagineable?
  paginable?: boolean;
  // Show the virtual total number of items when all items are not loaded
  customPagingTotalItems?: number;
  // Overrides on paging state props for currentPage and pageSize handlers
  currentPage?: number;
  onCurrentPageChange?: (currentPage: number) => void;
  pageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  overridePageSizeOptions?: number[];
}

interface DataGridPropsOptionsSearch {
  // Is table searchable?
  searchable?: boolean;
  // Is search managed in parent ?
  overwriteSearch?: boolean;
  // Override default search handlers if all values are not loaded
  value?: string;
  onValueChange?: (value: string) => void;
}

interface DataGridPropsOptionsSort {
  // Is table sortable?
  sortable?: boolean;
  // Is sorting managed in parent ?
  overwriteSort?: boolean;
  // Column extensions to disable sort on some of them
  columnExtensions?: SortingState.ColumnExtension[];
  // integratedColumnExtensions
  integratedColumnExtensions?: IntegratedSorting.ColumnExtension[];
  // Set default sorting of the table (might be overriden by user's settings)
  defaultSorting?: Sorting[];
  // Permits to disable user's interaction on sort
  disableSortingControls?: boolean;
  // Overriding sort handlers if all values are not loaded
  sorting?: Array<Sorting>;
  onSortingChange?: (sorting: Array<Sorting>) => void;
}

interface DataGridPropsOptionsColumnVisibility {
  // Has user the choice to hide some columns?
  active?: boolean;
  // Disable column chooser permits to activate column visibility in full control
  disableColumnChooser?: boolean;
  // hiddenColumns handlers
  hiddenColumnNames?: Array<string>;
  onHiddenColumnNamesChange?: (hiddenColumnNames: Array<string>) => void;
  columnExtensions?: Array<TableColumnVisibility.ColumnExtension>;
}

interface DataGridPropsOptionsCellEdit {
  active?: boolean,
  createRowChange?: (row: any, value: string | number, columnName: string) => any;
  onCommitChanges?: (changes: ChangeSet) => void;
  columnExtensions?: Array<EditingState.ColumnExtension>;
  defaultEditingRowIds?: Array<number | string>;
}

interface DataGridPropsOptionsFixed {
  // Fix the columns. These would be pushed to the left
  fixedColumns?: string[];
  // Show icon that pins / unpins the first column
  pinnableFirstColumn?: boolean;
}

export interface DataGridPropsOptions {
  pages?: DataGridPropsOptionsPages;
  search?: DataGridPropsOptionsSearch;
  sort?: DataGridPropsOptionsSort;
  columnVisibility?: DataGridPropsOptionsColumnVisibility;
  cellEdit?: DataGridPropsOptionsCellEdit;
  fixed?: DataGridPropsOptionsFixed;
  grouping?: GroupingStateProps;
  additionalHeaderComponents?: DataGridPluginDefinition[];
  // Provide a global getter for the cell value.
  getCellValue?: (row: any, columnName: any) => string;
  getRowId?: (field: DataConnectorObjectField) => string;
  // dataGrid take full width without overflow
  fullWidth?: boolean;
  // Don't render the toolbar
  // Warning: passing true and activating plugins may break everything!
  dontRenderToolbar?: boolean;
  // Possibiltiy to overwrite the TableHeaderRow component
  tableHeaderRowComponent?: React.ComponentType<TableHeaderRow.CellProps>;
  tableGroupRowComponent?: React.ComponentType<TableGroupRow.CellProps>;
}

export interface DataGridProps {
  id: string;
  columns: { name: string; title: string | ReactNode, subTitle?: string }[];
  rows: any;
  tableProps?: any;
  currencyColumns?: string[];

  options?: DataGridPropsOptions;
}
