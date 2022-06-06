import React, {
  FC, memo,
} from 'react';

import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { Company } from '../../../types/Company';

import Cell from './CompaniesTableCell';

interface CompaniesTableProps {
  rows: Company[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
}

const COLUMN_EXTENSIONS = [
  { columnName: 'company_name', width: 180, wordWrapEnabled: true },
  { columnName: 'planTemplateGeneratedDate', width: 180, wordWrapEnabled: true },
  { columnName: 'time', width: 180, wordWrapEnabled: true },
  { columnName: 'recursionLevel', width: 180, wordWrapEnabled: true },
];

const CompaniesTable: FC<CompaniesTableProps> = ({
  rows,
  columns,
  datagridOptions,
}) => (
  <DataGrid
    id="plansTable"
    rows={rows}
    columns={columns}
    tableProps={{ cellComponent: Cell, columnExtensions: COLUMN_EXTENSIONS }}
    options={datagridOptions}
  />
);

export default memo(CompaniesTable);
