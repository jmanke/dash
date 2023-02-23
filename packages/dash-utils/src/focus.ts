// @ts-nocheck
import { isFocusable, isHidden } from '@a11y/focus-trap/focusable';
import { queryShadowRoot } from '@a11y/focus-trap/shadow';

/** class to skip when traversing DOM */
export const SKIP_NODE_CLASS = '__skip-node__';

/**
 * Check if an element is focusable. Works with shadow DOM.
 * @param element element to check
 * @returns true if element is focusable
 */
function isFocusableExtended(element: HTMLElement) {
  if (!element) {
    return false;
  }

  return isFocusable(element) || typeof element.setFocus === 'function';
}

/**
 * Check if an element should be skipped when traversing the DOM
 * @param element element to check
 * @returns true if element should be skipped
 */
function skipNode(element: HTMLElement) {
  return isHidden(element) || element.classList.contains(SKIP_NODE_CLASS);
}

/**
 * Get all focusable elements within an element. Works with shadow DOM.
 * @param element element to check
 * @returns array of focusable elements
 */
export async function getFocusableElements(element: HTMLElement) {
  if (element.componentOnReady) {
    await element.componentOnReady();
  }

  return queryShadowRoot(element, skipNode, isFocusableExtended).filter(el => el.offsetParent !== null) ?? [];
}

/**
 * Focus an element. If the element is not focusable, focus the first focusable element within the element. Works with shadow DOM.
 * @param element element to focus
 * @param focusLast if true, focus the last focusable element within the element
 * @returns promise that resolves when element is focused
 */
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
