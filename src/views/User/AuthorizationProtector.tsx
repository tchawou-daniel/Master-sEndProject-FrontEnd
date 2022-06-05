import { useAuth0 } from '@auth0/auth0-react';
import config from 'config';
import moment from 'moment';
import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import useCurrentUser from 'react/common/useCurrentUser';
import useLoadingScreen from 'react/common/useLoadingScreen';
import useQueryString from 'react/common/useQueryString';

import { useThunkDispatch } from 'redux/store';
import { fetchCurrentUser } from 'redux/users/actions';
import { ACTIONS } from 'redux/users/constants';

import httpService, { HttpError } from 'services/http';
import { bootstrapHubspot } from 'services/hubspot/hubspot';
import log from 'services/log';
import { bootstrapHotjar } from 'services/log/hotjar';
import { bootstrapTotango } from 'services/totango/totango';

import AuthenticationError from './authPartials/AuthenticationError';
import AuthenticationLogin from './authPartials/AuthenticationLogin';
import { getMockedAccessToken } from './testAuth';

const MAINTENANCE_MESSAGE = 'Your app is currently under maintenance, come back later to access your account.';
const AuthorizationProtector: FC = ({ children }) => {
  const { user } = useCurrentUser();
  const { search } = useLocation();
  const { error: errorFromAuth0, error_description: errorFromAuth0Description } = useQueryString();
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useThunkDispatch();
  const { hideLoading } = useLoadingScreen();
  const {
    user: auth0User,
    isAuthenticated: isAuthenticatedWithAuth0,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const mockedAccessToken = useMemo(() => {
    const params = new URLSearchParams(search);
    const tokenFromUrl = params.get('token');
    return getMockedAccessToken(tokenFromUrl);
  }, [search]);

  useAsyncEffect(
    async (isMounted) => {
      if (errorFromAuth0) {
        setError(new Error(`Error ${errorFromAuth0} from Authentication Provider: ${errorFromAuth0Description}`));
        return;
      }

      try {
        // If we have a mocked access token, for instance in a test scenario, put
        // it directly in the Authorization header of all future requests. If not,
        // give the getAccessTokenSilently callback to an axios middleware that
        // will call this function on each request to get a token.
        if (mockedAccessToken) {
          httpService.setJwt(mockedAccessToken);
        } else {
          httpService.setTokenInterceptor(getAccessTokenSilently);
        }

        if (!isLoading && !user) {
          // Fetch now the full user from our db.
          const fetchUserAction = await dispatch(fetchCurrentUser());

          // Post login operations.
          if (fetchUserAction.type === ACTIONS.SET_CURRENT_USER) {
            const { impersonates } = fetchUserAction.payload.user;

            // If user is not an Amalia admin, start recording his session with hotjar.
            if (!impersonates) {
              try {
                bootstrapHotjar();
              } catch (e) {
                log.warn('Unable to setup hotjar');
              }
            }

            // If user is not an Amalia admin, bootstrap totango.
            if (!impersonates && config.totango.serviceId) {
              try {
                bootstrapTotango(fetchUserAction.payload.user);
              } catch (e) {
                log.warn('Unable to setup totango');
              }
            }

            // Start chat if the feature flag is set on the company.
            if (fetchUserAction.payload.user.company?.featureFlags?.CSM_CHAT) {
              bootstrapHubspot();
            }
          }

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
    [isAuthenticatedWithAuth0, isLoading],
  );

  // We consider the page ready if it's not loading anymore, and if
  // either auth0 doesn't connect anyone (then we'll show the connection page)
  // or there is a user in the store.
  const userIsAnonymous = !auth0User && !mockedAccessToken;
  const isAuthReady = !isLoading && (!!user || userIsAnonymous || !!error);

  useEffect(() => {
    if (isAuthReady) {
      hideLoading();
    }
  }, [isAuthReady, hideLoading]);

  switch (true) {
    // The app is actually down but let's pretend it's a planned maintenance lol.
    case (!!error && error.message === 'Network Error'):
      return (
        <AuthenticationError
          isMaintenance
          message={MAINTENANCE_MESSAGE}
        />
      );

    // Maintenance page.
    case (!!error && error instanceof HttpError && [500, 503].includes((error as HttpError).statusCode)): {
      const { payload, message } = error as HttpError || {};
      const { startDate, endDate } = payload || {};
      return (
        <AuthenticationError
          isMaintenance
          message={message || MAINTENANCE_MESSAGE}
          footer={(startDate || endDate) && (
            <i>
              Planned maintenance
              {startDate && ` from around ${moment(startDate).format('LLL')}`}
              {endDate && ` to around ${moment(endDate).format('LLL')}`}
            </i>
          )}
        />
      );
    }

    // We caught an error when no account linked.
    case (!!error && !!auth0User):
      return <AuthenticationError message="No linked account exists." />;

    // We caught an error during connexion.
    case (!!error):
      return (
        <AuthenticationError
          message="An error happened while trying to connect you. Please contact your administrator."
          footer={error ? <><br /><em>{error.message}</em></> : null}
        />
      );

    // Connexion took place but we didn't connect anyone.
    case (isAuthReady && userIsAnonymous):
      return <AuthenticationLogin />;

    // Connexion took place, the user is now connected.
    case (isAuthReady && !!user):
      return <>{children}</>;

    // Default case only happen when the user is not loading and not loaded,
    // which means it's the startup of the app (between the first react render
    // and the run of the useEffect that goes fetch `/users/me`). Do not return
    // anything because it's gonna be hidden behind the loading screen anyway.
    default:
      return null;
  }
};

export default AuthorizationProtector;
