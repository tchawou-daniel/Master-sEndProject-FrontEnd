import MomentUtils from '@date-io/moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { empreinttTheme } from './react/ui/branding/theme';
import SnackbarProvider from './react/ui/Generic/snackbar/SnackbarProvider';
import SnackbarReduxNotifier from './react/ui/Generic/snackbar/SnackbarReduxNotifier';
import store from './redux/store';
import StoreProvider from './redux/StoreProvider';
import AuthorizationProtector from './views/User/AuthorizationProtector';

const AppProviders: FC = ({ children }) => (
  <ThemeProvider theme={empreinttTheme}>
    <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
      <SnackbarProvider>
        <StoreProvider store={store}>
          <SnackbarReduxNotifier />
          <BrowserRouter>
            <CssBaseline />
            <AuthorizationProtector>
              {/* <AccessProtector> */}
              <>{children}</>
              {/* </AccessProtector> */}
            </AuthorizationProtector>
          </BrowserRouter>
        </StoreProvider>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

export default AppProviders;
