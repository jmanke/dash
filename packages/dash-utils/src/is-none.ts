/**
 * Checks if value is null or undefined
 * @param v value to check
 * @returns true if value is null or undefined
 */
export function isNone<T>(v: T) {
  return v === undefined || v === null;
}
