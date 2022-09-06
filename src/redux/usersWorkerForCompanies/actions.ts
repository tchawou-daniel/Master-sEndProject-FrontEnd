import { ActionCreator } from 'redux';

import { ACTIONS } from 'redux/usersWorkerForCompanies/constants';

import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import * as UsersWorkForCompaniesRepository from '../../services/UsersWorkForCompanies/usersWorkForCompanies.repository';
import { ReduxAction, ThunkResult } from '../../types/redux';

const usersWorkerForCompaniesStart: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.START,
});

const usersWorkerForCompaniesError: ActionCreator<ReduxAction> = (error: Error) => ({
  type: ACTIONS.ERROR,
  error,
});

const setCompanyUsers: ActionCreator<ReduxAction> = (usersWorkerForCompanies: UpdateUserRequest) => ({
  type: ACTIONS.SET_COMPANY_USERS,
  payload: { usersWorkerForCompanies },
});

export const fetchCompanyUsers = (companyId: string): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(usersWorkerForCompaniesStart());
  try {
    const companyUsers = await UsersWorkForCompaniesRepository.getCompanyUsers(companyId);
    return dispatch(setCompanyUsers(companyUsers));
  } catch (error) {
    return dispatch(usersWorkerForCompaniesError(error));
  }
};

// export const updateCompanyUser = (userToUpdate: UpdateUserRequest)
// : ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
//   dispatch(usersWorkerForCompaniesStart());
//   try {
//     const udateCompanyUsers = await UsersWorkForCompaniesRepository.updateCompanyUsers(userToUpdate);
//     return dispatch(setCompanyUsers(udateCompanyUsers));
//   } catch (error) {
//     return dispatch(usersWorkerForCompaniesError(error));
//   }
// };

const removeCompanyUser: ActionCreator<ReduxAction> = (userId: string) => ({
  type: ACTIONS.DELETE_COMPANY_USERS,
  payload: { userId },
});

export const deleteCompanyUser = (
  companyId: string,
  userId: string,
): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(usersWorkerForCompaniesStart());
  try {
    await UsersWorkForCompaniesRepository.deleteCompanyUser(companyId, userId);
    return dispatch(removeCompanyUser(companyId));
  } catch (error) {
    return dispatch(usersWorkerForCompaniesError(error));
  }
};
