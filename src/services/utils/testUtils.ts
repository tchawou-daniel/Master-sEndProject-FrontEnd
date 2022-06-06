import { mapValues } from 'lodash';
import { DeepPartial } from 'redux';

/**
 * You need to create a test object for a unit test but you're too lazy to
 * create a full mock? This function is for you! Write a partial, chose the
 * output type, and you're good to go!
 *
 * @example
 *  const user = createTestObject<User>({ firstName: 'Jean' });
 * @param object
 */
export const createTestObject = <T>(object: any) => object as T;

/**
 * Give an object, generate a list of objects by appending the index to each key.
 *
 * @param obj - Object.
 * @param quantity - Number of objects to generate.
 * @param override - Property who would be the same for each object.
 */
export const generateFakeList = <T>(
  obj: DeepPartial<T>,
  quantity: number,
  override?: DeepPartial<T>,
  addProperties?: (object: T, index: number) => Partial<T>,
): T[] => {
  const list: T[] = [];

  for (let i = 0; i < quantity; i++) {
    const createdObject: T = {
      ...mapValues(obj as unknown as object, v => `${v}-${i + 1}`),
      ...override,
    } as T;

    list.push({
      ...createdObject,
      ...(addProperties ? addProperties(createdObject, i) : {}),
    });
  }

  return list;
};

/**
 * Simple promise that awaits for `duration` to resolve. Put it into your repository to test
 * interaction when the page is loading.
 *
 * @param duration
 */
export const awaiter = (duration: number): Promise<void> => new Promise((resolve) => {
  setTimeout(() => resolve(), duration);
});
