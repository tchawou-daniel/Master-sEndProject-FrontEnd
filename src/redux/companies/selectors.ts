import { RootState } from 'types/redux';

import { Company } from '../../types/Company';

export const selectCompanies = (state: RootState): Company[] => state.company.company;
