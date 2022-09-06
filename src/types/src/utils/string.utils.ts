import { camelCase } from 'lodash';

export class StringUtils {
  static camelCase(name: string): string {
    if (name) {
      // Remove all characters that are not alpha num, replace with a space instead.
      name = name.replace(/[^a-zA-Z0-9]/g, ' ');

      // Transform to camel case.
      name = camelCase(name);
    }

    return name;
  }
}
