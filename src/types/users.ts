export type User = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: UserRole;
  language: string;
  pictureURL: string | null;
  clearedAt: Date;
};

export interface Employee extends User {
  assigned: boolean;
  userName: string;
  index: number;
  effectiveAsOf?: string;
  effectiveUntil?: string;
  values?: any;
}

export type UsersMap = Record<string, User>;

export enum UserRole {
  ADMIN = 'ADMIN',
  TEMPORARY_WORKER = 'TEMPORARY_WORKER',
  PERMANENT_WORKER = 'PERMANENT_WORKER',
  EMPLOYMENT_AGENCY = 'EMPLOYMENT_AGENCY',
  PARTNER_COMPANY_EMPLOYEE = 'PARTNER_COMPANY_EMPLOYEE',
  PARTNER_COMPANY_EMPLOYEE_ADMIN = 'PARTNER_COMPANY_EMPLOYEE_ADMIN',
}

export declare type UserComputed = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'pictureURL'>;
