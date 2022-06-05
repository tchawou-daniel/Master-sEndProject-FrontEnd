import { keyBy } from 'lodash';
import { combineReducers } from 'redux';

import { ReduxAction } from 'types/redux';
import { User } from 'types/users';

import { ACTIONS } from 'redux/users/constants';

export default combineReducers({
  isLoading: (state: number = 0, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.START:
        return state + 1;
      case ACTIONS.ERROR:
      case ACTIONS.SET_CURRENT_USER:
      case ACTIONS.SET_USERS:
        return state - 1;
      default:
        return state;
    }
  },
  currentUser: (state: User | null = null, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.SET_CURRENT_USER:
        return action.payload.user;
      default:
        return state;
    }
  },
  map: (state: Record<string, User> = {}, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.FLUSH_USERS:
        return {};
      case ACTIONS.SET_USERS:
        return {
          // Destructuring state to clone it.
          ...state,
          // Make a keyBy object with new users, then destructure it to
          // merge it with the previous state.
          ...keyBy(action.payload.users, 'id'),
        };
      default:
        return state;
    }
  },
  allUsersLoaded: (state: boolean = false, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.SET_USERS:
        return action.payload.allUsers || state;
      case ACTIONS.FLUSH_USERS:
        return false;
      default:
        return state;
    }
  },
  allActiveUsersLoaded: (state: boolean = false, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.SET_USERS:
        return action.payload.activeUsers || state;
      case ACTIONS.FLUSH_USERS:
        return false;
      default:
        return state;
    }
  },
});
