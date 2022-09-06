import {
  asyncFilter, ensureArray, promiseDotAllChunk, putOnTop,
} from './array';

describe('array utils', () => {
  it('ensureArray', () => {
    expect(ensureArray(1)).toEqual([1]);
    expect(ensureArray([2])).toEqual([2]);
    expect(ensureArray(null)).toEqual([]);
  });

  it('asyncFilter', async () => {
    const result1 = await asyncFilter(['a', 'b'], async entity => new Promise(resolve => resolve(entity === 'a')));
    expect(result1).toEqual(['a']);

    const result2 = await asyncFilter(null, async entity => new Promise(resolve => resolve(entity === 'a')));
    expect(result2).toEqual([]);
  });

  it('promiseDotAllChunk', async () => {
    const callback = (row, index, more) => Promise.resolve({ row, index, more });
    const rows = Array(10).fill(0).map((_, i) => `row ${i}`);

    const output = await promiseDotAllChunk(
      rows,
      (row, index) => callback(row, index, 'coucou'),
      2,
    );

    // Unfortunately it doesn't tests that it's properly chunked but at least it verifies that
    // we can pass parameters and index are properly set up.
    expect(output).toEqual([
      { row: 'row 0', index: 0, more: 'coucou' },
      { row: 'row 1', index: 1, more: 'coucou' },
      { row: 'row 2', index: 2, more: 'coucou' },
      { row: 'row 3', index: 3, more: 'coucou' },
      { row: 'row 4', index: 4, more: 'coucou' },
      { row: 'row 5', index: 5, more: 'coucou' },
      { row: 'row 6', index: 6, more: 'coucou' },
      { row: 'row 7', index: 7, more: 'coucou' },
      { row: 'row 8', index: 8, more: 'coucou' },
      { row: 'row 9', index: 9, more: 'coucou' },
    ]);
  });

  it('putOnTop', () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

    expect(putOnTop([...arr], elt => elt === 'd'))
      .toEqual(['d', 'a', 'b', 'c', 'e', 'f']);

    expect(putOnTop([...arr, 'c'], elt => elt === 'c'))
      .toEqual(['c', 'c', 'a', 'b', 'd', 'e', 'f']);

    expect(putOnTop([...arr], elt => elt === 'd' || elt === 'e'))
      .toEqual(['e', 'd', 'a', 'b', 'c', 'f']);

    expect(putOnTop([...arr], elt => elt === 'w'))
      .toEqual([...arr]);
  });
});
