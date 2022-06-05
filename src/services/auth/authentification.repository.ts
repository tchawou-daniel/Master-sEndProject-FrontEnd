import axios from 'axios';

import http from 'services/http';

import { User } from '../../types/users';

export async function addUser(user: Partial<User>): Promise<User> {
  const { data } = await http.post('/users', user, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
  });
  console.log(data);
  return data;
}

export async function getUserToken(user: Partial<User>){
  return http.post('/auth/signin', user);
}

// export async function getCurrentUser(user: Partial<User>): Promise<User> {
//   const token = await http.post('/auth/signin', user);
//   localStorage.getItem('MY_USER_TOKEN_INFO', JSON.stringify(token));
//   return user;
// }
