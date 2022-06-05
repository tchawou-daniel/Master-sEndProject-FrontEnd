import { useSelector } from 'react-redux';

import { User, UserRole } from 'types/users';

import { selectCurrentUser } from 'redux/users/selectors';

export interface UseCurrentUserHookInterface {
  user: User | null;
}

// Use this interface only when you're sure User is truthy.
export interface UseDefinedCurrentUserHookInterface extends UseCurrentUserHookInterface {
  user: User;
}
export interface UpdateUserRequest {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email?: string;
  language: string;
  role?: UserRole;
  isDeactivated?: boolean;
}

export default () => ({
  user: useSelector(selectCurrentUser),
});
