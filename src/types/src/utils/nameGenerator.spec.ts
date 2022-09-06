// @ts-nocheck
// Waiting for a fix https://github.com/cypress-io/cypress/issues/7435

import { nameGenerator } from './nameGenerator';

describe('nameGenerator', () => {
  it('generates names properly', () => {
    const base = 'Team';
    const takenNames = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];
    expect(nameGenerator(base, takenNames)).toBe('Team 5');
  });

  it('generates names properly when array is empty', () => {
    const base = 'Team';
    const takenNames = [];
    expect(nameGenerator(base, takenNames)).toBe('Team 1');
  });
});
