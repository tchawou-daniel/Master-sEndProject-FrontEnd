import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Box } from '@material-ui/core';
import moment from 'moment';
import React, {
  memo, ReactNode, useCallback, useMemo,
} from 'react';

import { empreinttTheme } from '../../../react/ui/branding/theme';
import useAdminStyles from '../../useAdminStyles';

const Cell = (cellProps: any) => {
  const { column, tableRow } = cellProps;

  const saClasses = useAdminStyles();

  let content: ReactNode | string = '';

  switch (column.name) {
    case 'name':
      content = tableRow?.row?.name;
      break;
    case 'street':
      content = tableRow?.row?.admin;
      break;
    case 'town':
      content = tableRow?.row?.town;
      break;
    case 'zipCode':
      content = tableRow?.row?.zipCode;
      break;
    case 'companySector':
      content = tableRow?.row?.companySector;
      break;
    case 'companyStatus':
      content = tableRow?.row?.companyStatus;
      break;
    case 'country':
      content = tableRow?.row?.country;
      break;
    case 'description':
      content = tableRow?.row?.description;
      break;
    case 'hiringStatus':
      content = tableRow?.row?.hiringStatus;
      break;
    case 'editCompany':
      content = 'qsdfsq';
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
