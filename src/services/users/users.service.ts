import { isEmpty, lowerCase, pick, trim, upperCase } from 'lodash';

// import { User } from 'types/users';
//
// export function isUserHaveCompany(user: User): boolean {
//   return !!(user?.company?.id && typeof user.company.id !== 'undefined');
// }

/**
 * Given a user, returns the list of the currencies he can
 * set in his profile.
 *
 * @param company
 */
// export const getUserAvailableCurrencies = (company: Company) => {
//   if (!company) {
//     return [];
//   }
//   const labels = { ...CurrencySymbolsLabelEnum };
//   const keysToPick = [...company.symbols, company.currency];
//   return pick(labels, keysToPick);
// };
//
// type MinUserType = Pick<User, 'firstName' | 'lastName'>;
//
// export const formatUserFullName = (user: MinUserType): string =>
//   `${user.firstName} ${user.lastName}`;
//
// export const sortUsersComparator = (a: MinUserType, b: MinUserType) =>
//   formatUserFullName(a).localeCompare(formatUserFullName(b));
//
// export const sortUsers = <T extends MinUserType>(users: T[]): T[] =>
//   [...users].sort(sortUsersComparator);
//
// export const isUserActive = (user: User) => !!user && user.clearedAt === null;
//
// const mapUserLanguage = (value: string): string => {
//   const language = lowerCase(value);
//
//   if (!Object.keys(LanguagesEnum).includes(language)) {
//     throw new Error(`Unknown language ${value}`);
//   }
//
//   return language;
// };
//
// const mapUserRole = (value: string): string => {
//   const role = upperCase(value);
//
//   if (!Object.keys(UserRole).includes(role)) {
//     throw new Error(`Unknown role ${value}`);
//   }
//
//   return role;
// };
//
// const mapCurrencyCode = (value: string) => {
//   const currencyCode = upperCase(value);
//
//   if (!Object.keys(CurrencySymbolsEnum).includes(currencyCode)) {
//     throw new Error(`Unknown currency ${value}`);
//   }
//
//   return currencyCode;
// };
//
// /**
//  * Validate and Map user field value from csv.
//  * @param value
//  * @param field
//  */
// export const mapCsvUserField = (value: string, field: string | number): any => {
//   const sanitizedValue = trim(value);
//
//   if (isEmpty(sanitizedValue)) {
//     return undefined;
//   }
//
//   switch (field) {
//     case 'language':
//       return mapUserLanguage(sanitizedValue);
//     case 'role':
//       return mapUserRole(sanitizedValue);
//     case 'currency':
//       return mapCurrencyCode(sanitizedValue);
//     default:
//       return sanitizedValue;
//   }
// };
