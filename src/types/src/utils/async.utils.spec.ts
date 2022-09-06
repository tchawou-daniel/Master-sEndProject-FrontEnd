import { retry } from './async.utils';

describe('AsyncUtils', () => {
  const testFns = {
    successFn: jest.fn(() => new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 20);
    })),
    failFn: jest.fn(async () => new Promise<void>((_, reject) => {
      setTimeout(() => {
        reject(new Error('TEST'));
      }, 20);
    })),
  };
  it('retry - success', async () => {
    // expect to not throw
    await retry(testFns.successFn, 2);
    expect(testFns.successFn).toHaveBeenCalledTimes(1);
  });

  it('retry - fail 1 time', async () => {
    // expect to throw
    await expect(retry(testFns.failFn, 1)).rejects.toEqual(
      Error('TEST'),
    );
    expect(testFns.failFn).toHaveBeenCalledTimes(1);
  });

  it('retry - fail multiple times', async () => {
    // expect to throw
    await expect(retry(testFns.failFn, 3)).rejects.toEqual(
      Error('TEST'),
    );
    expect(testFns.failFn).toHaveBeenCalledTimes(4);
  });
});
