import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Box, Container, MuiThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import {SnackbarProvider} from "notistack";

export const decorators = [
  Story => (
      <MuiThemeProvider>
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
          <SnackbarProvider>
            <CssBaseline />
            <Container>
              <Box mt={3}>
                <MemoryRouter initialEntries={['/']}>
                  <Story />
                </MemoryRouter>
              </Box>
            </Container>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
  ),
];