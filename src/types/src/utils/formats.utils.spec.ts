import { CurrencySymbolsEnum } from '../data/constants';

import { formatAmount } from './formats.utils';

describe('FormatUtils', () => {
  it('formatAmount', () => {
    // For SGD it's a non-breaking space.
    expect(formatAmount(5, CurrencySymbolsEnum.SGD)).toEqual('SGD 5');

    // Test rounding.
    expect(formatAmount(5.125, CurrencySymbolsEnum.EUR)).toEqual('€5.13');
    expect(formatAmount(0.001, CurrencySymbolsEnum.EUR)).toEqual('€0');

    // Test negative value and avoid -0€.
    expect(formatAmount(-0.005, CurrencySymbolsEnum.EUR)).toEqual('-€0.01');
    expect(formatAmount(-0.00499, CurrencySymbolsEnum.EUR)).toEqual('€0');
    expect(formatAmount(-0.001, CurrencySymbolsEnum.EUR)).toEqual('€0');
  });
});
