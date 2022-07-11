export function isHex(str: string) {
  if (!str) {
    return false;
  }

  return str[0] === '#';
}
