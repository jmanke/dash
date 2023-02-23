import { queryShadowRoot } from '@a11y/focus-trap/shadow';

// Similar to Node.contains but works with the shadow root
export function contains(parent: HTMLElement, child: HTMLElement) {
  if (parent === child) {
    return true;
  }

  const skipNode = () => false;
  const isMatch = (element: HTMLElement) => element === child;

  return !!queryShadowRoot(parent, skipNode, isMatch).length;
}
