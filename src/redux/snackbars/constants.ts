import { OptionsObject, SnackbarMessage } from 'notistack';

export interface SnackbarDefinition {
  message: SnackbarMessage;
  options?: OptionsObject;
}

export const ACTIONS = {
  ADD: 'SNACKBARS/ADD',
  FLUSH: 'SNACKBARS/FLUSH',
};
