import React, {
  FC, memo, useCallback, useState,
} from 'react';

import useContextMemoizer from '../../../react/common/useContextMemoizer';
import ConfirmationModal from '../../../react/ui/Generic/ConfirmationModal/ConfirmationModal';
import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { User } from '../../../types/users';

import AgencyUsersContext, { AgencyUsersContextInterface } from './AgencyUsersContext';
import Cell from './AgencyUsersTableCell';

export interface AgencyUsersActions {
  onClickEdit: (agencyUsers: User) => any;
  onClickDelete: (agencyUsersId: string) => any;
}

interface AgencyUsersTableProps {
  rows: Partial<User>[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
  actions: AgencyUsersActions;
}
const COLUMN_EXTENSIONS = [
  { columnName: 'name', width: '20%' },
  { columnName: 'steps', width: '65%' },
  { columnName: 'actions' },
];

const AgencyUsersTable: FC<AgencyUsersTableProps> = ({
  rows,
  columns,
  datagridOptions,
  actions,
}) => {
  const [isAgencyUsersToDelete, setAgencyUsersToDelete] = useState<{
    rowId: string, name: string } | null>(null);
  const handleDeleteModalClose = useCallback(
    () => setAgencyUsersToDelete({ rowId: '', name: isAgencyUsersToDelete?.name! }),
    [isAgencyUsersToDelete?.name],
  );
  const onClickDeleteCallback = useCallback(
    () => {
      actions.onClickDelete(isAgencyUsersToDelete?.rowId!);
      setAgencyUsersToDelete({ rowId: '', name: isAgencyUsersToDelete?.name! });
    },
    [actions, isAgencyUsersToDelete],
  );
  const agencyUsersContext: AgencyUsersContextInterface = useContextMemoizer({
    actions,
    setAgencyUsersToDelete,
  });
  return (
    <AgencyUsersContext.Provider value={agencyUsersContext}>
      <ConfirmationModal
        isOpened={!!isAgencyUsersToDelete?.rowId}
        title="Agency User Deletion"
        contentText={(
          <>
            Are you sure you want to delete the agency user
            <b> &ldquo;{isAgencyUsersToDelete?.name}&rdquo;</b> ?
          </>
        )}
        cancelText="Cancel"
        confirmText="Delete"
        isDeleteAction
        handleClose={handleDeleteModalClose}
        handleConfirm={onClickDeleteCallback}
      />
      <DataGrid
        id="agencyUsersTable"
        rows={rows}
        columns={columns}
        tableProps={{ cellComponent: Cell, columnExtensions: COLUMN_EXTENSIONS }}
        options={datagridOptions}
      />
    </AgencyUsersContext.Provider>

  );
};

export default memo(AgencyUsersTable);
