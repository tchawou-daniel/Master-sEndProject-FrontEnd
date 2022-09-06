import { Box, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { empreinttTheme } from 'react/ui/branding/theme';

import { useThunkDispatch } from 'redux/store';

import useSnackbars from '../../../react/common/useSnackbars';
import { WorkerFormAddModal } from '../../../react/ui/Business/workerModals/WorkerFormAddModal';
import WorkerFormEditModal from '../../../react/ui/Business/workerModals/WorkerFormEditModal';
import { TertiaryBlockButton } from '../../../react/ui/Generic/Button/Button';
import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { deleteWorker, fetchWorkers } from '../../../redux/workers/actions';
import { selectWorkers } from '../../../redux/workers/selectors';
import { createAWorker } from '../../../services/auth/authentification.repository';
import { getWorkers, updateWorker } from '../../../services/workers/workers.repository';
import { User, UserRole } from '../../../types/users';

import WorkersTable from './WorkersTable';

// Datagrid columns
const columns = [
  { name: 'firstName', title: 'firstName' },
  { name: 'lastName', title: 'lastName' },
  { name: 'email', title: 'email' },
  { name: 'role', title: 'role' },
  { name: 'actions', title: 'Actions' },
];

const WorkersPage: FC = () => {
  const dispatch = useThunkDispatch();
  const { snackSuccess, snackError } = useSnackbars();
  const [allWorkers, setAllWorkers] = useState<User[]>([]);

  useAsyncEffect(async () => {
    await dispatch(fetchWorkers());
  }, [dispatch]);
  const workers = useSelector(selectWorkers);

  useAsyncEffect(async () => {
    const resWorkers = await getWorkers();
    setAllWorkers(resWorkers?.filter(worker => ([UserRole.PERMANENT_WORKER, UserRole.TEMPORARY_WORKER].map(role => role).includes(worker.role))));
  }, [workers]);

  const [isLoading] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const closeAddModal = useCallback(() => setAddModalOpen(false), [setAddModalOpen]);

  const DATAGRID_OPTIONS: DataGridPropsOptions = useMemo(() => ({
    pages: {
      paginable: true,
    },
    sort: {
      sortable: true,
    },
    // Enable search
    search: {
      searchable: true,
    },
    fullWidth: false,
    tableHeaderRowComponent: SmallerHeaderCellComponent,
    tableGroupRowComponent: SmallerGroupCellComponent,
  }), []);

  const getData = useCallback(async () => {
    const workersResults = await getWorkers();
    setAllWorkers(workersResults.filter(worker => ([UserRole.PERMANENT_WORKER, UserRole.TEMPORARY_WORKER].map(role => role).includes(worker.role))));
  }, []);

  // create Worker
  const handleValidateWorker = useCallback(async (formValues:Partial<User>):Promise<void> => {
    const workerToAdd = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
      password: formValues.password,
    } as unknown as User;

    try {
      await createAWorker(workerToAdd);
      await getData();
      snackSuccess('Worker created!');
      setAddModalOpen(false);
    } catch (e) {
      snackError(`Worker not created! ${e}`);
    }
    setAddModalOpen(false);
  }, [getData, snackSuccess, snackError]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<User | null>(null);
  const handleCancel = useCallback(() => setIsFormOpen(false), [setIsFormOpen]);

  const openForm = useCallback((agencyUsersDefinition: User | null) => {
    setIsFormOpen(true);
    setSelectedWorkers(agencyUsersDefinition);
  }, []);

  const handleDeleteWorkers = useCallback(async (agencyUsersId: string) => {
    await dispatch(deleteWorker(agencyUsersId));
    await getData();
  }, [dispatch, getData]);

  const listActions = useMemo(() => ({
    onClickEdit: openForm,
    onClickDelete: handleDeleteWorkers,
  }), [openForm, handleDeleteWorkers]);

  const handleEditWorker = useCallback(async (formValues:Partial<User>) => {
    const workerToEdit = {
      id: formValues.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
    } as unknown as User;

    try {
      await updateWorker(workerToEdit);
      await getData();
      snackSuccess('User updated!');
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
            {isLoading ? 'Loading...' : 'Create a worker'}
          </TertiaryBlockButton>
          <WorkerFormAddModal
            isOpen={isAddModalOpen}
            onCancel={closeAddModal}
            onSubmit={handleValidateWorker}
          />
        </Box>

      </Paper>
      <Paper>
        <WorkerFormEditModal
          worker={selectedWorkers}
          isOpen={isFormOpen}
          handleCancel={handleCancel}
          handleSubmit={handleEditWorker}
        />
        <WorkersTable
          rows={allWorkers || []}
          columns={columns}
          datagridOptions={DATAGRID_OPTIONS}
          actions={listActions}
        />
      </Paper>
    </>

  );
};

export default memo(WorkersPage);
