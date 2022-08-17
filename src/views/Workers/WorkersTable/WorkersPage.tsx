import { Box, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, {
  FC, memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { empreinttTheme } from 'react/ui/branding/theme';

import { useThunkDispatch } from 'redux/store';

import useSnackbars from '../../../react/common/useSnackbars';
import { WorkerFormAddModal } from '../../../react/ui/Business/workerModals/WorkerFormAddModal';
import { TertiaryBlockButton } from '../../../react/ui/Generic/Button/Button';
import { DataGridPropsOptions } from '../../../react/ui/tables/DataGrid/Datagrid.props';
import { DataGridPluginPosition } from '../../../react/ui/tables/DataGrid/DataGridComponents/DataGridPlugin';
import { SmallerGroupCellComponent, SmallerHeaderCellComponent } from '../../../react/ui/tables/DataGrid/DataGridComponents/NativeComponents';
import { flushUsers } from '../../../redux/users/actions';
import { selectUsers } from '../../../redux/users/selectors';
import { addUser, createAWorker } from '../../../services/auth/authentification.repository';
import { getUsers } from '../../../services/users/users.repository';
import { User, UserRole } from '../../../types/users';

import WorkersTable from './WorkersTable';

// Datagrid columns
const columns = [
  { name: 'firstName', title: 'firstName' },
  { name: 'lastName', title: 'lastName' },
  { name: 'email', title: 'email' },
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
  //   grouping: [{ columnName: 'workerName' }],
  // },
  additionalHeaderComponents: [
    {
      key: 'title',
      children: (
        <Box>All Workers</Box>
      ),
      position: DataGridPluginPosition.rightStart,
    },
  ],
  fullWidth: true,
  tableHeaderRowComponent: SmallerHeaderCellComponent,
  tableGroupRowComponent: SmallerGroupCellComponent,
};

const WorkersPage: FC = () => {
  const dispatch = useThunkDispatch();
  const { snackSuccess, snackError } = useSnackbars();
  const [allWorkers, setAllWorkers] = useState<User[]>([]);

  useAsyncEffect(async () => {
    await dispatch(flushUsers());
  }, [dispatch]);

  const users = useSelector(selectUsers);

  useEffect(() => {
    setAllWorkers(users);
  }, [users]);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const closeAddModal = useCallback(() => setAddModalOpen(false), [setAddModalOpen]);

  const getData = useCallback(async () => {
    try {
      const res = await getUsers();
      setAllWorkers(res);
    } catch (e) {
      snackError(e);
    }
  }, [snackError]);

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

        <WorkersTable
          rows={allWorkers || []}
          columns={columns}
          datagridOptions={DATAGRID_OPTIONS}
        />
      </Paper>
    </>

  );
};

export default memo(WorkersPage);
