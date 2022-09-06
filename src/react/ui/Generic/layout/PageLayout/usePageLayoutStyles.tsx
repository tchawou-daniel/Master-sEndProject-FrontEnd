import { makeStyles } from '@material-ui/core/styles';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

export const usePageHeaderStyles = makeStyles((theme: EmpreinttThemeType) => ({
  container: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(3)}px 0`,
    backgroundColor: theme.palette.common.white,
    padding: `${theme.spacing(2)}px 0`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing(3)}px`,
  },
  headerContainerWithHeaderContent: {
    marginBottom: theme.spacing(2),
  },
  headerTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  subTitle: {
    marginTop: theme.spacing(-1),
    color: theme.palette.grey[600],
    fontSize: 14,
  },
  separator: {
    flex: 1,
  },
  actionButton: {
    marginLeft: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  leftActions: {
    marginRight: theme.spacing(2),
  },
  rightActions: {
    marginLeft: theme.spacing(2),
  },
  linkAction: {
    textDecoration: 'none',
  },
  headerBorderRight: {
    borderRight: `1px solid ${theme.palette.grey[200]}`,
  },
}));

export const usePageSectionStyles = makeStyles(theme => ({
  pageSectionContainer: {
    '&:not($noBg)': {
      backgroundColor: theme.palette.common.white,
    },
    '&$gutters': {
      padding: `0 ${theme.spacing(5)}px`,
    },
  },
  noBg: {},
  gutters: {},
}));
