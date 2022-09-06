import moment from 'moment';

import { PeriodFrequencyEnum } from '../data/constants';
import { Period, RelativePeriodKeyword } from '../types/period';

import {
  findPeriodRelativeNumbersForRelativeKeyword,
  getDatePeriodIndex,
  getTimestampPeriodIndex,
  isLastMonthOfQuarter,
  isLastMonthOfYear,
  isLastQuarterOfYear,
  isRelativePeriodKeyword,
  getDateRangeBoundaries,
} from './periods.utils';

describe('PeriodUtils', () => {
  describe('getDateRangeBoundaries', () => {
    const timestamp = 1603109746011;

    it('edge cases', () => {
      expect(getDateRangeBoundaries(PeriodFrequencyEnum.null, new Date(timestamp))).toEqual({ startDate: null, endDate: null });
      expect(getDateRangeBoundaries(PeriodFrequencyEnum.month, null)).toEqual({ startDate: null, endDate: null });
    });

    it('parses annually', () => {
      expect(getDateRangeBoundaries(PeriodFrequencyEnum.year, new Date(timestamp))).toEqual({
        startDate: 1577836800,
        endDate: 1609459199,
      });
    });

    it('parses quarterly', () => {
      expect(getDateRangeBoundaries(PeriodFrequencyEnum.quarter, new Date(timestamp))).toEqual({
        startDate: 1601510400,
        endDate: 1609459199,
      });
    });

    it('parses monthly', () => {
      expect(getDateRangeBoundaries(PeriodFrequencyEnum.month, new Date(timestamp))).toEqual({
        startDate: 1601510400,
        endDate: 1604188799,
      });
    });
  });

  describe('isRelativePeriodKeyword', () => {
    it('example', () => {
      expect(isRelativePeriodKeyword(RelativePeriodKeyword.CURRENT_PERIOD)).toBeTruthy();
      expect(isRelativePeriodKeyword(RelativePeriodKeyword.LAST_YEAR)).toBeTruthy();

      expect(isRelativePeriodKeyword('YEAR:2016')).toBeTruthy();
      expect(isRelativePeriodKeyword('QUARTER:Q1/2016')).toBeTruthy();

      expect(isRelativePeriodKeyword('TEST')).toBeFalsy();
    });
  });

  const referenceDate = new Date('2019-11-21');

  describe('findPeriodRelativeNumbersForRelativeKeyword', () => {
    const dateToTimestamp = (date:string, boundary: 'start' | 'end') => +moment
      .utc(`${date}T${boundary === 'start' ? '00:00:00' : '23:59:59'}`).format('X');

    it('relative', () => {
      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.CURRENT_PERIOD),
      ).toEqual({
        range: [0],
        startDate: dateToTimestamp('2019-11-01', 'start'),
        endDate: dateToTimestamp('2019-11-30', 'end'),
      });

      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.LAST_PERIOD),
      ).toEqual({
        range: [-1],
        startDate: dateToTimestamp('2019-10-01', 'start'),
        endDate: dateToTimestamp('2019-10-31', 'end'),
      });

      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.LAST_3_MONTHS),
      ).toEqual({
        range: [-2, -1, 0],
        startDate: dateToTimestamp('2019-09-01', 'start'),
        endDate: dateToTimestamp('2019-11-30', 'end'),
      });

      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.LAST_6_MONTHS),
      ).toEqual({
        range: [-5, -4, -3, -2, -1, 0],
        startDate: dateToTimestamp('2019-06-01', 'start'),
        endDate: dateToTimestamp('2019-11-30', 'end'),
      });

      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.LAST_12_MONTHS),
      ).toEqual({
        range: [-11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0],
        startDate: dateToTimestamp('2018-12-01', 'start'),
        endDate: dateToTimestamp('2019-11-30', 'end'),
      });
    });

    it('years', () => {
      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.LAST_YEAR),
      ).toEqual({
        range: [-22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11],
        startDate: dateToTimestamp('2018-01-01', 'start'),
        endDate: dateToTimestamp('2018-12-31', 'end'),
      });
      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.CURRENT_YEAR),
      ).toEqual({
        range: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1],
        startDate: dateToTimestamp('2019-01-01', 'start'),
        endDate: dateToTimestamp('2019-12-31', 'end'),
      });

      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, RelativePeriodKeyword.YEAR_TO_DATE),
      ).toEqual({
        range: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0],
        startDate: dateToTimestamp('2019-01-01', 'start'),
        endDate: dateToTimestamp('2019-11-30', 'end'),
      });
    });

    it('specific year and quarter', () => {
      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, 'YEAR:2018'),
      ).toEqual({
        range: [-22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11],
        startDate: dateToTimestamp('2018-01-01', 'start'),
        endDate: dateToTimestamp('2018-12-31', 'end'),
      });
      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, 'YEAR:2020'),
      ).toEqual({
        range: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        startDate: dateToTimestamp('2020-01-01', 'start'),
        endDate: dateToTimestamp('2020-12-31', 'end'),
      });

      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, 'QUARTER:Q1/2019'),
      ).toEqual({
        range: [-10, -9, -8],
        startDate: dateToTimestamp('2019-01-01', 'start'),
        endDate: dateToTimestamp('2019-03-31', 'end'),
      });
      expect(
        findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, referenceDate, 'QUARTER:Q4/2019'),
      ).toEqual({
        range: [-1, 0, 1],
        startDate: dateToTimestamp('2019-10-01', 'start'),
        endDate: dateToTimestamp('2019-12-31', 'end'),
      });
    });

    it('invalid', () => {
      const fn1 = () => findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, new Date(), 'INVALID_KEYWORD');
      expect(fn1).toThrow();

      const fn2 = () => findPeriodRelativeNumbersForRelativeKeyword(PeriodFrequencyEnum.month, new Date(), 'YEAR:256');
      expect(fn2).toThrow();
    });
  });

  describe('getDatePeriodIndex', () => {
    it('example', () => {
      expect(getDatePeriodIndex(PeriodFrequencyEnum.month, new Date('2019-12-21'), referenceDate)).toEqual(1);
      expect(getDatePeriodIndex(PeriodFrequencyEnum.month, referenceDate, referenceDate)).toEqual(0);
      expect(getDatePeriodIndex(PeriodFrequencyEnum.month, new Date('2019-10-21'), referenceDate)).toEqual(-1);
      expect(getDatePeriodIndex(PeriodFrequencyEnum.month, new Date('2019-07-21'), referenceDate)).toEqual(-4);

      expect(getDatePeriodIndex(PeriodFrequencyEnum.quarter, new Date('2019-07-21'), referenceDate)).toEqual(-1);
    });
  });

  describe('getTimestampPeriodIndex', () => {
    it('example', () => {
      // 2019-11-21
      expect(getTimestampPeriodIndex(PeriodFrequencyEnum.month, 1574290800, referenceDate)).toEqual(0);
      // 2019-10-21
      expect(getTimestampPeriodIndex(PeriodFrequencyEnum.month, 1571608800, referenceDate)).toEqual(-1);
      // 2019-12-21
      expect(getTimestampPeriodIndex(PeriodFrequencyEnum.month, 1576882800, referenceDate)).toEqual(1);

      // 2019-01-01
      expect(getTimestampPeriodIndex(PeriodFrequencyEnum.quarter, 1546297200, referenceDate)).toEqual(-3);
    });
  });

  // 1646092800 (1 Mars 2022)
  describe('isLastQuarterOfYear', () => {
    it('Q1 2022', () => {
      const period: Period = {
        frequency: PeriodFrequencyEnum.quarter,
        // 1 Avril 2022
        startDate: 1648771200,
      } as Period;

      expect(isLastQuarterOfYear(period)).toBeFalsy();
    });

    it('Q4 2022', () => {
      const period: Period = {
        frequency: PeriodFrequencyEnum.quarter,
        // 1 December 2022
        startDate: 1669852800,
      } as Period;

      expect(isLastQuarterOfYear(period)).toBeTruthy();
    });
  });

  describe('isLastMonthOfYear', () => {
    it('April 2022', () => {
      const period: Period = {
        frequency: PeriodFrequencyEnum.quarter,
        // 1 Avril 2022
        startDate: 1648771200,
      } as Period;

      expect(isLastMonthOfYear(period)).toBeFalsy();
    });

    it('December 2022', () => {
      const period: Period = {
        frequency: PeriodFrequencyEnum.quarter,
        // 1 December 2022
        startDate: 1669852800,
      } as Period;

      expect(isLastMonthOfYear(period)).toBeTruthy();
    });
  });

  describe('isLastMonthOfQuarter', () => {
    it('April 2022', () => {
      const period: Period = {
        frequency: PeriodFrequencyEnum.quarter,
        // 1 Avril 2022
        startDate: 1648771200,
      } as Period;

      expect(isLastMonthOfQuarter(period)).toBeFalsy();
    });

    it('December 2022', () => {
      const period: Period = {
        frequency: PeriodFrequencyEnum.quarter,
        // 1 December 2022
        startDate: 1669852800,
      } as Period;

      expect(isLastMonthOfQuarter(period)).toBeTruthy();
    });
  });
});
