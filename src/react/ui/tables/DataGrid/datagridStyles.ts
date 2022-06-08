import { makeStyles } from '@material-ui/core/styles';

import { colors, EmpreinttThemeType } from '../../branding/theme';

export const useDatagridStyles = makeStyles((theme: EmpreinttThemeType) => ({
  root: {
    '& thead tr th:first-child': {
      backgroundColor: colors['brown-100'],
    },
    '& tbody tr td:first-child, & thead tr th:first-child': {
      paddingLeft: '45px',
    },
    '& tbody tr td': {
      padding: '26px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontSize: '12px',
      lineHeight: '150%',
      alignItems: 'center',
      border: 'none',
    },
    backgroundColor: 'white',
  },
  autoWidth: {
    width: 'initial',
  },
  header: {
    padding: '26px',
    backgroundColor: colors['brown-100'],
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '150%',
    border: 'none',
    minWidth: 0,
    whiteSpace: 'pre-line',
  },
  headerCellContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  subTitle: {
    fontSize: '0.8rem',
    width: '100%',
    color: theme.palette.grey['200'],
  },
  pagingPanelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '& .MuiButton-root:not([disabled])[tabIndex="-1"]': {
      backgroundColor: colors['grey-200'],
    },
  },
}));
