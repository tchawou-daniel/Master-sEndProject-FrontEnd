import { createContext } from 'react';

import { CompanyActions } from './CompaniesTable';

export interface CompanyContextInterface {
  actions: CompanyActions;
  setCompanyToDelete: (value: { rowId: string, name: string } | null) => void;
}

const CompanyContext = createContext<CompanyContextInterface>({} as CompanyContextInterface);

export default CompanyContext;
