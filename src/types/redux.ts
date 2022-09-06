import { DefaultRootState } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface ReduxAction extends Action {
  payload?: any;
  error?: any;
  isErrorRecoverable?: boolean;
}

export interface RootState extends DefaultRootState {
  users: any;
  company: any;
  workers: any;
  usersWorkerForCompanies: any;
}

export type ThunkResult<R> = ThunkAction<R, RootState, unknown, ReduxAction>;

export interface PaginationStoredInRedux<T> {
  currentPage: number | null;
  pageCount: number | null;
  totalItems: number;
  items: T[];
}

export const INITIAL_REDUX_PAGINATION = {
  currentPage: null,
  pageCount: null,
  items: [],
  totalItems: 0,
};
