import React, {
  FC, useState,
} from 'react';
import useAsyncEffect from 'use-async-effect';

import useCurrentUser from 'react/common/useCurrentUser';

import { useThunkDispatch } from 'redux/store';
import { fetchCurrentUser } from 'redux/users/actions';
import { ACTIONS } from 'redux/users/constants';

import httpService, { HttpError } from 'services/http';

const AuthorizationProtector: FC = ({ children }) => {
  const { user } = useCurrentUser();
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useThunkDispatch();

  useAsyncEffect(
    async (isMounted) => {
      try {
        if (!user && localStorage.getItem('MY_USER_TOKEN_INFO')) {
          httpService.setJwt(localStorage.getItem('MY_USER_TOKEN_INFO'));
          const fetchUserAction = await dispatch(fetchCurrentUser());
          // Error handler.
          if (fetchUserAction.type === ACTIONS.ERROR) {
            if (isMounted()) {
              setError(fetchUserAction.error);
            }
          }
        } else {
          httpService.setJwt(null);
          httpService.clearTokenInterceptor();
        }
      } catch (thrownError) {
        setError(thrownError);
      }
    },
    () => {
      httpService.setJwt(null);
      httpService.clearTokenInterceptor();
    },
    [],
  );

  switch (true) {
    // The app is actually down but let's pretend it's a planned maintenance lol.
    case (!!error && error.message === 'Network Error'):
      return (
        <h1>Network Error</h1>
      );

    // Maintenance page.
    case (!!error && error instanceof HttpError && [500, 503].includes((error as HttpError).statusCode)): {
      return (
        <h1>Maintenance page</h1>
      );
    }
    // case (isAuthReady):
    //   return <App />;
    // Connexion took place, the user is now connected.
    case (!!user):
      return <>{children}</>;

    default:
      return <>{children}</>;
  }
};

export default AuthorizationProtector;
