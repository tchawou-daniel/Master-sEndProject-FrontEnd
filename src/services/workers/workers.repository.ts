import { Company } from '../../types/Company';
import { User } from '../../types/users';
import http from '../http';

export async function getWorkers(): Promise<User[]> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('MY_USER_TOKEN_INFO')}` };
  const { data } = await http.get<User[]>('/users', { headers });
  return data;
}
