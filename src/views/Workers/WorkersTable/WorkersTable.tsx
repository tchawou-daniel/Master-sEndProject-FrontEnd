import React, {
  FC, memo, useCallback, useState,
} from 'react';

import useContextMemoizer from '../../../react/common/useContextMemoizer';
import ConfirmationModal from '../../../react/ui/Generic/ConfirmationModal/ConfirmationModal';
import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { User } from '../../../types/users';

import WorkerContext, { WorkerContextInterface } from './WorkersContext';
import Cell from './WorkersTableCell';

export interface WorkersActions {
  onClickEdit: (worker: User) => any;
  onClickDelete: (workerId: string) => any;
}
interface WorkerTableProps {
  rows: Partial<User>[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
  actions: WorkersActions;
}
const COLUMN_EXTENSIONS = [
  { columnName: 'name', width: '20%' },
  { columnName: 'steps', width: '65%' },
  { columnName: 'actions' },
];

const WorkersTable: FC<WorkerTableProps> = ({
  rows,
  columns,
  datagridOptions,
  actions,
}) => {
  const [isWorkersToDelete, setWorkerToDelete] = useState<{
    rowId: string, name: string } | null>(null);
  const handleDeleteModalClose = useCallback(
    () => setWorkerToDelete({ rowId: '', name: isWorkersToDelete?.name! }),
    [isWorkersToDelete?.name],
  );
  const onClickDeleteCallback = useCallback(
    () => {
      actions.onClickDelete(isWorkersToDelete?.rowId!);
      setWorkerToDelete({ rowId: '', name: isWorkersToDelete?.name! });
    },
    [actions, isWorkersToDelete],
  );
  const workersContext: WorkerContextInterface = useContextMemoizer({
    actions,
    setWorkerToDelete,
  });
  return (
    <WorkerContext.Provider value={workersContext}>
      <ConfirmationModal
        isOpened={!!isWorkersToDelete?.rowId}
        title="Worker Deletion"
        contentText={(
          <>
            Are you sure you want to delete this user
            <b> &ldquo;{isWorkersToDelete?.name}&rdquo;</b> ?
          </>
        )}
        cancelText="Cancel"
        confirmText="Delete"
        isDeleteAction
        handleClose={handleDeleteModalClose}
        handleConfirm={onClickDeleteCallback}
      />
      <DataGrid
        id="workersTable"
        rows={rows}
        columns={columns}
        tableProps={{ cellComponent: Cell, columnExtensions: COLUMN_EXTENSIONS }}
        options={datagridOptions}
      />
    </WorkerContext.Provider>

  );
};

export default memo(WorkersTable);
