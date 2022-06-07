import * as Sentry from '@sentry/react';
import config from 'config';

export const bootstrapSentry = () => {
  const { dsn, env } = config.sentry;
  Sentry.init({
    dsn,
    environment: env,
  });
};

export const sentryCaptureException = (exception: Error, extras: Record<string, any> = {}) => {
  Sentry.captureException(exception, {
    extra: extras,
  });
};
