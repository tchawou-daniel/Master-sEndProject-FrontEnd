import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import React, {
  memo, ReactNode, useCallback, useContext, useMemo,
} from 'react';

import { empreinttTheme } from '../../../react/ui/branding/theme';
import { DefaultActionIconButton } from '../../../react/ui/Generic/Button/Button';
import useAdminStyles from '../../useAdminStyles';

import AgencyUsersContext from './AgencyUsersContext';

const Cell = (cellProps: any) => {
  const { column, tableRow } = cellProps;

  const { actions, setAgencyUsersToDelete } = useContext(AgencyUsersContext);
  const onClickEditCallback = useCallback(() => {
    actions.onClickEdit(cellProps.row);
  }, [actions, cellProps.row]);

  const onClickDeleteCallback = useCallback(
    () => setAgencyUsersToDelete({ rowId: cellProps.row?.id, name: `${cellProps.row?.lastName} ${cellProps.row?.firstName}` }),
    [cellProps.row, setAgencyUsersToDelete],
  );

  const saClasses = useAdminStyles();

  let content: ReactNode | string = '';

  switch (column.name) {
    case 'firstName':
      content = tableRow?.row?.firstName;
      break;
    case 'lastName':
      content = tableRow?.row?.lastName;
      break;
    case 'email':
      content = tableRow?.row?.email;
      break;
    case 'role':
      content = tableRow?.row?.role;
      break;
    default:
      content = '';
      break;
  }

  const cellStyles = useMemo(() => ({
    padding: empreinttTheme.spacing(1),
  }), []);

  if (cellProps.column.name === 'actions') {
    return (
      <Table.Cell
        {...cellProps}
      >
        {cellProps.row.machineName !== 'default' ? (
          <>
            <DefaultActionIconButton
              size="small"
              aria-label={`Edit ${tableRow.row?.name}`}
              onClick={onClickEditCallback}
            >
              <EditIcon />
            </DefaultActionIconButton>
            <DefaultActionIconButton
              size="small"
              aria-label={`Delete ${tableRow.row?.name}`}
              onClick={onClickDeleteCallback}
            >
              <DeleteIcon />
            </DefaultActionIconButton>
          </>
        ) : null}
      </Table.Cell>
    );
  }

  return (
    <Table.Cell
      name={`${tableRow.rowId}.values[${column.name}]`}
      {...cellProps}
      style={cellStyles}
      className={saClasses.textWrapCell}
    >
      {content}
    </Table.Cell>
  );
};

export default memo(Cell);
