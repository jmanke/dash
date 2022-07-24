import { isDefined } from 'didyoumeantoast-dash-utils';

export default class EventEmitter {
  private listeners: Map<string, ((...args: any[]) => void)[]>;

  get hasListeners() {
    return this.listeners.size > 1;
  }

  constructor() {
    this.listeners = new Map();
  }

  emit(eventName: string, a1?: any, a2?: any, a3?: any) {
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    for (let i = 0; i < listeners.length; i++) {
      if (isDefined(a3)) {
        listeners[i](a1, a2, a3);
      } else if (isDefined(a2)) {
        listeners[i](a1, a2);
      } else if (isDefined(a1)) {
        listeners[i](a1);
      } else {
        listeners[i]();
      }
    }
  }

  on(eventName: string, callbackFn: (...args: any[]) => void) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, [callbackFn]);
      return;
    }

    this.listeners.get(eventName).push(callbackFn);
  }

  removeListener(eventName: string, callbackFn: (...args: any[]) => void) {
    const listeners = this.listeners.get(eventName);
    const index = listeners?.indexOf(callbackFn);

    if (index >= 0) {
      listeners.splice(index, 1);

      if (listeners.length === 0) {
        this.listeners.delete(eventName);
      }
    }
  }
}
