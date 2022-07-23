export function queryElementById(root: HTMLElement, id: string) {
  return root.querySelector('#' + id);
}
