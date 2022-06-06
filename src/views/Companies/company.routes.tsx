import React, { FC, memo } from 'react';
import { Switch } from 'react-router-dom';

import { CompanyRoute, ProtectedRoute } from 'react/common/routeHelpers';
import useCurrentUser from 'react/common/useCurrentUser';

import CompaniesPage from './CompaniesTable/CompaniesPage';

const CompanyRoutes: FC = () => {
  const { user } = useCurrentUser();
  console.log(user);
  return (
    <Switch>
      {/* <CompanyRoute */}
      {/*   user={user} */}
      {/*   path="/companies/:companyId/assignment" */}
      {/*   component={CompanyAssignmentsContainer} */}
      {/* /> */}
      <ProtectedRoute
        user={user}
        path="/companies"
        component={CompaniesPage}
      />
    </Switch>
  );
};

export default memo(CompanyRoutes);
