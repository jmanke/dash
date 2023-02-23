/**
 * A simple event emitter class.
 */
export default class EventEmitter {
  /**
   * Map of event names to listeners.
   */
  private listeners: Map<string, ((...args: any[]) => void)[]> = new Map();

  /**
   * Returns true if there are any listeners.
   */
  get hasListeners() {
    return this.listeners.size > 1;
  }

  /**
   * Emits an event.
   * @param eventName name of event
   * @param args arguments to pass to listeners
   */
  emit(eventName: string, ...args: any[]) {
    const listeners = this.listeners.get(eventName);

    if (!listeners) {
      return;
    }

    for (let i = 0; i < listeners.length; i++) {
      listeners[i](...args);
    }
  }

  /**
   * Adds a listener for an event.
   * @param eventName name of event
   * @param callbackFn callback function
   */
  on(eventName: string, callbackFn: (...args: any[]) => void) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, [callbackFn]);
      return;
    }

    this.listeners.get(eventName).push(callbackFn);
  }

  /**
   * Removes a listener for an event.
   * @param eventName name of event
   * @param callbackFn callback function - must be the same instance as the one passed to `on`
   */
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
