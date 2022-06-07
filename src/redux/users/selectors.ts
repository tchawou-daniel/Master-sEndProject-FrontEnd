import { RootState } from 'types/redux';
import { User, UsersMap } from 'types/users';

export const selectCurrentUser = (state: RootState): User => state.users.currentUser;

export const selectUsersMap = (state: RootState): UsersMap => state.users.map;

export const selectUsers = (state: RootState): User[] => state.users.users;
