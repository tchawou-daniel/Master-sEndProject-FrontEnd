import moment from 'moment';

import { DateInput } from '../types/dates';

export const formatUnixTimestamp = (unixTimestamp: number, withTime?: boolean) => moment.utc(unixTimestamp, 'X')
  .format((withTime) ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');

const getDateInput = (dateInput: DateInput) => {
  if (!dateInput.momentInput && !dateInput.timestamp) {
    throw new Error('Missing parameter');
  }

  return dateInput.momentInput || dateInput.timestamp;
};

export const endOfMonthTimestamp = (dateInput: DateInput) => {
  const input = getDateInput(dateInput);

  return +moment.utc(input).endOf('month').format('X');
};

export const startOfMonthTimestamp = (dateInput: DateInput) => {
  const input = getDateInput(dateInput);

  return +moment.utc(input).startOf('month').format('X');
};

export const dateIsInAssignmentRange = (
  timestamp: number,
  assignment: { effectiveAsOf?: number, effectiveUntil?: number },
) => (assignment.effectiveAsOf ? assignment.effectiveAsOf <= timestamp : true)
    && (assignment.effectiveUntil ? timestamp < assignment.effectiveUntil : true);
