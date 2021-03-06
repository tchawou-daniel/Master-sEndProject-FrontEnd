import {
  User,
} from 'types/users';

import http from 'services/http';

import { UpdateUserRequest } from '../../react/common/useCurrentUser';

export const getUsers = async (): Promise<User[]> => {
  const { data } = await http.get('/users');
  return data;
};

export const getCurrentUser = async (email:string): Promise<User> => {
  const { data } = await http.get<User>(`/users/me/${email}`);
  return data;
};

export const uploadAvatar = async (avatar: string): Promise<User> => {
  const { data } = await http.put('/users/upload', { avatar });
  return data;
};

export const updateUser = async (user: UpdateUserRequest): Promise<User> => {
  const { data } = await http.patch(`/users/me/${user.id}`, { ...user, bio: 'Jonin a Konoha', avatar: 'Hang' });
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

export {};
