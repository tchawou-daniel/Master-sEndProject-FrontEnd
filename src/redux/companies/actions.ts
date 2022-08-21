import { ActionCreator } from 'redux';

import { ReduxAction, ThunkResult } from 'types/redux';

import { ACTIONS } from 'redux/companies/constants';
import { addSnackbar } from 'redux/snackbars/actions';

import * as CompaniesRepository from '../../services/companies/companies.repository';
import { Company } from '../../types/Company';

const companyStart: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.START,
});

const companyError: ActionCreator<ReduxAction> = (error: Error) => ({
  type: ACTIONS.ERROR,
  error,
});

const setCompany: ActionCreator<ReduxAction> = (company: Company) => ({
  type: ACTIONS.SET_COMPANY,
  payload: { company },
});

export const fetchCompanies = (): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(companyStart());
  try {
    const company = await CompaniesRepository.getCompanies();
    return dispatch(setCompany(company));
  } catch (error) {
    return dispatch(companyError(error));
  }
};

export const patchCompany = (
  company: Company,
): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(companyStart());

  try {
    const updatedCompany = await CompaniesRepository.updateCompany(company);
    dispatch(addSnackbar({ message: 'Company updated!', options: { variant: 'success' } }));
    return dispatch(setCompany(updatedCompany));
  } catch (error) {
    return dispatch(companyError(error));
  }
};
