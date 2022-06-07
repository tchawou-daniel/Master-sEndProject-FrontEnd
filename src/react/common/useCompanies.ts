import { useSelector } from 'react-redux';

import { selectCompanies } from 'redux/companies/selectors';

import { Company } from '../../types/Company';

export default () => ({
  company: useSelector(selectCompanies),
}) as { company: Company[] };
