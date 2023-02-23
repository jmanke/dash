/**
 * Performs a case-insensitive search for the target string in the source string.
 * @param source string to search
 * @param target string to search for in target
 * @returns true if target string is found in source
 */
export function stringSearch(source: string, target: string) {
  if (source === target) {
    return true;
  }

  source = source?.toLowerCase();
  target = target?.toLowerCase();

  return source.includes(target);
}
