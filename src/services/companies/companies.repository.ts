import http from 'services/http';

import { Company } from '../../types/users';

export async function getCompany(): Promise<Company> {
  const { data } = await http.get('/companies');
  return data;
}

export async function updateCompany(companyToUpdate: Company): Promise<Company> {
  const { data } = await http.put('/companies', companyToUpdate);
  return data;
}

export async function addCompany(companyToAdd: Company): Promise<Company> {
  const { data } = await http.post('/companies', companyToAdd);
  return data;
}
