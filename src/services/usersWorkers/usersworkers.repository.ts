import { User } from '../../types/users';
import http from '../http';

export const getUsersWorkers = async (): Promise<User[] | Boolean> => {
  try {
    const { data } = await http.get('/usersWorkForCompanies');
    return data;
  } catch (error) {
    return false;
  }
};

export const setUserworker = async (user: any): Promise<User | Boolean> => {
  try {
    const { data } = await http.post('/usersWorkForCompanies/', user);
    return data;
  } catch (error) {
    return false;
  }
};

export const updateUserWorker = async (user: any): Promise<User | Boolean> => {
  try {
    const { data } = await http.patch(`/usersWorkForCompanies/${user.userId}`, user);
    return data;
  } catch (error) {
    return false;
  }
};
