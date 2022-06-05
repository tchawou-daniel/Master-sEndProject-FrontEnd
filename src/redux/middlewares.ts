import {
  Action, Dispatch, Middleware, MiddlewareAPI,
} from 'redux';

import { ReduxAction } from 'types/redux';

import { sentryCaptureException } from 'services/log/sentry';

import { addSnackbar } from './snackbars/actions';

export const errorHandler: Middleware = (api: MiddlewareAPI) => (next: Dispatch<Action>) => (action: ReduxAction) => {
  if (action.error) {
    sentryCaptureException(action.error);
    api.dispatch(addSnackbar({
      message: action.error.message,
      options: { variant: 'error' },
    }));
  }
  return next(action);
};
