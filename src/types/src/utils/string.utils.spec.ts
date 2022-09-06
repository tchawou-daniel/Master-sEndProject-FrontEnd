import { StringUtils } from './string.utils';

it('Transform to camel case', () => {
  expect(StringUtils.camelCase('empreint test €')).toEqual('empreint');
});
