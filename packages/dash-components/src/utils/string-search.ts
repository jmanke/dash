export function stringSearch(source: string, target: string) {
  if (source === target) {
    return true;
  }

  source = source?.toLowerCase();
  target = target?.toLowerCase();

  return source.includes(target);
}
