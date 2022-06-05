import { mapCsvUserField } from 'services/users/users.service';

describe('User Service', () => {
  describe('mapCsvUserField', () => {
    it('mapCsvUserField language', () => {
      expect(mapCsvUserField('fr', 'language')).toEqual('fr');

      expect(mapCsvUserField('FR', 'language')).toEqual('fr');

      expect(mapCsvUserField('', 'language')).toEqual(undefined);

      expect(() => mapCsvUserField('blah', 'language')).toThrow();
    });

    it('mapCsvUserField currency', () => {
      expect(mapCsvUserField('eur', 'currency')).toEqual('EUR');

      expect(mapCsvUserField('EUR', 'currency')).toEqual('EUR');

      expect(mapCsvUserField('', 'language')).toEqual(undefined);

      expect(() => mapCsvUserField('BLAH', 'currency')).toThrow();
    });

    it('mapCsvUserField role', () => {
      expect(mapCsvUserField('employee', 'role')).toEqual('EMPLOYEE');

      expect(mapCsvUserField('EMPLOYEE', 'role')).toEqual('EMPLOYEE');

      expect(mapCsvUserField('', 'role')).toEqual(undefined);

      expect(() => mapCsvUserField('BOSS', 'role')).toThrow();
    });

    it('mapCsvUserField value with trailing spaces', () => {
      expect(mapCsvUserField('test@amalia.io ', 'email')).toEqual('test@amalia.io');
    });

    it('mapCsvUserField any other field', () => {
      expect(mapCsvUserField('nord', 'location')).toEqual('nord');

      expect(mapCsvUserField('', 'location')).toEqual(undefined);
    });
  });
});
