import { RootState } from '../../types/redux';
import { User } from '../../types/users';

export const selectWorkers = (state: RootState): User[] => state.workers.workers;
