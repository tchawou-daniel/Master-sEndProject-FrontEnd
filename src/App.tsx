import { ErrorBoundary } from '@sentry/react';
import { isEqual } from 'lodash';
import React, { useEffect } from 'react';
import {
  Route, RouteComponentProps, useHistory, useLocation,
} from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { ProtectedRoute } from './react/common/routeHelpers';
import useCurrentUser from './react/common/useCurrentUser';
import EmpreinttAppBar from './react/ui/Generic/navigation/Appbar/EmpreinttAppBar';
import Companies from './react/views/home/Companies';
import Login from './react/views/user/auth/Login';
import Register from './react/views/user/auth/Register';
import { useThunkDispatch } from './redux/store';
import { fetchCurrentUser } from './redux/users/actions';
import { ACTIONS } from './redux/users/constants';
import httpService from './services/http';
import { UserRole } from './types/users';

// axios.defaults.baseURL = 'http://localhost/5000';

function App() {
  const { user } = useCurrentUser();
  // console.log(`user ${user}`);
  // const user = { email: 'sipetchawou@gmail.com' };
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/callback')) {
      document.title = 'Connection | Empreintt';
    }
  }, [pathname]);

  return (
    <>
      <EmpreinttAppBar user={user} />
      {/* <Route path="/" component={Home} /> */}
      <Route path="/auth/login/callback" component={Login} />
      <Route path="/auth/register/callback" component={Register} />

      {/* <Route path="/companies" component={Companies} /> */}

      {/*       {(!user) ? ( */}
      {/*   <> */}
      {/*     <EmpreinttAppBar /> */}
      {/*     <Route path="/auth/login/callback" component={Login} /> */}
      {/*     <Route path="/auth/register/callback" component={Register} /> */}
      {/*   </> */}
      {/* ) : null} */}
      {/* {(!user) ? ( <EmpreinttAppBar />} */}

      <ProtectedRoute path="/companies" currentUser={user} component={Companies} />
      {/* ADMIN & EMPLOYMENT_AGENCY */}
      {/* <ProtectedRoute path="/admin/employments" user={user} component={} /> */}
      {/* <ProtectedRoute path="/admin/employments/:employmentId" user={user} component={} /> */}
      {/* <ProtectedRoute path="/admin/allUsers" user={user} component={} /> */}
      {/* <ProtectedRoute path="/admin/allUsers/:idUser" user={user} component={} /> */}
      {/* <ProtectedRoute path="/admin/allCompanies" user={user} component={} /> */}
      {/* <ProtectedRoute path="/users/:companyId" user={user} component={} /> */}

      {/* PARTNER_COMPANY_EMPLOYEE_ADMIN */}
      {/* <Route path="/company/:idCurrentUser" exact /> */}
      {/* <Route path="/company/employments/:idCurrentUser" exact /> */}
      {/* partner's company */}
      {/* <Route path="/workers/:idCompany" exact /> */}
      {/* <Route path="/users/:companyId" exact /> */}

      {/* PARTNER_COMPANY_EMPLOYEE */}
      {/* <Route path="/company/:idCurrentUser" exact /> */}
      {/* <Route path="/company/employments/:idCurrentUser" exact /> */}
      {/* partner's company */}
      {/* <Route path="/workers/:idCompany" exact /> */}

      {/* TEMPORARY_WORKER */}
      {/* <Route path="/company/:idCurrentUser" exact /> */}

      {/* PERMANENT_WORKER */}
      {/* <Route path="/company/:idCurrentUser" exact /> */}
      {/* <Route path="/user/:idCompany" exact /> */}
      {/* possibility to contact the agency */}
    </>
  );
}

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;
export default App;
