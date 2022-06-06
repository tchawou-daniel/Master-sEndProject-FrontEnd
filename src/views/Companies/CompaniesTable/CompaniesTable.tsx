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

const CompaniesTable: FC<CompaniesTableProps> = ({
  rows,
  columns,
  datagridOptions,
}) => (
  <DataGrid
    id="companiesTable"
    rows={rows}
    columns={columns}
    tableProps={{ cellComponent: Cell }}
    options={datagridOptions}
  />
);

export default memo(CompaniesTable);
