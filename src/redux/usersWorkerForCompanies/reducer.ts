import { combineReducers } from 'redux';

import { ReduxAction } from 'types/redux';

import { UsersWorkForCompanies } from '../../types/usersWorkForCompanies';

import { ACTIONS } from './constants';

export default combineReducers({
  usersWorkerForCompanies: (state: UsersWorkForCompanies | null = null, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.SET_COMPANY_USERS:
        return action.payload.usersWorkerForCompanies;
      default:
        return state;
    }
  },
});
