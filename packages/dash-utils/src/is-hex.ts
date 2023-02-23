/**
 * Checks if a string is a hex color
 * @param str string to check
 * @returns true if string is a hex color
 */
export function isHex(str: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
}
