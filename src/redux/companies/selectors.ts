import { RootState } from 'types/redux';

import { Company } from '../../types/Company';

export const selectCompany = (state: RootState): Company[] => state.companies.companies;
