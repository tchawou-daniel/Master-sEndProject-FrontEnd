import {
  BulkSyncUsersRequest, SyncUserRequest, UpdateUserRequest, UserSettings,
} from '@amal-ia/lib-types';

import {
  Employee, User,
} from 'types/users';

import http from 'services/http';

export const getEmployees = async (): Promise<User[]> => {
  const { data } = await http.get('/users');
  return data;
};

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await http.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await http.patch('/users/logout');
};

export const uploadAvatar = async (avatar: string): Promise<User> => {
  const { data } = await http.put('/users/upload', { avatar });
  return data;
};

export const updateUser = async (user: UpdateUserRequest): Promise<User> => {
  const { data } = await http.put('/users/', user);
  return data;
};

export const updateSettings = async (settings: UserSettings): Promise<User> => {
  const { data } = await http.patch('/users/settings', settings);
  return data;
};

export const fetchUsersByIds = async (userIds: string[]): Promise<User[]> => {
  const { data } = await http.get<User[]>(`/users/?${userIds.map(id => `ids=${id}`).join('&')}`);
  return data;
};

export const fetchActiveUsers = async () => {
  const { data } = await http.get<User[]>('/users/?active=true');
  return data;
};

export class UsersService {
  /*
   * @deprecated
   * Use fetchActiveUsers instead.
   * TODO: It's still used in plan assignments for now because of some ugly code, to refactor.
   */
  static async getActiveEmployees(): Promise<Employee[]> {
    const activeUsers = await http.get<User[]>('/users/?active=true');

    return activeUsers.data.map((user, index) => ({
      ...user,
      assigned: false,
      index,
      userName: `${user.firstName} ${user.lastName}`,
    }));
  }
}

/**
 * @param users
 */
export async function bulkSyncUsers(users: SyncUserRequest[]) {
  return http.post('/users/registrations', { users } as BulkSyncUsersRequest);
}

/**
 * @param users
 */
export async function sendInvitations(users: any) {
  return http.post('/users/invitations', { users });
}
