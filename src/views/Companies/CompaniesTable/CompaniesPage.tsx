import { Box, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { empreinttTheme } from 'react/ui/branding/theme';

import { deleteCompany, fetchCompanies } from 'redux/companies/actions';
import { useThunkDispatch } from 'redux/store';

import { addCompany, getCompanies, updateCompany } from 'services/companies/companies.repository';

import useSnackbars from '../../../react/common/useSnackbars';
import CompanyConfigurationForm from '../../../react/ui/Business/Company/CompanyConfigurationForm/CompanyConfigurationForm';
import { CompanyFormAddModal } from '../../../react/ui/Business/Company/companyModals/CompanyFormAddModal';
import { TertiaryBlockButton } from '../../../react/ui/Generic/Button/Button';
import { CheckboxFieldBase } from '../../../react/ui/Generic/formElements/Checkbox/CheckboxField';
import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { selectCompanies } from '../../../redux/companies/selectors';
import { Company, CompanyStatus, HiringStatus } from '../../../types/Company';

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
  { name: 'actions', title: 'Actions' },
];

const CompaniesPage: FC = () => {
  const dispatch = useThunkDispatch();
  const { snackSuccess, snackError } = useSnackbars();
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [showDeactivatedCompanies, setShowDeactivatedCompanies] = useState(false);
  const [showHiringCompanies, setShowHiringCompanies] = useState(false);

  useAsyncEffect(async () => {
    await dispatch(fetchCompanies());
  }, [dispatch]);
  const companies = useSelector(selectCompanies);

  const getValuesWithFilter = useCallback(
    (companiesLoaded:Company[]) => (showDeactivatedCompanies
      ? (showHiringCompanies
        ? companiesLoaded.filter(company => company.companyStatus === CompanyStatus.INACTIVE)
          .filter(companyHiring => companyHiring.hiringStatus === HiringStatus.ONGOING)
        : companiesLoaded.filter(company => company.companyStatus === CompanyStatus.INACTIVE))
      : (showHiringCompanies
        ? companiesLoaded.filter(companyHiring => companyHiring.hiringStatus === HiringStatus.ONGOING)
        : companiesLoaded)),
    [showDeactivatedCompanies, showHiringCompanies],
  );

  useEffect(() => {
    setAllCompanies(getValuesWithFilter(companies));
  }, [companies, getValuesWithFilter]);

  const [isLoading] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const closeAddModal = useCallback(() => setAddModalOpen(false), [setAddModalOpen]);

  const DATAGRID_OPTIONS: DataGridPropsOptions = useMemo(() => ({
    pages: {
      paginable: true,
    },
    columnVisibility: {
      active: true,
    },
    sort: {
      sortable: true,
    },
    search: {
      searchable: true,
    },
    additionalHeaderComponents: [
      {
        key: 'showFilterButton',
        children: (
          <>
            <Box>
              <CheckboxFieldBase
                name="show-deactivated-companies"
                label="Show deactivated companies"
                color="primary"
                value={showDeactivatedCompanies}
                onChange={() => setShowDeactivatedCompanies(!showDeactivatedCompanies)}
              />
            </Box>
            <Box>
              <CheckboxFieldBase
                name="show-hiring-ongoing"
                label="Show hiring ongoing"
                color="primary"
                value={showHiringCompanies}
                onChange={() => setShowHiringCompanies(!showHiringCompanies)}
              />
            </Box>
          </>
        ),
        position: DataGridPluginPosition.rightStart,
      },
    ],

    tableHeaderRowComponent: SmallerHeaderCellComponent,
    tableGroupRowComponent: SmallerGroupCellComponent,
  }), [showDeactivatedCompanies, showHiringCompanies]);

  const getData = useCallback(async () => {
    try {
      const loadCompanies = await getCompanies();
      setAllCompanies(getValuesWithFilter(loadCompanies));
    } catch (e) {
      snackError(e);
    }
  }, [getValuesWithFilter, snackError]);

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

  // Pass null to open in creation mode.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const handleCancel = useCallback(() => setIsFormOpen(false), [setIsFormOpen]);

  const openForm = useCallback((companyDefinition: Company | null) => {
    setIsFormOpen(true);
    setSelectedCompany(companyDefinition);
  }, [setIsFormOpen, setSelectedCompany]);
  const handleDeleteCompany = useCallback(async (companyId: string) => {
    await dispatch(deleteCompany(companyId));
  }, [dispatch]);

  const listActions = useMemo(() => ({
    onClickEdit: openForm,
    onClickDelete: handleDeleteCompany,
  }), [openForm, handleDeleteCompany]);

  const handleEditCompany = useCallback(async (formValues:Partial<Company>):Promise<void> => {
    const companyToEdit = {
      id: formValues.id,
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
      await updateCompany(companyToEdit);
      await getData();
      snackSuccess('Company updated!');
      setIsFormOpen(false);
    } catch (e) {
      snackError(`Company not updated! ${e}`);
    }
    setIsFormOpen(false);
  }, [getData, snackSuccess, snackError]);

  return (
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
        <CompanyFormAddModal
          isOpen={isAddModalOpen}
          onCancel={closeAddModal}
          onSubmit={handleValidateCompany}
        />
      </Box>

      <CompaniesTable
        rows={allCompanies || []}
        columns={columns}
        datagridOptions={DATAGRID_OPTIONS}
        actions={listActions}
      />
      <CompanyConfigurationForm
        company={selectedCompany}
        isOpen={isFormOpen}
        handleCancel={handleCancel}
        handleSubmit={handleEditCompany}
      />
    </Paper>

  );
};

export default memo(CompaniesPage);
