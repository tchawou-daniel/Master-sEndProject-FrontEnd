import React, {
  FC, memo, useCallback, useState,
} from 'react';

import useContextMemoizer from '../../../react/common/useContextMemoizer';
import ConfirmationModal from '../../../react/ui/Generic/ConfirmationModal/ConfirmationModal';
import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { User } from '../../../types/users';

import CompanyUsersContext, { CompanyUsersContextInterface } from './CompanyUsersContext';
import Cell from './CompanyUsersTableCell';

export interface CompanyUsersActions {
  onClickEdit: (user: Partial<User>) => any;
  onClickDelete: (userId: string) => any;
}

interface CompaniesUsersTableProps {
  rows: Partial<User>[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
  actions: CompanyUsersActions;
}

const COLUMN_EXTENSIONS = [
  { columnName: 'name', width: '20%' },
  { columnName: 'steps', width: '65%' },
  { columnName: 'actions' },
];

const CompanyUsersTable: FC<CompaniesUsersTableProps> = ({
  rows,
  columns,
  datagridOptions,
  actions,
}) => {
  const [isCompanyUserToDelete, setCompanyUserToDelete] = useState<{
    rowId: string, name: string } | null>(null);
  const handleDeleteModalClose = useCallback(() => setCompanyUserToDelete(
    { rowId: '', name: isCompanyUserToDelete?.name! },
  ), [isCompanyUserToDelete?.name]);

  const onClickDeleteCallback = useCallback(
    () => {
      actions.onClickDelete(isCompanyUserToDelete?.rowId!);
      setCompanyUserToDelete({ rowId: '', name: isCompanyUserToDelete?.name! });
    },
    [actions, isCompanyUserToDelete],
  );

  const companiesContext: CompanyUsersContextInterface = useContextMemoizer({
    actions,
    setCompanyUserToDelete,
  });

  return (
    <CompanyUsersContext.Provider value={companiesContext}>
      <ConfirmationModal
        isOpened={!!isCompanyUserToDelete?.rowId}
        title="User Deletion"
        contentText={(
          <>
            Are you sure you want to delete the Company
            <b> &ldquo;{isCompanyUserToDelete?.name}&rdquo;</b> ?
          </>
        )}
        cancelText="Cancel"
        confirmText="Delete"
        isDeleteAction
        handleClose={handleDeleteModalClose}
        handleConfirm={onClickDeleteCallback}
      />
      <DataGrid
        id="companiesTable"
        rows={rows}
        columns={columns}
        tableProps={{ cellComponent: Cell, columnExtensions: COLUMN_EXTENSIONS }}
        options={datagridOptions}
      />
    </CompanyUsersContext.Provider>

  );
};

export default memo(CompanyUsersTable);
