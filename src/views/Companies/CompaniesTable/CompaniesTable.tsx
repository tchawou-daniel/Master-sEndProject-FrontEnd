import React, {
  FC, memo,
} from 'react';

import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { Company } from '../../../types/Company';

import Cell from './CompaniesTableCell';

interface CompaniesTableProps {
  rows: Partial<Company>[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
}
const COLUMN_EXTENSIONS = [
  { columnName: 'editCompany', width: 50, wordWrapEnabled: true },
];

const CompaniesTable: FC<CompaniesTableProps> = ({
  rows,
  columns,
  datagridOptions,
}) => (
  <DataGrid
    id="companiesTable"
    rows={rows}
    columns={columns}
    tableProps={{ cellComponent: Cell, columnExtensions: COLUMN_EXTENSIONS }}
    options={datagridOptions}
  />
);

export default memo(CompaniesTable);
