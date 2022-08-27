import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import { User } from '../../types/users';
import http from '../http';

export async function getWorkers(): Promise<User[]> {
  const { data } = await http.get<User[]>('/users');
  return data;
}

export const updateWorker = async (worker: UpdateUserRequest): Promise<User> => {
  const { data } = await http.patch(`/worker/${worker.id}`, { ...worker });
  return data;
};
