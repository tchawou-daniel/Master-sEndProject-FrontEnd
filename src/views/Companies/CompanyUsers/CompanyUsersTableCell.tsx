import { Table } from '@devexpress/dx-react-grid-material-ui';
import { Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import React, {
  memo, ReactNode, useCallback, useContext, useMemo,
} from 'react';
import { Link } from 'react-router-dom';

import { empreinttTheme, EmpreinttThemeType } from '../../../react/ui/branding/theme';
import { DefaultActionIconButton } from '../../../react/ui/Generic/Button/Button';
import useAdminStyles from '../../useAdminStyles';

import CompanyUsersContext from './CompanyUsersContext';

const useStyles = makeStyles((theme: EmpreinttThemeType) => ({
  companyNameOnList: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.tertiary.main,
    },
  },
  companies: {
    margin: '5px 10px 0 0',
    padding: '0 10px',
    borderRadius: '5px',
    fontWeight: 500,
    backgroundColor: '#ECEBFD',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.tertiary.contrastText,
    },
  },
  companiesLink: {
    textDecoration: 'none',
  },
}));
const Cell = (cellProps: any) => {
  const classes = useStyles();

  const { column, tableRow } = cellProps;

  const { actions, setCompanyUserToDelete } = useContext(CompanyUsersContext);
  const onClickEditCallback = useCallback(() => {
    actions.onClickEdit(cellProps.row);
  }, [actions, cellProps.row]);

  const onClickDeleteCallback = useCallback(
    () => setCompanyUserToDelete({ rowId: cellProps.row?.id, name: `${cellProps.row?.lastName} ${cellProps.row?.firstName}` }),
    [cellProps.row, setCompanyUserToDelete],
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

  const company = tableRow.row;
  if (cellProps.column.name === 'name') {
  // /${quota.id}
    return (
      <Table.Cell
        {...cellProps}
        className={classes.companyNameOnList}
      >
        <Box alignItems="center">

          <Link to={`/companies/users/${company.id}`} className={classes.companiesLink}>
            <Chip
              className={classes.companies}
              color="default"
              label={tableRow?.row?.name}
              aria-label="Assign Company Users"
            />
          </Link>
        </Box>
      </Table.Cell>
    );
  }
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
