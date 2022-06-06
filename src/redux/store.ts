import { useDispatch } from 'react-redux';
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';

import { ReduxAction } from '../types/redux';

import companiesReducer from './companies/reducer';
import { errorHandler } from './middlewares';
import usersReducer from './users/reducer';

const rootReducer = combineReducers({
  users: usersReducer,
  companies: companiesReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk, errorHandler];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export type ThunkDispatch = (...args: any[]) => Promise<ReduxAction>;

export const useThunkDispatch = (): ThunkDispatch => useDispatch();

export default store;
