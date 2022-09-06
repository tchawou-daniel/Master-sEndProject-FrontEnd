import http from 'services/http';

import { Company } from '../../types/Company';

export async function getCompanies(): Promise<Company[]> {
  const { data } = await http.get<Company[]>('/company');
  return data;
}

export async function updateCompany(companyToUpdate: Company): Promise<Company> {
  const { data } = await http.patch(`/company/${companyToUpdate.id}`, companyToUpdate);
  return data;
}

export async function addCompany(companyToAdd: Partial<Company>): Promise<Company> {
  const { data } = await http.post('/company', companyToAdd);
  return data;
}

export async function deleteCompany(companyId: string): Promise<any> {
  return http.delete(`/company/${companyId}`);
}
