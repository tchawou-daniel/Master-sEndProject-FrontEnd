import { Box, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { empreinttTheme } from 'react/ui/branding/theme';

import { useThunkDispatch } from 'redux/store';

import useSnackbars from '../../../react/common/useSnackbars';
import AgencyUsersConfigurationForm from '../../../react/ui/Business/Agency/AgencyUsersConfigurationForm/AgencyUsersConfigurationForm';
import { AgencyWorkerModal } from '../../../react/ui/Business/Agency/AgencyWorkerModals/AgencyWorkerModals';
import { TertiaryBlockButton } from '../../../react/ui/Generic/Button/Button';
import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { deleteWorker, fetchWorkers } from '../../../redux/workers/actions';
import { selectWorkers } from '../../../redux/workers/selectors';
import { createAnAgencyUser } from '../../../services/agencyUsers/agencyusers.repository';
import { getWorkers, updateWorker } from '../../../services/workers/workers.repository';
import { User, UserRole } from '../../../types/users';

import AgencyUsersTable from './AgencyUsersTable';

// Datagrid columns
const columns = [
  { name: 'firstName', title: 'firstName' },
  { name: 'lastName', title: 'lastName' },
  { name: 'email', title: 'email' },
  { name: 'role', title: 'role' },
  { name: 'actions', title: 'Actions' },
];

const AgencyUsersPage: FC = () => {
  const dispatch = useThunkDispatch();
  const { snackSuccess, snackError } = useSnackbars();
  const [allAgencyUsers, setAllAgencyUsers] = useState<User[]>([]);

  useAsyncEffect(async () => {
    await dispatch(fetchWorkers());
  }, [dispatch]);
  const agencyUsers = useSelector(selectWorkers);

  useAsyncEffect(async () => {
    const resAgencyUsers = await getWorkers();
    setAllAgencyUsers(resAgencyUsers.filter(agencyUser => agencyUser.role === UserRole.EMPLOYMENT_AGENCY));
  }, [agencyUsers]);

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
    // Enable search
    search: {
      searchable: true,
    },
    additionalHeaderComponents: [
      {
        key: 'showFilterButton',
        children: (
          <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          >
            qdsfqsdofuoiuqesdfoiuqdsfyniqusodfunousqfdun
          </Box>
        ),
        position: DataGridPluginPosition.left,
      },
    ],
    fullWidth: false,
    tableHeaderRowComponent: SmallerHeaderCellComponent,
    tableGroupRowComponent: SmallerGroupCellComponent,
  }), []);

  const getData = useCallback(async () => {
    try {
      const res = await getWorkers();
      setAllAgencyUsers(res.filter(r => r.role === UserRole.EMPLOYMENT_AGENCY));
    } catch (e) {
      snackError(e);
    }
  }, [snackError]);

  // create a agency user
  const handleValidateWorker = useCallback(async (formValues:Partial<User>):Promise<void> => {
    const AgencyUserToAdd = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
      password: formValues.password,
    } as unknown as User;

    try {
      await createAnAgencyUser(AgencyUserToAdd);
      await getData();
      snackSuccess('Agency user created!');
      setAddModalOpen(false);
    } catch (e) {
      snackError(`Agency user not created! ${e}`);
    }
    setAddModalOpen(false);
  }, [getData, snackSuccess, snackError]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAgencyUsers, setSelectedAgencyUsers] = useState<User | null>(null);
  const handleCancel = useCallback(() => setIsFormOpen(false), [setIsFormOpen]);

  const openForm = useCallback((agencyUsersDefinition: User | null) => {
    setIsFormOpen(true);
    setSelectedAgencyUsers(agencyUsersDefinition);
  }, []);

  const handleDeleteAgencyUsers = useCallback(async (agencyUsersId: string) => {
    await dispatch(deleteWorker(agencyUsersId));
    await getData();
  }, [dispatch, getData]);

  const listActions = useMemo(() => ({
    onClickEdit: openForm,
    onClickDelete: handleDeleteAgencyUsers,
  }), [openForm, handleDeleteAgencyUsers]);

  const handleEditAgencyUsers = useCallback(async (formValues:Partial<User>) => {
    const agencyUsersToEdit = {
      id: formValues.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
    } as unknown as User;

    try {
      await updateWorker(agencyUsersToEdit);
      await getData();
      snackSuccess('User updated in the company!');
      setIsFormOpen(false);
    } catch (e) {
      snackError(`user not updated! ${e}`);
    }
    setIsFormOpen(false);
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
            name="createUsers"
            onClick={() => setAddModalOpen(true)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create an agency user'}
          </TertiaryBlockButton>
          <AgencyWorkerModal
            isOpen={isAddModalOpen}
            onCancel={closeAddModal}
            onSubmit={handleValidateWorker}
          />
        </Box>

      </Paper>
      <Paper>

        <AgencyUsersTable
          rows={allAgencyUsers || []}
          columns={columns}
          datagridOptions={DATAGRID_OPTIONS}
          actions={listActions}
        />
        <AgencyUsersConfigurationForm
          agencyUsers={selectedAgencyUsers}
          isOpen={isFormOpen}
          handleCancel={handleCancel}
          handleSubmit={handleEditAgencyUsers}
        />
      </Paper>
    </>

  );
};

export default memo(AgencyUsersPage);
