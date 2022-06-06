import { RootState } from 'types/redux';

import { Company } from '../../types/users';

export const selectCompany = (state: RootState): Company => state.companies.company;
