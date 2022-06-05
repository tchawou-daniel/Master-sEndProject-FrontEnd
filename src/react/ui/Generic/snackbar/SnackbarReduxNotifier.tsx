import { useSnackbar } from 'notistack';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { flushSnackbar } from 'redux/snackbars/actions';
import { selectSnackbar } from 'redux/snackbars/selectors';

const SnackbarReduxNotifier: FC = () => {
  const snackbars = useSelector(selectSnackbar);
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  useEffect(() => {
    if ((snackbars || []).length > 0) {
      snackbars.forEach(s => snackbar.enqueueSnackbar(s.message, s.options));
      dispatch(flushSnackbar());
    }
  }, [snackbars, snackbar, dispatch]);

  return null;
};

export default SnackbarReduxNotifier;
