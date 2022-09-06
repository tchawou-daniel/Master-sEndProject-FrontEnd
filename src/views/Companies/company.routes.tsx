import { dispatch } from 'd3';
import React, { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { CompanyRoute, ProtectedRoute } from 'react/common/routeHelpers';
import useCurrentUser from 'react/common/useCurrentUser';

import CompaniesPage from './CompaniesTable/CompaniesPage';
import CompanyUsersContainer from './CompanyUsers/CompanyUsersContainer';

const CompanyRoutes: FC = () => {
  const { user } = useCurrentUser();

  return (
    <Switch>
      {/* <CompanyRoute */}
      {/*   user={user} */}
      {/*   path="/companies/:companyId/assignment" */}
      {/*   component={CompanyAssignmentsContainer} */}
      {/* /> */}
      <ProtectedRoute user={user} path="/companies/users/:companyId" component={CompanyUsersContainer} />
      <ProtectedRoute user={user} path="/companies" component={CompaniesPage} />
    </Switch>
  );
};

export default memo(CompanyRoutes);
