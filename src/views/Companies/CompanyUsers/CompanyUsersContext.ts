import { createContext } from 'react';

import { CompanyUsersActions } from './CompanyUsersTable';

export interface CompanyUsersContextInterface {
  actions: CompanyUsersActions;
  setCompanyUserToDelete: (value: { rowId: string, name: string } | null) => void;
}

const CompanyUsersContext = createContext<CompanyUsersContextInterface>({} as CompanyUsersContextInterface);

export default CompanyUsersContext;
