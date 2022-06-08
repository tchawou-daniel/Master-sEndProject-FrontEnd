import { isEqual } from 'lodash';
import React, {
  FC, useState,
} from 'react';
import useAsyncEffect from 'use-async-effect';

import useCurrentUser from 'react/common/useCurrentUser';

import { useThunkDispatch } from 'redux/store';
import { fetchCurrentUser } from 'redux/users/actions';
import { ACTIONS } from 'redux/users/constants';

import httpService, { HttpError } from 'services/http';
import log from 'services/log';

import App from '../../App';
import EmpreinttAppBar from '../../react/ui/Generic/navigation/Appbar/EmpreinttAppBar';
import Login from '../../react/views/user/auth/Login';
import { UserRole } from '../../types/users';

import AuthenticationLogin from './Auth/AuthenticationLogin';

const AuthorizationProtector: FC = ({ children }) => {
  const { user } = useCurrentUser();
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useThunkDispatch();

  useAsyncEffect(
    async (isMounted) => {
      try {
        if (!user) {
          // Fetch now the full user from our db.
          // httpService.setJwt(localStorage.getItem('MY_USER_TOKEN_INFO'));

          const fetchUserAction = await dispatch(fetchCurrentUser());
          // httpService.setJwt(localStorage.getItem('MY_USER_TOKEN_INFO'));
          // Post login operations.
          if (fetchUserAction.type === ACTIONS.SET_CURRENT_USER) {
            // If user is not an Empreintt admin
            if (isEqual(fetchUserAction.payload.user.role, UserRole.ADMIN)) {
              try {
                // bootstrapTotango(fetchUserAction.payload.user);
              } catch (e) {
                log.warn('');
              }
            }
          }

          // Error handler.
          if (fetchUserAction.type === ACTIONS.ERROR) {
            if (isMounted()) {
              setError(fetchUserAction.error);
            }
          }
        }
        // else {
        //   httpService.setJwt(null);
        //   httpService.clearTokenInterceptor();
        // }
      } catch (thrownError) {
        setError(thrownError);
      }
    },
    () => {
      // httpService.setJwt(null);
      // httpService.clearTokenInterceptor();
    },
    [],
  );

  const isAuthReady = (!!user || !!error);

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
