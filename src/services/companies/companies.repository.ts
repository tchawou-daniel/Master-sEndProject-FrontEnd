import http from 'services/http';

import { Company } from '../../types/Company';

export async function getCompanies(): Promise<Company[]> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('MY_USER_TOKEN_INFO')}` };
  const { data } = await http.get<Company[]>('/company', { headers });
  return data;
}

export async function updateCompany(companyToUpdate: Company): Promise<Company> {
  const { data } = await http.put('/companies', companyToUpdate);
  return data;
}

export async function addCompany(companyToAdd: Partial<Company>): Promise<Company> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('MY_USER_TOKEN_INFO')}` };
  const { data } = await http.post('/company', companyToAdd, { headers });
  return data;
}
