// @ts-nocheck
import { queryShadowRoot } from '@a11y/focus-trap/shadow';
import { isFocusable, isHidden } from '@a11y/focus-trap/focusable';

export const SKIP_NODE_CLASS = '__skip-node__';

function isFocusableExtended(element: HTMLElement) {
  if (!element) {
    return false;
  }

  return isFocusable(element) || typeof element.setFocus === 'function';
}

function skipNode(element: HTMLElement) {
  return isHidden(element) || element.classList.contains(SKIP_NODE_CLASS);
}

export async function getFocusableElements(element: HTMLElement) {
  if (element.componentOnReady) {
    await element.componentOnReady();
  }

  return queryShadowRoot(element, skipNode, isFocusableExtended).filter(el => el.offsetParent !== null) ?? [];
}

export async function focus(element: HTMLElement, focusLast = false) {
  let focusableElement: HTMLElement;
  if (isFocusableExtended(element) && !skipNode(element)) {
    focusableElement = element;
  } else {
    const focusableElements = await getFocusableElements(element);
    focusableElement = focusableElements[focusLast ? focusableElements.length - 1 : 0];
  }

  if (!focusableElement) {
    return;
  }

  if (typeof focusableElement.setFocus === 'function') {
    focusableElement.setFocus();
  } else {
    focusableElement.focus();
  }
}
