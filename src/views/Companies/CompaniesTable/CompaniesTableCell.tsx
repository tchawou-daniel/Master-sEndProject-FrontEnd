import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Box } from '@material-ui/core';
import moment from 'moment';
import React, {
  memo, ReactNode, useCallback, useMemo,
} from 'react';

import useClipboard from 'react/common/useClipboard';

import { empreinttTheme } from '../../../react/ui/branding/theme';
import useAdminStyles from '../../useAdminStyles';

const Cell = (cellProps: any) => {
  const { column, tableRow } = cellProps;
  const { copy } = useClipboard();

  const saClasses = useAdminStyles();

  const onClickId = useCallback(() => {
    copy(tableRow?.row?.plan_id);
  }, [tableRow.row, copy]);

  let content: ReactNode | string = '';

  if (column.name === 'id') {
    content = (
      <Box onClick={onClickId}>
        {cellProps.value}
      </Box>
    );
  }

  if (column.name === 'planTemplateGeneratedDate') {
    content = (
      <Box display="flex" flexDirection="column">
        <Box>{cellProps.value ? moment(cellProps.value, 'YYYY-MM-DD HH:mm:ss').format('YY-MM-DD') : '-'}</Box>
        <Box>{cellProps.value ? moment(cellProps.value, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss') : '-'}</Box>
      </Box>
    );
  }

  if (column.name === 'time') {
    content = (
      <Box display="flex" flexDirection="column">
        <Box>{tableRow.row.buildTimeMs ? `${tableRow.row.buildTimeMs}ms` : '?'}</Box>
        <Box>{tableRow.row.postBuildTimeMs ? `${tableRow.row.postBuildTimeMs}ms` : '?'}</Box>
      </Box>
    );
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
