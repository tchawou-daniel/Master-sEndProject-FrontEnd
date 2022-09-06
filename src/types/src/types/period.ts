import { Company } from '../../Company';
import { PeriodFrequencyEnum } from '../data/constants';

export interface Period {
  id?: string;
  name: string;
  startDate: number;
  endDate: number;
  company: Company;
  frequency: PeriodFrequencyEnum;
}

export enum RelativePeriodKeyword {
  LAST_YEAR = 'LAST_YEAR',
  CURRENT_YEAR = 'CURRENT_YEAR',
  YEAR_TO_DATE = 'YEAR_TO_DATE',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  LAST_12_MONTHS = 'LAST_12_MONTHS',
  LAST_3_MONTHS = 'LAST_3_MONTHS',
  LAST_PERIOD = 'LAST_PERIOD',
  CURRENT_PERIOD = 'CURRENT_PERIOD',
}
