import { ActionCreator } from 'redux';

import { ReduxAction, ThunkResult } from 'types/redux';
import { User } from 'types/users';

import { ACTIONS } from 'redux/users/constants';

import * as UsersRepository from 'services/users/users.repository';

import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import { addSnackbar } from '../snackbars/actions';

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

export const logoutCurrentUser = (): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  try {
    return dispatch(setCurrentUser(null));
  } catch (error) {
    return dispatch(usersError(error));
  }
};

export const flushUsers: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.FLUSH_USERS,
});
