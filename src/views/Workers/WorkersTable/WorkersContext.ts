import { createContext } from 'react';

import { WorkersActions } from './WorkersTable';

export interface WorkerContextInterface {
  actions: WorkersActions;
  setWorkerToDelete: (value: { rowId: string, name: string } | null) => void;
}

const WorkerContext = createContext<WorkerContextInterface>({} as WorkerContextInterface);

export default WorkerContext;
