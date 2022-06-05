// Loglevel should not be used in the codebase, instead, all log should go through this
// custom logger. This is the only place where we're authorized to import it.
// eslint-disable-next-line no-restricted-imports
import {
  setLevel, error, trace, debug, info, warn,
} from 'loglevel';

import { sentryCaptureException } from './sentry';

setLevel('info');

const errorHandler = (errorMessage, extras = {}) => {
  sentryCaptureException(errorMessage, extras);
  error(errorMessage);
};

export default {
  trace,
  debug,
  info,
  warn,
  error: errorHandler,
};
