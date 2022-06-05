import { ReduxAction } from 'types/redux';

import { ACTIONS, SnackbarDefinition } from './constants';

export default (state = [] as SnackbarDefinition[], action: ReduxAction) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload.snackbar];
    case ACTIONS.FLUSH:
      return [];
    default:
      return state;
  }
};
