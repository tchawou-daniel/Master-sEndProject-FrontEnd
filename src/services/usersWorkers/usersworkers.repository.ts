import { User } from '../../types/users';
import http from '../http';

export const getUsersWorkers = async (): Promise<User[] | Boolean> => {
  const headers = { Authorization: `Bearer ${localStorage.getItem('MY_USER_TOKEN_INFO')}` };
  try {
    const { data } = await http.get('/usersWorkForCompanies', { headers });
    return data;
  } catch (error) {
    return false;
  }
};

export const setUserworker = async (user: any): Promise<User | Boolean> => {
  const headers = { Authorization: `Bearer ${localStorage.getItem('MY_USER_TOKEN_INFO')}` };
  try {
    const { data } = await http.post('/usersWorkForCompanies/', user, { headers });
    return data;
  } catch (error) {
    return false;
  }
};

export const updateUserWorker = async (user: any): Promise<User | Boolean> => {
  const headers = { Authorization: `Bearer ${localStorage.getItem('MY_USER_TOKEN_INFO')}` };
  try {
    const { data } = await http.patch(`/usersWorkForCompanies/${user.userId}`, user, { headers });
    return data;
  } catch (error) {
    return false;
  }
};
