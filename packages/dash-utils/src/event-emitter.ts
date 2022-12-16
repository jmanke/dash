export default class EventEmitter {
  private listeners: Map<string, ((...args: any[]) => void)[]> = new Map();

  get hasListeners() {
    return this.listeners.size > 1;
  }

  emit(eventName: string, ...args: any[]) {
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    for (let i = 0; i < listeners.length; i++) {
      listeners[i](...args);
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
