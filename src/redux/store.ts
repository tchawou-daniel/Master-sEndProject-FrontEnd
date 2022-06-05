import { useDispatch } from 'react-redux';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { ReduxAction } from 'types/redux';

import auditReducer from './audit/reducer';
import commentsReducer from './comments/reducer';
import companiesReducer from './companies/reducer';
import currenciesReducer from './currencies/reducer';
import customObjectDefinitionsReducer from './customObjectDefinitions/reducer';
import customObjectsReducer from './customObjects/reducer';
import designerReducer from './designer/reducer';
import filtersReducer from './filters/reducer';
import { errorHandler } from './middlewares';
import notificationsReducer from './notifications/reducer';
import overwritesReducer from './overwrites/reducer';
import paymentsReducer from './payments/reducer';
import periodsReducer from './periods/reducer';
import planAssignmentsReducer from './planAssignments/reducer';
import plansReducer from './plans/reducer';
import rulesReducer from './rules/reducer';
import snackbarsReducer from './snackbars/reducer';
import statementsReducer from './statements/reducer';
import superAdminReducer from './superAdmin/reducer';
import targetLettersCampaignReducer from './targetLetters/reducer';
import teamsReducer from './teams/reducer';
import todosReducer from './todos/reducer';
import usersReducer from './users/reducer';
import userStatementsReducer from './userStatements/reducer';
import variablesReducer from './variables/reducer';
import workflowsReducer from './workflows/reducer';

const rootReducer = combineReducers({
  audit: auditReducer,
  comments: commentsReducer,
  companies: companiesReducer,
  currencies: currenciesReducer,
  customObjects: customObjectsReducer,
  customObjectDefinitions: customObjectDefinitionsReducer,
  filters: filtersReducer,
  notifications: notificationsReducer,
  overwrites: overwritesReducer,
  payments: paymentsReducer,
  periods: periodsReducer,
  plans: plansReducer,
  planAssignments: planAssignmentsReducer,
  snackbars: snackbarsReducer,
  statements: statementsReducer,
  teams: teamsReducer,
  todos: todosReducer,
  users: usersReducer,
  userStatements: userStatementsReducer,
  variables: variablesReducer,
  workflows: workflowsReducer,
  rules: rulesReducer,
  designer: designerReducer,
  superAdmin: superAdminReducer,
  targetLettersCampaign: targetLettersCampaignReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  thunk,
  errorHandler,
];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export type ThunkDispatch = (...args: any[]) => Promise<ReduxAction>;

export const useThunkDispatch = (): ThunkDispatch => useDispatch();

export default store;
