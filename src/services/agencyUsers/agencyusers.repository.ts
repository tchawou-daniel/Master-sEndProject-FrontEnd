import { User } from '../../types/users';
import http from '../http';

export async function createAnAgencyUser(user: Partial<User>): Promise<any> {
  const data = await http.post('/users/worker', user).then((res) => {
    if (res.status === 201) return { status: true };
    return { status: false };
  }).catch(error => ({ status: false, error }));
  return data;
}
