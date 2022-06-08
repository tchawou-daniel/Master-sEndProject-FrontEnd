import React, { FC, memo } from 'react';
import { Switch } from 'react-router-dom';

import { ProtectedRoute } from '../../react/common/routeHelpers';
import useCurrentUser from '../../react/common/useCurrentUser';

import WorkersPage from './WorkersTable/WorkersPage';

const WorkerRoutes: FC = () => {
  const { user } = useCurrentUser();

  return (
    <Switch>
      <ProtectedRoute
        user={user}
        path="/workers"
        component={WorkersPage}
      />
    </Switch>
  );
};

export default memo(WorkerRoutes);
