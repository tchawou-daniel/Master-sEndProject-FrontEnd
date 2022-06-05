// eslint-disable-next-line import/no-extraneous-dependencies -- it's just a type, and it's a dep of @auth0/react.
import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api/v0';
axios.defaults.withCredentials = true;

// ================ AUTH ================

const whitelistedUnauthorizedErrors = ['/companies', '/users/me'];

let tokenInterceptor: number | null;

/**
 * Properly cleanup the token interceptor.
 */
const clearTokenInterceptor = () => {
  if (tokenInterceptor) {
    axios.interceptors.request.eject(tokenInterceptor);
    tokenInterceptor = null;
  }
};

export class HttpError extends Error {
  statusCode: number;

  payload: any;

  constructor(message: string, statusCode: number, payload: any) {
    super(message);
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

axios.interceptors.response.use(response => response, (error) => {
  // We try to intercept unauthorized errors.
  // If we find one, then the user token is not valid anymore, so refresh on /
  // Whitelisted unauthorized URLs are managed by the authorization protector and must not refresh the page
  if (error?.response?.status === 401 && !whitelistedUnauthorizedErrors.includes(error?.config?.url)) {
    // window.location.href = '/';
  }

  // If we can find a human-readable message in the error, display it, or else throw the error as-is.
  if (error?.response?.data?.message) {
    const { message, ...payload } = error.response.data;
    throw new HttpError(message, error.response.status, payload);
  } else {
    throw error;
  }
});

function setJwt(jwt: string | null) {
  axios.defaults.headers.common.Authorization = jwt ? `Bearer ${jwt}` : '';
  localStorage.setItem('MY_USER_TOKEN_INFO', JSON.stringify(jwt));
}

// ================ AXIOS OVERRIDES ================

// Axios DELETE normally doesn't accept a body so we're overriding the method everywhere.
const axiosDelete = (url: string, axiosConfig?: AxiosRequestConfig) => axios({
  method: 'DELETE',
  url,
  ...axiosConfig,
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axiosDelete,
  setJwt,
  clearTokenInterceptor,
};
