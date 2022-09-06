import { Box, Paper } from '@material-ui/core';
import { Add, KeyboardBackspace } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { COMMON_MESSAGES } from '../../../react/common/messages';
import useSnackbars from '../../../react/common/useSnackbars';
import { empreinttTheme } from '../../../react/ui/branding/theme';
import { CompanyUsersAddModal } from '../../../react/ui/Business/CompanyUsersContainer/CompanyUsersAddModal';
import { CompanyUsersAssignModal } from '../../../react/ui/Business/CompanyUsersContainer/CompanyUsersAssignUserModal';
import CompanyUsersEditModal from '../../../react/ui/Business/CompanyUsersContainer/CompanyUsersEditModal';
import { IconButton, TertiaryBlockButton } from '../../../react/ui/Generic/Button/Button';
import { CheckboxFieldBase } from '../../../react/ui/Generic/formElements/Checkbox/CheckboxField';
import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { useThunkDispatch } from '../../../redux/store';
import { fetchCompanyUsers } from '../../../redux/usersWorkerForCompanies/actions';
import { selectCompanyUsers } from '../../../redux/usersWorkerForCompanies/selectors';
import { deleteWorker } from '../../../redux/workers/actions';
import {
  createAnUser,
  createAnUserForTheCurrentCompany,
  getCompanyUsers,
} from '../../../services/UsersWorkForCompanies/usersWorkForCompanies.repository';
import { getWorkers, updateWorker } from '../../../services/workers/workers.repository';
import { User } from '../../../types/users';

import CompanyUsersTable from './CompanyUsersTable';

// Datagrid columns
const columns = [
  { name: 'firstName', title: 'firstName' },
  { name: 'lastName', title: 'lastName' },
  { name: 'email', title: 'email' },
  { name: 'role', title: 'role' },
  { name: 'actions', title: 'Actions' },
];

const CompanyUsersContainer: FC = () => {
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const { snackSuccess, snackError } = useSnackbars();
  const [allCompanyUsers, setAllCompanyUsers] = useState<User[]>([]);
  const [userNotAssignToACompany, setUserNotAssignToACompany] = useState<User[]>([]);
  const { companyId } = useParams() as { companyId: string };

  const [isLoading] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [isAssignModalOpen, setAssignModalOpen] = useState<boolean>(false);
  const closeAddModal = useCallback(() => setAddModalOpen(false), [setAddModalOpen]);
  const closeAssignModal = useCallback(() => setAssignModalOpen(false), [setAssignModalOpen]);

  useAsyncEffect(async () => {
    await dispatch(fetchCompanyUsers(companyId));
  }, [dispatch]);
  const companyUsers = useSelector(selectCompanyUsers);

  useAsyncEffect(async () => {
    const users = await getWorkers();
    if (companyUsers){
      setAllCompanyUsers(users.filter(user => companyUsers.map(companyUser => companyUser.userId).includes(user.id)));
    }
  }, [companyUsers]);

  useAsyncEffect(async () => {
    if (isAssignModalOpen){
      const users = await getWorkers();
      setUserNotAssignToACompany(users.filter(user => !companyUsers.map(companyUser => companyUser.userId).includes(user.id)));
    }
  }, [companyUsers, isAssignModalOpen]);

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
          <Box>
            <TertiaryBlockButton
              startIcon={!isLoading && <Add />}
              name="AssignCompanyUser"
              onClick={() => setAssignModalOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Assign an user'}
            </TertiaryBlockButton>
          </Box>
        ),
        position: DataGridPluginPosition.rightStart,
      },
    ],
    tableHeaderRowComponent: SmallerHeaderCellComponent,
    tableGroupRowComponent: SmallerGroupCellComponent,
  }), [isLoading]);

  const getData = useCallback(async () => {
    try {
      const currentCompanyUsers = await getCompanyUsers(companyId);
      const users = await getWorkers();
      setAllCompanyUsers(users.filter(user => currentCompanyUsers.map(currentCompanyUser => currentCompanyUser.userId).includes(user.id)));
    } catch (e) {
      snackError(e);
    }
  }, [companyId, snackError]);

  const getDataNotAssign = useCallback(async () => {
    try {
      const users = await getWorkers();
      setUserNotAssignToACompany(users.filter(user => !companyUsers.map(companyUser => companyUser.userId).includes(user.id)));
    } catch (e) {
      snackError(e);
    }
  }, [companyUsers, snackError]);

  // create company's worker/user
  const handleValidateWorkerForACompany = useCallback(async (formValues:Partial<User>):Promise<void> => {
    const workerToAdd = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
      password: formValues.password,
    } as unknown as User;

    try {
      const user = await createAnUser(workerToAdd);
      await createAnUserForTheCurrentCompany({ companyId, userId: user.id });
      await getData();
      snackSuccess('user created!');
      setAddModalOpen(false);
    } catch (e) {
      snackError(`User not created! ${e}`);
    }
    setAddModalOpen(false);
  }, [companyId, getData, snackSuccess, snackError]);

  const handleValidateAssignUser = useCallback(async (formValues:Partial<User>) => {
    try {
      await createAnUserForTheCurrentCompany({ companyId, userId: formValues.id });
      await getData();
      await getDataNotAssign();
      snackSuccess('user assign!');
      setAddModalOpen(false);
    } catch (e) {
      snackError(`User not assign! ${e}`);
    }
    setAddModalOpen(false);
  }, [companyId, getData, getDataNotAssign, snackSuccess, snackError]);

  // Pass null to open in creation mode.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCompanyUser, setSelectedCompanyUsers] = useState<Partial<User> | null>(null);
  const handleCancel = useCallback(() => setIsFormOpen(false), [setIsFormOpen]);

  const openForm = useCallback((userDefinition: Partial<User> | null) => {
    setIsFormOpen(true);
    setSelectedCompanyUsers(userDefinition);
  }, [setIsFormOpen, setSelectedCompanyUsers]);

  const handleDeleteCompanyUser = useCallback(async (userId: string) => {
    await dispatch(deleteWorker(userId));
  }, [dispatch]);

  const listActions = useMemo(() => ({
    onClickEdit: openForm,
    onClickDelete: handleDeleteCompanyUser,
  }), [openForm, handleDeleteCompanyUser]);

  const handleEditCompanyUsers = useCallback(async (formValues:Partial<User>):Promise<void> => {
    const companyUsersToEdit = {
      id: formValues.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
    } as unknown as User;

    try {
      await updateWorker(companyUsersToEdit);
      await getData();
      snackSuccess('User updated in the company!');
      setIsFormOpen(false);
    } catch (e) {
      snackError(`user not updated! ${e}`);
    }
    setIsFormOpen(false);
  }, [getData, snackSuccess, snackError]);

  const onClickGoBack = useCallback(() => {
    history.push('/companies');
    // if (onClearFilters) onClearFilters();
  }, [history]);

  return (
    <Paper>
      <Box display="flex">
        <Box
          p={empreinttTheme.spacing(0.3)}
          justifyContent="flex-start"
        >
          <IconButton
            tooltipTitle={COMMON_MESSAGES.GO_BACK}
            aria-label="Go back"
            onClick={onClickGoBack}
            variant="iconOnly"
          >
            <KeyboardBackspace fontSize="large" />
          </IconButton>
        </Box>

        <Box
          p={empreinttTheme.spacing(0.3)}
          justifyContent="flex-end"
        >
          <TertiaryBlockButton
            startIcon={!isLoading && <Add />}
            name="createCompanyUser"
            onClick={() => setAddModalOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create a company\'s user'}
          </TertiaryBlockButton>

        </Box>
      </Box>

      <CompanyUsersAddModal
        isOpen={isAddModalOpen}
        onCancel={closeAddModal}
        onSubmit={handleValidateWorkerForACompany}
      />

      <CompanyUsersAssignModal
        isOpen={isAssignModalOpen}
        onCancel={closeAssignModal}
        onSubmit={handleValidateAssignUser}
        users={userNotAssignToACompany}
      />

      <CompanyUsersTable
        rows={allCompanyUsers || []}
        columns={columns}
        datagridOptions={DATAGRID_OPTIONS}
        actions={listActions}
      />

      <CompanyUsersEditModal
        user={selectedCompanyUser}
        isOpen={isFormOpen}
        handleCancel={handleCancel}
        handleSubmit={handleEditCompanyUsers}
      />
    </Paper>
  );
};

export default memo(CompanyUsersContainer);
