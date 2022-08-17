import axios from 'axios';

import http from 'services/http';

import { User } from '../../types/users';

export async function addUser(user: Partial<User>): Promise<any> {
  console.log(user);
  const data = await http.post('/auth/signup', user).then((res) => {
    if (res.status === 201) return { status: true };
    return { status: false };
  }).catch(error => ({ status: false, error: true }));
  return data;
}

export async function createAWorker(user: Partial<User>): Promise<any> {
  const data = await http.post('/users/worker', user).then((res) => {
    if (res.status === 201) return { status: true };
    return { status: false };
  }).catch(error => ({ status: false, error: true }));
  return data;
}

export async function getUserToken(user: Partial<User>){
  return http.post('/auth/signin', user);
}
