import { useSelector } from 'react-redux';

import { User } from 'types/users';

import { selectCurrentUser } from 'redux/users/selectors';

export interface UseCurrentUserHookInterface {
  user: User | null;
}

// Use this interface only when you're sure User is truthy.
export interface UseDefinedCurrentUserHookInterface extends UseCurrentUserHookInterface {
  user: User;
}

export default () => ({
  user: useSelector(selectCurrentUser),
});
