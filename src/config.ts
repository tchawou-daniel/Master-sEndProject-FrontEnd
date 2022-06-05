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
  hotjar: {
    hjid: getEnvironmentVariable('REACT_APP_HOTJAR_ID', false),
  },
  auth0: {
    domain: getEnvironmentVariable('REACT_APP_AUTH0_DOMAIN', true),
    clientId: getEnvironmentVariable('REACT_APP_AUTH0_CLIENT_ID', true),
    audience: getEnvironmentVariable('REACT_APP_AUTH0_AUDIENCE', true),
    redirectUri: window.location.origin,
    scope: 'openid profile email',
  },
  firebase: {
    apiKey: getEnvironmentVariable('REACT_APP_FIREBASE_APIKEY', false),
    authDomain: `${getEnvironmentVariable('REACT_APP_FIREBASE_PROJECT_ID', false)}.firebaseapp.com`,
    databaseURL: `https://${getEnvironmentVariable('REACT_APP_FIREBASE_PROJECT_ID', false)}.firebaseio.com`,
    projectId: `${getEnvironmentVariable('REACT_APP_FIREBASE_PROJECT_ID', false)}`,
    storageBucket: `${getEnvironmentVariable('REACT_APP_FIREBASE_PROJECT_ID', false)}.appspot.com`,
    messagingSenderId: `${getEnvironmentVariable('REACT_APP_FIREBASE_MESSENGER_ID')}`,
    appId: `${getEnvironmentVariable('REACT_APP_FIREBASE_APP_ID', false)}`,
  },
  totango: {
    serviceId: `${getEnvironmentVariable('REACT_APP_TOTANGO_SERVICE_ID', false)}`,
  },
  integrations: {
    slackId: getEnvironmentVariable('REACT_APP_SLACK_CLIENT_ID', false),
  },
  hubspot: {
    hubspotChatId: getEnvironmentVariable('REACT_APP_HUBSPOT_SLACKBOT_ID', false),
  },
  directory: {
    userUploadTemplate: 'https://docs.google.com/spreadsheets/d/1-vxmHq_x29jthYalMYnhZ212cm7g0hvVJbuFym5ku30',
    csvMandatoryColumns: ['First Name', 'Last Name', 'Email'],
    csvOptionalColumns: ['Role', 'Currency', 'Language', 'External ID', 'HRIS ID'],
  },
  quota: {
    quarterlyQuotaUploadTemplate: 'https://docs.google.com/spreadsheets/d/1LMmjFUgtp4siO3q0su7-2ZeFvi3yOANpEhWy5oReeEQ',
    monthlyQuotaUploadTemplate: 'https://docs.google.com/spreadsheets/d/1w3mAxWUQ9PFtV9HrX-PCI3_ieY2qU608otYVg3Z7THI',
    yearlyQuotaUploadTemplate: 'https://docs.google.com/spreadsheets/d/1LuUmF3ENfHdPmEi01crc2p093hFr77zFXvS4BqYiK8I',
    csvMandatoryColumns: ['Email'],
    csvOptionalColumns: ['Value'],
  },
  opportunities: {
    opportunitiesUploadTemplate: 'https://docs.google.com/spreadsheets/d/1wNWMgFe8g_Sm8j5Sf9S4HCn2sOD8uIXfvIn_7leG7hQ',
    requiredColumn: ['Record ID'],
  },
};

if (process.env.NODE_ENV !== 'test') {
  log?.info('App starting with configuration', config);
}

export default config;
