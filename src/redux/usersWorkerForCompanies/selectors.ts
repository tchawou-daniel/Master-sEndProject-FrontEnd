import { RootState } from '../../types/redux';
import { UsersWorkForCompanies } from '../../types/usersWorkForCompanies';

export const selectCompanyUsers = (state: RootState): UsersWorkForCompanies[] => state.usersWorkerForCompanies.usersWorkerForCompanies;
