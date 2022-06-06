import { Company } from './Company';
import { User } from './users';

export type CompanyAssignment = {
  id?: string;
  userId?: string;
  comanyId?: string;
  effectiveAsOf?: number | null;
  effectiveUntil?: number | null;
};

export type CompanyAssignmentWithUser = CompanyAssignment & { user: User, comapnyId: string };

export type CompanyAssignmentWithCompany = CompanyAssignment & { company: Company };

export type CompanyAssignmentsByCompany = Record<string, CompanyAssignmentWithUser[]>;
