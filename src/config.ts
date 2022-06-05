import log from 'services/log';

// We're overriding the window object to put variables in it.
// @ts-ignore
const envVariables = window.env as any;

/**
 * Returns runtime environment variable if set.
 * Runtime environment is configured in `public/index.html` inside window.env.
 * They are configured using placeholders as in window.env = { VARIABLE : '$VARIABLE' }.
 *
 * They will be swapped with their value during deploy, just before sending the bundle
 * to the bucket (see .gitlab-ci.yml).
 */
const getEnvironmentVariable = (variableName: string, isRequired?: boolean): string => {
  // Try to fetch the variable from the values in index.html
  // This is the common scenario for firebase envs.
  if (
    envVariables?.[variableName]
    && envVariables?.[variableName] !== `$${variableName}`
  ) {
    return envVariables[variableName];
  }

  // If not found, try to find them in process.env.
  // This is the common scenario for development, dotenv + webpack
  // injecting all the .env into process.env.
  const valueFromProcess = process?.env && process.env[variableName];

  if (valueFromProcess) {
    return valueFromProcess;
  }

  // Still hasn't find anything? Let's verify it wasn't required.
  if (isRequired && !process.env.CI) {
    throw new Error(`Variable ${variableName} has no value.`);
  }

  // Else, return a falsy string you can test against.
  return '';
};

const config = {
  api: {
    url: getEnvironmentVariable('REACT_APP_API_BASE_URL', true),
  },
  sentry: {
    dsn: getEnvironmentVariable('REACT_APP_SENTRY_DSN', false),
    env: getEnvironmentVariable('REACT_APP_SENTRY_ENV', false),
  },
};

if (process.env.NODE_ENV !== 'test') {
  log?.info('App starting with configuration', config);
}

export default config;
