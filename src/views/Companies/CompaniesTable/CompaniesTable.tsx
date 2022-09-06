import React, {
  FC, memo, useCallback, useState,
} from 'react';

import useContextMemoizer from '../../../react/common/useContextMemoizer';
import ConfirmationModal from '../../../react/ui/Generic/ConfirmationModal/ConfirmationModal';
import DataGrid from '../../../react/ui/tables/DataGrid/DataGrid';
import { Company } from '../../../types/Company';

import Cell from './CompaniesTableCell';
import CompanyContext, { CompanyContextInterface } from './CompanyContext';

export interface CompanyActions {
  onClickEdit: (company: Company) => any;
  onClickDelete: (companyId: string) => any;
}

interface CompaniesTableProps {
  rows: Partial<Company>[];
  columns: { name: string, title: string, realSortColumn?: string }[],
  datagridOptions: any,
  actions: CompanyActions;
}

const COLUMN_EXTENSIONS = [
  { columnName: 'name', width: '20%' },
  { columnName: 'steps', width: '65%' },
  { columnName: 'actions' },
];

const CompaniesTable: FC<CompaniesTableProps> = ({
  rows,
  columns,
  datagridOptions,
  actions,
}) => {
  const [isCompanyToDelete, setCompanyToDelete] = useState<{
    rowId: string, name: string } | null>(null);
  const handleDeleteModalClose = useCallback(() => setCompanyToDelete({ rowId: '', name: isCompanyToDelete?.name! }), [isCompanyToDelete?.name]);
  const onClickDeleteCallback = useCallback(
    () => {
      actions.onClickDelete(isCompanyToDelete?.rowId!);
      setCompanyToDelete({ rowId: '', name: isCompanyToDelete?.name! });
    },
    [actions, isCompanyToDelete],
  );
  const companiesContext: CompanyContextInterface = useContextMemoizer({
    actions,
    setCompanyToDelete,
  });

  return (
    <CompanyContext.Provider value={companiesContext}>
      <ConfirmationModal
        isOpened={!!isCompanyToDelete?.rowId}
        title="Company Deletion"
        contentText={(
          <>
            Are you sure you want to delete the Company
            <b> &ldquo;{isCompanyToDelete?.name}&rdquo;</b> ?
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
    </CompanyContext.Provider>

  );
};

export default memo(CompaniesTable);
