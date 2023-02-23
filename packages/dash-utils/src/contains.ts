import { queryShadowRoot } from '@a11y/focus-trap/shadow';

/**
 * Check if an element is contained within another element. Works with shadow DOM.
 * @param root root element
 * @param child child element
 * @returns true if child is contained within root
 */
export function contains(root: HTMLElement, child: HTMLElement) {
  if (root === child) {
    return true;
  }

  const skipNode = () => false;
  const isMatch = (element: HTMLElement) => element === child;

  return !!queryShadowRoot(root, skipNode, isMatch).length;
}
