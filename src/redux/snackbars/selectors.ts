import { RootStateOrAny } from 'react-redux';

import { SnackbarDefinition } from './constants';

export const selectSnackbar = (store: RootStateOrAny): SnackbarDefinition[] => store.snackbars;
