import { combineReducers } from 'redux';

import { ReduxAction } from 'types/redux';

import { ACTIONS } from 'redux/workers/constants';

import { User } from '../../types/users';

export default combineReducers({
  workers: (state: User | null = null, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.SET_WORKER:
        return action.payload.worker;
      default:
        return state;
    }
  },
});
