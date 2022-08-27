import React, {
  FC, memo,
} from 'react';

import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { User } from '../../../types/users';

import Cell from './WorkersTableCell';

interface WorkerTableProps {
  rows: Partial<User>[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
}
const COLUMN_EXTENSIONS = [
  { columnName: 'editWorker', width: 50, wordWrapEnabled: true },
];

const WorkersTable: FC<WorkerTableProps> = ({
  rows,
  columns,
  datagridOptions,
}) => (
  <DataGrid
    id="workersTable"
    rows={rows}
    columns={columns}
    tableProps={{ cellComponent: Cell, columnExtensions: COLUMN_EXTENSIONS }}
    options={datagridOptions}
  />
);

export default memo(WorkersTable);
