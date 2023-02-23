/**
 * Concatenates strings with a space in between. Filters out falsy values.
 * @param params strings to concatenate
 * @returns concatenated string
 */
export function spaceConcat(...params: string[]) {
  return params.filter(p => !!p).join(' ');
}
