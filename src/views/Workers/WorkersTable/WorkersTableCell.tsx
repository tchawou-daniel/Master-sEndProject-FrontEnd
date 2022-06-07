import { Table } from '@devexpress/dx-react-grid-material-ui';
import React, {
  memo, ReactNode, useMemo,
} from 'react';

import { empreinttTheme } from '../../../react/ui/branding/theme';
import useAdminStyles from '../../useAdminStyles';

const Cell = (cellProps: any) => {
  const { column, tableRow } = cellProps;

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
    default:
      content = '';
      break;
  }

  const cellStyles = useMemo(() => ({
    padding: empreinttTheme.spacing(1),
  }), []);

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
