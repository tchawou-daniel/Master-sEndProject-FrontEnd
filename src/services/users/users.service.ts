import { User } from 'types/users';

export function isUserHaveCompany(user: User): boolean {
  /*
  return !!(user?.company?.id && typeof user.company.id !== 'undefined');
*/
  return true;
}

export const formatUserFullName = (user: MinUserType): string => `${user.firstName} ${user.lastName}`;

export const isUserActive = (user: User) => !!user && user.clearedAt === null;

type MinUserType = Pick<User, 'firstName' | 'lastName'>;

export const sortUsersComparator = (a: MinUserType, b: MinUserType) => formatUserFullName(a).localeCompare(formatUserFullName(b));

export const sortUsers = <T extends MinUserType>(users: T[]): T[] => [...users].sort(sortUsersComparator);
