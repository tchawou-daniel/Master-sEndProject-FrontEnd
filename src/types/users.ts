export type User = {
  id: string;
  email: string;
  firstName: string | null;
  language: string;
  lastName: string | null;
  pictureURL: string | null;
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
