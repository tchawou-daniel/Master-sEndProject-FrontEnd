import { range } from 'lodash';
import moment from 'moment';

import { PeriodFrequencyEnum } from '../data/constants';
import { Period, RelativePeriodKeyword } from '../types/period';

/**
 * Given a date and a frequency, returns the startDate and endDate that includes the date.
 *
 * @param periodFrequency
 * @param date
 */
export const getDateRangeBoundaries = (periodFrequency: PeriodFrequencyEnum, date: Date): { startDate: number | null, endDate: number | null } => {
  if (!date || !periodFrequency || periodFrequency === PeriodFrequencyEnum.null) {
    return { startDate: null, endDate: null };
  }

  return {
    startDate: +moment.utc(date)
      .startOf(periodFrequency)
      .format('X'),
    endDate: +moment.utc(date)
      .endOf(periodFrequency)
      .format('X'),
  };
};

/**
 * Tells if a string is a period keyword or not
 * @param str
 * @returns
 */
export const isRelativePeriodKeyword = (str: string) => {
  if (Object.keys(RelativePeriodKeyword).includes(str)) {
    return true;
  }
  return /^YEAR:\d{4}$/.test(str) || /^QUARTER:Q\d\/\d{4}$/.test(str);
};

const roundNumberAccordingToSign = (nb: number) => (nb > 0 ? Math.floor(nb) : Math.ceil(nb));

export const getDatePeriodIndex = (
  frequency: PeriodFrequencyEnum,
  date: Date,
  referenceDate: Date,
): number => {
  let diff = moment.utc(date).startOf('month')
    .diff(moment.utc(referenceDate).startOf('month'), 'months');

  if (frequency === PeriodFrequencyEnum.year) {
    diff /= 12;
  }
  if (frequency === PeriodFrequencyEnum.quarter) {
    diff /= 3;
  }

  return roundNumberAccordingToSign(diff);
};

export const getTimestampPeriodIndex = (
  frequency: PeriodFrequencyEnum,
  timestamp: number,
  referenceDate: Date,
): number => getDatePeriodIndex(frequency, moment.utc(timestamp, 'X').toDate(), referenceDate);

/**
 * Find periods for a period relative keyword
 * @param frequency
 * @param referenceDate
 * @param keyword
 * @returns
 */
export const findPeriodRelativeNumbersForRelativeKeyword = (
  frequency: PeriodFrequencyEnum,
  referenceDate: Date,
  keyword: string,
): { range: number[], startDate: number | null, endDate: number | null } => {
  let nbMonthsToFetch = 0;
  let nbMonthsToShift = 0;

  // Keywords that links to one relative period
  switch (keyword) {
    case RelativePeriodKeyword.CURRENT_PERIOD:
      return {
        range: [0],
        ...getDateRangeBoundaries(frequency, referenceDate),
      };
    case RelativePeriodKeyword.LAST_PERIOD:
      if (frequency === PeriodFrequencyEnum.null) {
        throw new Error('Cannot go to last period if the company is not using periods.');
      }
      return {
        range: [-1],
        ...getDateRangeBoundaries(frequency, moment.utc(referenceDate).add(-1, frequency).toDate()),
      };
    case RelativePeriodKeyword.LAST_3_MONTHS:
      nbMonthsToFetch = 3;
      break;
    case RelativePeriodKeyword.LAST_6_MONTHS:
      nbMonthsToFetch = 6;
      break;
    case RelativePeriodKeyword.LAST_12_MONTHS:
      nbMonthsToFetch = 12;
      break;
    case RelativePeriodKeyword.LAST_YEAR:
      nbMonthsToFetch = 12;
      // we want to fetch the 12 months from the end of past year
      nbMonthsToShift = moment.utc(referenceDate).startOf('month')
        .diff(moment.utc(referenceDate).add(-1, 'year').endOf('year').startOf('month'), 'months');
      break;
    case RelativePeriodKeyword.CURRENT_YEAR:
      nbMonthsToFetch = 12;
      // We want to fetch the 12 months from the end of current year
      nbMonthsToShift = moment.utc(referenceDate).startOf('month')
        .diff(moment.utc(referenceDate).endOf('year').startOf('month'), 'months');
      break;
    case RelativePeriodKeyword.YEAR_TO_DATE:
      // we want to fetch the n months from date, n is equal to the number of months passed from date to start of year = number of month of date
      nbMonthsToFetch = parseInt(moment.utc(referenceDate).format('M'), 10);
      break;
    default:
      switch (true) {
        case /^YEAR:\d{4}$/.test(keyword):
          nbMonthsToFetch = 12;
          nbMonthsToShift = moment.utc(referenceDate).startOf('month')
            .diff(moment.utc(keyword.replace('YEAR:', ''), 'YYYY').endOf('year').startOf('month'), 'months');
          break;
        case /^QUARTER:Q\d\/\d{4}$/.test(keyword):
          nbMonthsToFetch = 3;
          nbMonthsToShift = moment.utc(referenceDate).startOf('month')
            .diff(moment.utc(keyword.replace('QUARTER:', ''), '[Q]Q/YYYY').endOf('quarter').startOf('month'), 'months');
          break;
        default:
          throw new Error(`Cannot recognize period relative keyword ${keyword}`);
      }
  }

  if (nbMonthsToFetch === 0) {
    return {
      range: [],
      startDate: null,
      endDate: null,
    };
  }

  const startDate = +moment
    .utc(referenceDate)
    .subtract(nbMonthsToShift + nbMonthsToFetch - 1, 'month')
    .startOf('month')
    .format('X');

  const endDate = +moment
    .utc(referenceDate)
    .subtract(nbMonthsToShift, 'month')
    .endOf('month')
    .format('X');

  // Here we have the number of months to fetch. If the company frequency is different,
  // We need to divide it with the ratio of months that is in each interval of the frequency (1 quarter = 3 months)
  let nbOfPeriodsToFetch = nbMonthsToFetch;
  let nbOfPeriodsToShift = nbMonthsToShift;

  if (frequency === PeriodFrequencyEnum.year) {
    nbOfPeriodsToFetch /= 12;
    nbOfPeriodsToShift /= 12;
  }
  if (frequency === PeriodFrequencyEnum.quarter) {
    nbOfPeriodsToFetch /= 3;
    nbOfPeriodsToShift /= 3;
  }

  // nbPeriodsToFetch tells how many periods we need to fetch (CURRENT_YEAR = 12 months)
  // nbPeriodsToShift tells the number of periods we have from the last month of the previous list to the current period
  return {
    range: range(((-1 * roundNumberAccordingToSign(nbOfPeriodsToFetch)) + 1), 1).map(n => n - roundNumberAccordingToSign(nbOfPeriodsToShift)),
    startDate,
    endDate,
  };
};

export const isLastQuarterOfYear = (period: Period): boolean => moment(period.startDate, 'X').quarter() === 4;

export const isLastMonthOfYear = (period: Period): boolean => moment(period.startDate, 'X').month() === 11;

export const isLastMonthOfQuarter = (period: Period): boolean => (moment(period.startDate, 'X').month() + 1) % 3 === 0;
