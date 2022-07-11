import { getRenderingRef, forceUpdate } from '@stencil/core';
import { debounce } from 'lodash';

function isConnected(maybeElement: any) {
  return !('isConnected' in maybeElement) || maybeElement.isConnected;
}

export const tracked = <T extends {}>(target: T, key: keyof T): void => {
  const privateField = Symbol();
  let elemsToUpdate = new Set();
  const cleanupElements = debounce(() => {
    elemsToUpdate = new Set([...elemsToUpdate].filter(isConnected));
  }, 2000);

  // We define getters and setters for the property on the prototype of the class
  // A real application might use this to intercept changes to the decorated property.
  // This is a simplified version of a pattern used by the @microsoft/fast-elements library.
  Reflect.defineProperty(target, key, {
    get: function () {
      const elem = getRenderingRef();
      if (elem) {
        elemsToUpdate.add(elem);
      }

      return this[privateField];
    },
    set: function (newValue) {
      const oldValue = this[privateField];
      // make sure new value is actually new before triggering a re-render
      if (oldValue !== newValue) {
        this.__isDirty = true;
        this[privateField] = newValue;
        this.__emitChange?.(key, newValue, oldValue);
        elemsToUpdate.forEach(forceUpdate);
      }
      cleanupElements();
    },
  });
};
