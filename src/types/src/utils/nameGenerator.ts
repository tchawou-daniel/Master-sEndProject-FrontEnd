/**
 * Appends a number to a base string in order to generate a name that is not taken yet.
 *
 * @param base - Base name.
 * @param takenNames - Array containing name that already in use.
 */
export const nameGenerator = (base: string, takenNames: string[]) => {
  let i = 1;
  let name = `${base} ${i}`;

  while (takenNames.includes(name)) {
    i++;
    name = `${base} ${i}`;
  }

  return name;
};
