import { ActionCreator } from 'redux';

import { ReduxAction } from 'types/redux';

import { ACTIONS, SnackbarDefinition } from './constants';

export const addSnackbar: ActionCreator<ReduxAction> = (
  snackbar: SnackbarDefinition,
) => ({
  type: ACTIONS.ADD,
  payload: { snackbar },
});

export const flushSnackbar: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.FLUSH,
});
