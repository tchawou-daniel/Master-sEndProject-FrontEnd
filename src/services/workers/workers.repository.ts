import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import { User } from '../../types/users';
import http from '../http';

export const getWorkers = async (): Promise<User[]> => {
  const { data } = await http.get('/users/');
  return data;
};

export const updateWorker = async (user: UpdateUserRequest): Promise<User[]> => {
  const { data } = await http.patch(`/users/worker/${user.id}`, { ...user, bio: 'Jonin a Konoha', avatar: 'Hang' });
  return data;
};

export async function deleteWorker(userId: string): Promise<any> {
  return http.delete(`/users/${userId}`);
}
