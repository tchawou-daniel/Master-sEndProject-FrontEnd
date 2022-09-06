import React, { FC, memo } from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from '../../react/common/routeHelpers';
import useCurrentUser from '../../react/common/useCurrentUser';

import AgencyUsersPage from './Users/AgencyUsersPage';

const AgencyRoutes: FC = () => {
  const { user } = useCurrentUser();

  return (
    <Switch>
      <ProtectedRoute
        user={user}
        path="/agency"
        component={AgencyUsersPage}
      />
    </Switch>
  );
};

export default memo(AgencyRoutes);
