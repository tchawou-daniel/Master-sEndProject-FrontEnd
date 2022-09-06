import { chunk as lodashChunk, isNil } from 'lodash';

export const ensureArray = <T>(arr: T | T[]): T[] => (arr ? [].concat(arr) : []);

/**
 * Return true if one of the input array is not null and empty.
 * @param inputFilters
 */
export const isOneEmptyFilter = <T>(...inputFilters: T[][]): boolean => inputFilters.some(filter => (!isNil(filter) && filter.length === 0));

/**
 * Async filter permits to filter an array using an async predicate function
 * @param arr The array of data
 * @param predicate The predicate function to run over arr items
 * @returns A filtered array
 */
export const asyncFilter = async <T>(arr: T[], predicate: (entity: T) => Promise<boolean>): Promise<T[]> => {
  const predicates = await Promise.all((arr || []).map(predicate));
  return (arr || []).filter((_, idx) => predicates[idx]);
};

/**
 * Allows the chunk of Promises, mostly to avoid blasting 4000 queries to the
 * database in a big-ass Promise.all.
 *
 * Example of usage:
 *
 * const values = await promiseDotAllChunk(
 *   ids,
 *   id => fetchStuffInDb(id, 'more', 'parameters'), // With an async function in the callback.
 *   2,
 * );
 *
 * @param arr
 * @param callback
 * @param chunkSize
 */
export const promiseDotAllChunk = async <I, O>(
  arr: I[],
  callback: (row: I, index?: number) => Promise<O>,
  chunkSize: number,
): Promise<O[]> => {
  const chunks = lodashChunk(arr, chunkSize);

  const resolutions = [];

  // For each chunk, execute the callback, then accumulate its value.
  for (const chunk of chunks) {
    // eslint-disable-next-line no-await-in-loop -- hey it's by design.
    const resultsOfChunk = await Promise.all(
      chunk.map((row, index) => callback(row, index + resolutions.length)),
    );

    resolutions.push(...resultsOfChunk);
  }

  return resolutions;
};

/**
 * Given an array and a predicate, ensure that elements that matches the predicate
 * are put at the top of the array.
 *
 * @param array
 * @param predicate
 */
export const putOnTop = <T>(array: T[], predicate: (elt: T) => boolean) => [...array]
  .sort(a => (predicate(a) ? -1 : 1));
