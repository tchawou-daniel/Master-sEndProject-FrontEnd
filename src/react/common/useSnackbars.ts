import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addSnackbar } from '../../redux/snackbars/actions';

export default () => {
  const dispatch = useDispatch();

  const snackSuccess = useCallback(
    (message: string, moreOptions: object = {}) => {
      dispatch(addSnackbar({ message, options: { variant: 'success', ...moreOptions } }));
    },
    [dispatch],
  );

  const snackInfo = useCallback(
    (message: string, moreOptions: object = {}) => {
      dispatch(addSnackbar({ message, options: { variant: 'info', ...moreOptions } }));
    },
    [dispatch],
  );

  const snackWarning = useCallback(
    (message: string, moreOptions: object = {}) => {
      dispatch(addSnackbar({ message, options: { variant: 'warning', ...moreOptions } }));
    },
    [dispatch],
  );

  const snackError = useCallback(
    (message: string, moreOptions: object = {}) => {
      dispatch(addSnackbar({ message, options: { variant: 'error', ...moreOptions } }));
    },
    [dispatch],
  );

  return {
    snackSuccess,
    snackError,
    snackInfo,
    snackWarning,
  };
};
