/**
 * A function that will try a function that returns a promise x times.
 * If it still crash, will throw last error
 *
 * @param fn The async function that will be called
 * @param nbTries The max number of tries before throwing an error
 */
export const retry = async<T> (
  fn: () => Promise<T>,
  nbTries: number,
  timeoutBetweenCalls: number = 0,
  exponentialCoefficient: number = 0,
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i < nbTries; i++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, timeoutBetweenCalls * (1 + i * exponentialCoefficient));
      });
      // eslint-disable-next-line no-await-in-loop -- we want to actually try the function each time
      return await fn();
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError;
};
