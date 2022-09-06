import { createContext } from 'react';

import { AgencyUsersActions } from './AgencyUsersTable';

export interface AgencyUsersContextInterface {
  actions: AgencyUsersActions;
  setAgencyUsersToDelete: (value: { rowId: string, name: string } | null) => void;
}

const AgencyUsersContext = createContext<AgencyUsersContextInterface>({} as AgencyUsersContextInterface);

export default AgencyUsersContext;
