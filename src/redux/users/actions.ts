import { uniq } from 'lodash';
import { ActionCreator } from 'redux';

import { ReduxAction, ThunkResult } from 'types/redux';
import { User } from 'types/users';

import { ACTIONS } from 'redux/users/constants';

import * as UsersRepository from 'services/users/users.repository';

import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import { addSnackbar } from '../snackbars/actions';

// import { addSnackbar } from '../snackbars/actions';

// import { selectUsersList, selectUsersMap } from './selectors';

const usersStart: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.START,
});

const usersError: ActionCreator<ReduxAction> = (error: Error) => ({
  type: ACTIONS.ERROR,
  error,
});

export const setCurrentUser: ActionCreator<ReduxAction> = (
  user: User | null,
) => ({
  type: ACTIONS.SET_CURRENT_USER,
  payload: { user },
});

export const updateCurrentUser = (user: UpdateUserRequest): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(usersStart());
  try {
    const updatedUser = await UsersRepository.updateUser(user);
    dispatch(addSnackbar({ message: 'Profile successfully updated!', options: { variant: 'success' } }));
    return dispatch(setCurrentUser(updatedUser));
  } catch (error) {
    return dispatch(usersError(error));
  }
};

export const updateCurrentUserAvatar = (avatar: string): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(usersStart());
  try {
    const updatedUser = await UsersRepository.uploadAvatar(avatar);
    dispatch(addSnackbar({ message: 'Avatar successfully updated!', options: { variant: 'success' } }));
    return dispatch(setCurrentUser(updatedUser));
  } catch (error) {
    return dispatch(usersError(error));
  }
};

export const fetchCurrentUser = (): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(usersStart());
  try {
    const emailUserJson = localStorage.getItem('MY_USER_EMAIL');

    const user = await UsersRepository.getCurrentUser(emailUserJson!);
    return dispatch(setCurrentUser(user));
  } catch (error) {
    return dispatch(usersError(error));
  }
};

//
// export const updateCurrentUser =
//   (user: UpdateUserRequest): ThunkResult<Promise<ReduxAction>> =>
//   async (dispatch) => {
//     dispatch(usersStart());
//     try {
//       const updatedUser = await UsersRepository.updateUser(user);
//       dispatch(
//         addSnackbar({
//           message: 'Profile successfully updated!',
//           options: { variant: 'success' },
//         }),
//       );
//       return dispatch(setCurrentUser(updatedUser));
//     } catch (error) {
//       return dispatch(usersError(error));
//     }
//   };
//
// export const updateCurrentUserAvatar =
//   (avatar: string): ThunkResult<Promise<ReduxAction>> =>
//   async (dispatch) => {
//     dispatch(usersStart());
//     try {
//       const updatedUser = await UsersRepository.uploadAvatar(avatar);
//       dispatch(
//         addSnackbar({
//           message: 'Avatar successfully updated!',
//           options: { variant: 'success' },
//         }),
//       );
//       return dispatch(setCurrentUser(updatedUser));
//     } catch (error) {
//       return dispatch(usersError(error));
//     }
//   };

// export const updateCurrentUserSettings =
//   (settings: UserSettings): ThunkResult<Promise<ReduxAction>> =>
//   async (dispatch) => {
//     dispatch(usersStart());
//     try {
//       const updatedUser = await UsersRepository.updateSettings(settings);
//       return dispatch(setCurrentUser(updatedUser));
//     } catch (error) {
//       return dispatch(usersError(error));
//     }
//   };

export const setUsers: ActionCreator<ReduxAction> = (
  users: User[],
  allUsers: boolean,
  activeUsers: boolean,
) => ({
  type: ACTIONS.SET_USERS,
  payload: { users, allUsers, activeUsers },
});

// export const fetchUsers =
//   (userIds: string[]): ThunkResult<Promise<ReduxAction>> =>
//   async (dispatch, getState) => {
//     const currentUsersMap = selectUsersMap(getState());
//     const cachedUserIds = Object.keys(currentUsersMap);
//
//     const usersToFetch = userIds.filter(
//       (userId) => !cachedUserIds.includes(userId),
//     );
//
//     if (usersToFetch.length === 0) {
//       return setUsers(currentUsersMap);
//     }
//
//     dispatch(usersStart());
//
//     try {
//       const fetchedUsers = await UsersRepository.fetchUsersByIds(
//         uniq(usersToFetch),
//       );
//       // We need to pass already fetched users as some components need the whole list
//       return dispatch(
//         setUsers([...Object.values(currentUsersMap), ...fetchedUsers]),
//       );
//     } catch (error) {
//       return dispatch(usersError(error));
//     }
//   };
//
// export const fetchAllUsers =
//   (onlyActive: boolean): ThunkResult<Promise<ReduxAction>> =>
//   async (dispatch, getState) => {
//     const state = getState();
//
//     // Check the cache before query.
//     if (
//       // If all users are already loaded.
//       state.users.allUsersLoaded ||
//       // Or if you're querying for active, but they're all there.
//       (onlyActive && state.users.allActiveUsersLoaded)
//     ) {
//       return setUsers(selectUsersList(state));
//     }
//
//     dispatch(usersStart());
//
//     try {
//       if (onlyActive) {
//         const activeUsers = await UsersRepository.fetchActiveUsers();
//         return dispatch(setUsers(activeUsers, false, true));
//       }
//
//       const allUsers = await UsersRepository.getEmployees();
//       return dispatch(setUsers(allUsers, true, false));
//     } catch (error) {
//       return dispatch(usersError(error));
//     }
//   };

export const flushUsers: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.FLUSH_USERS,
});
