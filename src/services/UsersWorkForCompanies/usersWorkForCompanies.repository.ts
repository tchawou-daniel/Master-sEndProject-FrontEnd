import http from 'services/http';

import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import { User } from '../../types/users';
import { UsersWorkForCompanies } from '../../types/usersWorkForCompanies';

export const getCompanyUsers = async (companyId: string): Promise<UsersWorkForCompanies[]> => {
  const { data } = await http.get(`/usersWorkForCompanies/usersInASpecificCompany/${companyId}`);
  return data;
};

export const getUsersWorkForACompany = async (companyId: string): Promise<User[]> => {
  const { data } = await http.get(`/usersWorkForCompanies/usersInASpecificCompany/${companyId}`);
  return data;
};

export const updateCompanyUsers = async (companyId:string, user: UpdateUserRequest): Promise<User[]> => {
  const { data } = await http.patch(`/usersWorkForCompanies/${user.id}`, { ...user, bio: 'Jonin a Konoha', avatar: 'Hang' });
  return data;
};
export async function deleteCompanyUser(companyId: string, userId: string): Promise<any> {
  return http.delete(`/company/${companyId}/${userId}`);
}

export const createAnUser = async (user: Partial<User>): Promise<User> => {
  const { data } = await http.post('/users/worker', user);
  return data;
};

export async function createAnUserForTheCurrentCompany(usersWorkForCompany: Partial<UsersWorkForCompanies>): Promise<any> {
  const data = await http.post('/usersWorkForCompanies', usersWorkForCompany).then((res) => {
    if (res.status === 201) return { status: true };
    return { status: false };
  }).catch(error => ({ status: false, error }));
  return data;
}
