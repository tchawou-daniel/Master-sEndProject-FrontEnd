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
import { fetchWorkers } from '../../../redux/workers/actions';
import { selectWorkers } from '../../../redux/workers/selectors';
import { createAWorker } from '../../../services/auth/authentification.repository';
import { updateWorker } from '../../../services/users/users.repository';
import { User } from '../../../types/users';

import WorkersTable from './WorkersTable';

// Datagrid columns
const columns = [
  { name: 'firstName', title: 'firstName' },
  { name: 'lastName', title: 'lastName' },
  { name: 'email', title: 'email' },
];

const WorkersPage: FC = () => {
  const dispatch = useThunkDispatch();
  const { snackSuccess, snackError } = useSnackbars();
  const [allWorkers, setAllWorkers] = useState<User[]>([]);

  useAsyncEffect(async () => {
    await dispatch(fetchWorkers());
  }, [dispatch]);

  const workers = useSelector(selectWorkers);

  useEffect(() => {
    // const res = await getWorkers();
    setAllWorkers(workers);
  }, [workers]);
  // console.log('qsdoifpqsd');
  // console.log(workers);

  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  const closeAddModal = useCallback(() => setAddModalOpen(false), [setAddModalOpen]);

  // const getData = useCallback(async () => {
  //   try {
  //     const res = await getWorkers();
  //     setAllWorkers(res);
  //   } catch (e) {
  //     snackError(e);
  //   }
  // }, [snackError]);

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
      // await getData();
      snackSuccess('Worker created!');
      setAddModalOpen(false);
    } catch (e) {
      snackError(`Worker not created! ${e}`);
    }
    setAddModalOpen(false);
  }, [snackSuccess, snackError]);

  // company/rates/RateTable  editTable
  const onCommitChanges = useCallback(({ changed }: any) => {
    console.log(changed);
    if (changed) {
      // Loop through lines that changed
      Object.keys(changed).filter(ind => !!changed[ind]).map(parseInt).forEach((rowIndex: number) => {
        console.log(rowIndex);
        console.log(changed[rowIndex]);
        console.log(Object.keys(changed).filter(ind => !!changed[ind]));
        console.log(Object.keys(changed).filter(ind => !!changed[ind]).map(parseInt));
        console.log(Object.keys(changed[rowIndex]).filter(ind => !!changed[rowIndex][ind]));
        console.log(Object.keys(changed[rowIndex]).filter(ind => !!changed[rowIndex][ind]).map(parseInt));
        // Loop through values that changed in this line
        let newValue;
        Object.keys(changed[rowIndex]).filter(ind => !!changed[rowIndex][ind]).forEach(async (columnIndex: string) => {
          newValue = changed[rowIndex][columnIndex];
          // await updateUser({
          //   ...allWorkers[rowIndex],
          //
          // });
          await updateWorker({ ...allWorkers[rowIndex], ...changed[rowIndex] });
          // console.log({ ...allWorkers[rowIndex], ...changed[rowIndex] });
          console.log(newValue);
          console.log(allWorkers);
          console.log(rowIndex);
          // console.log(allWorkers[rowIndex]);
        });
      });
    }
  }, [allWorkers]);

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
    // Enable search
    search: {
      searchable: true,
    },
    additionalHeaderComponents: [
      {
        key: 'title',
        children: (
          <Box>All Workers</Box>
        ),
        position: DataGridPluginPosition.rightStart,
      },
    ],
    fullWidth: false,
    tableHeaderRowComponent: SmallerHeaderCellComponent,
    tableGroupRowComponent: SmallerGroupCellComponent,
    cellEdit: {
      active: true,
      onCommitChanges,
    },
  };

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
