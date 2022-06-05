import { createSelector } from 'reselect';

import { RootState } from 'types/redux';
import { User, UsersMap } from 'types/users';

import { isUserActive, sortUsers } from 'services/users/users.service';

export const selectCurrentUser = (state: RootState): User => state.users.currentUser;

export const selectUsersMap = (state: RootState): UsersMap => state.users.map;

export const selectUsersList = createSelector(
  [selectUsersMap],
  map => sortUsers(Object.values(map)),
);

export const selectActiveUsers = createSelector(
  [selectUsersList],
  (users): User[] => users.filter(u => isUserActive(u)),
);

export const selectIsUsersLoading = (state: RootState): boolean => !!state.users.isLoading;
