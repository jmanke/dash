export function spaceConcat(...params: string[]) {
  return params.filter(p => !!p).join(' ');
}
