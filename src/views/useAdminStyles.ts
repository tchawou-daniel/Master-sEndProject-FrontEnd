import { makeStyles } from '@material-ui/core/styles';

import { EmpreinttThemeType } from 'react/ui/branding/theme';

export default makeStyles((theme: EmpreinttThemeType) => ({
  textWrapCell: {
    maxWidth: '10rem',
    whiteSpace: 'normal',
  },
  divider: {
    margin: theme.spacing(3),
  },
}));
