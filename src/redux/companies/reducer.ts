import { combineReducers } from 'redux';

import { ReduxAction } from 'types/redux';

import { ACTIONS } from 'redux/companies/constants';
import { ACTIONS as USER_ACTIONS } from 'redux/users/constants';

import { Company } from '../../types/Company';

export default combineReducers({
  isLoading: (state: number = 0, action: ReduxAction) => {
    switch (action.type) {
      case ACTIONS.START:
        return state + 1;
      case ACTIONS.ERROR:
      case ACTIONS.SET_COMPANY:
        return state - 1;
      default:
        return state;
    }
  },
  company: (state: Company | null = null, action: ReduxAction) => {
    switch (action.type) {
      case USER_ACTIONS.SET_CURRENT_USER:
        return action.payload.user.company || state;
      case ACTIONS.SET_COMPANY:
        return action.payload.company;
      default:
        return state;
    }
  },
});
