import { Box, Paper } from '@material-ui/core';
import React, { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { fetchCompany, patchCompany } from 'redux/companies/actions';
import { useThunkDispatch } from 'redux/store';

import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { selectCompany } from '../../../redux/companies/selectors';

import CompaniesTable from './CompaniesTable';

// Datagrid columns
const columns = [
  { name: 'companyName', title: 'Company' },
  { name: 'id', title: 'Identifier' },
  { name: 'name', title: 'Name' },
  { name: 'planTemplateGeneratedDate', title: 'Last Modification' },
  { name: 'time', title: 'Time' },
  { name: 'recursionLevel', title: 'Recursion Level' },
];

const DATAGRID_OPTIONS: DataGridPropsOptions = {
  pages: {
    paginable: true,
  },
  columnVisibility: {
    active: true,
  },
  sort: {
    sortable: true,
  },
  grouping: {
    grouping: [{ columnName: 'companyName' }],
  },
  additionalHeaderComponents: [
    {
      key: 'title',
      children: (
        <Box>All plans</Box>
      ),
      position: DataGridPluginPosition.rightStart,
    },
  ],
  fullWidth: true,
  tableHeaderRowComponent: SmallerHeaderCellComponent,
  tableGroupRowComponent: SmallerGroupCellComponent,
};

const CompaniesPage: FC = () => {
  const dispatch = useThunkDispatch();

  useAsyncEffect(async () => {
    await dispatch(fetchCompany());
  }, [dispatch]);

  // use selector in order to retrieve some companies with redux
  const companies = useSelector(selectCompany);
  console.log(companies);

  return (
    <Paper>
      <CompaniesTable
        rows={companies}
        columns={columns}
        datagridOptions={DATAGRID_OPTIONS}
      />
    </Paper>
  );
};

export default memo(CompaniesPage);
