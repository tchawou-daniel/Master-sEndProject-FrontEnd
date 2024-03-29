import React, { ComponentType, FC, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isUserHaveCompany } from 'services/users/users.service';

import { User } from '../../types/users';

interface SpecialRouteProps {
  condition: boolean;
  component: ComponentType<any>;
  path: string | string[];
  title?: string;
}

export const SpecialRoute: FC<SpecialRouteProps> = ({
  condition,
  component: Component,
  path,
  title,
}) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Empreintt`;
    } else {
      document.title = 'Empreintt';
    }
  }, [title]);

  return (
    <Route
      path={path}
      render={(props) => {
        if (condition) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

interface UserConditionedRouteProps {
  user: User;
  path: string | string[];
  component: ComponentType<any>;
  condition?: boolean;
  title?: string;
}

export const ProtectedRoute: FC<UserConditionedRouteProps> = ({
  user,
  path,
  component,
  condition,
  title,
}) => (
  <SpecialRoute
    path={path}
    component={component}
    condition={!user || condition || false}
    title={title}
  />
);

export const CompanyRoute: FC<UserConditionedRouteProps> = ({
  user,
  path,
  component,
  condition,
  title,
}) => (
  <SpecialRoute
    path={path}
    component={component}
    condition={!isUserHaveCompany(user) || condition || false}
    title={title}
  />
);
