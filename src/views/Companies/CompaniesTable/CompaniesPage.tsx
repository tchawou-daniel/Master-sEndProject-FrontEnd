import { Box, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { empreinttTheme } from 'react/ui/branding/theme';

import { fetchCompanies } from 'redux/companies/actions';
import { useThunkDispatch } from 'redux/store';

import { addCompany, getCompanies } from 'services/companies/companies.repository';

import useSnackbars from '../../../react/common/useSnackbars';
import { CompaniesFormAddModal } from '../../../react/ui/Business/companyModals/CompaniesFormAddModal';
import { TertiaryBlockButton } from '../../../react/ui/Generic/Button/Button';
import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { selectCompanies } from '../../../redux/companies/selectors';
import {
  Company,
} from '../../../types/Company';

import CompaniesTable from './CompaniesTable';

// Datagrid columns
const columns = [
  { name: 'name', title: 'name' },
  { name: 'street', title: 'street' },
  { name: 'town', title: 'town' },
  { name: 'zipCode', title: 'zipCode' },
  { name: 'companySector', title: 'companySector' },
  { name: 'companyStatus', title: 'companyStatus' },
  { name: 'country', title: 'country' },
  { name: 'description', title: 'description' },
  { name: 'hiringStatus', title: 'hiringStatus' },
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
  // grouping: {
  //   grouping: [{ columnName: 'companyName' }],
  // },
  additionalHeaderComponents: [
    {
      key: 'title',
      children: (
        <Box>All Companies</Box>
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
  const { snackSuccess, snackError } = useSnackbars();
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);

  useAsyncEffect(async () => {
    await dispatch(fetchCompanies());
  }, [dispatch]);
  const company = useSelector(selectCompanies);
  useEffect(() => {
    setAllCompanies(company);
  }, [company]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const closeAddModal = useCallback(() => setAddModalOpen(false), [setAddModalOpen]);

  const getData = useCallback(async () => {
    try {
      const res = await getCompanies();
      setAllCompanies(res);
    } catch (e) {
      snackError(e);
    }
  }, [snackError]);

  const handleValidateCompany = useCallback(async (formValues:Partial<Company>):Promise<void> => {
    const companyToAdd = {
      name: formValues.name,
      street: formValues.street,
      town: formValues.town,
      zipCode: formValues.zipCode,
      companySector: formValues.companySector,
      companyStatus: formValues.companyStatus,
      country: formValues.country,
      description: formValues.description,
      hiringStatus: formValues.hiringStatus,
    } as unknown as Company;

    try {
      await addCompany(companyToAdd);
      await getData();
      snackSuccess('Company created!');
      setAddModalOpen(false);
    } catch (e) {
      snackError(`Company not created! ${e}`);
    }
    setAddModalOpen(false);
  }, [getData, snackSuccess, snackError]);
  return (
    <>
      <Paper>
        <Box
          p={empreinttTheme.spacing(0.3)}
          display="flex"
          justifyContent="flex-end"
        >
          <TertiaryBlockButton
            startIcon={!isLoading && <Add />}
            name="createCompanies"
            onClick={() => setAddModalOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create a company'}
          </TertiaryBlockButton>
          <CompaniesFormAddModal
            isOpen={isAddModalOpen}
            onCancel={closeAddModal}
            onSubmit={handleValidateCompany}
          />
        </Box>

      </Paper>
      <Paper>

        <CompaniesTable
          rows={allCompanies || []}
          columns={columns}
          datagridOptions={DATAGRID_OPTIONS}
        />
      </Paper>
    </>

  );
};

export default memo(CompaniesPage);
