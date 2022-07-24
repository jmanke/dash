export function isClick(e: KeyboardEvent | MouseEvent) {
  return e instanceof MouseEvent || e.code === 'Space' || e.code === 'Enter';
}
