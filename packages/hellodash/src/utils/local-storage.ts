/**
 * Gets value from local storage
 * @param key local storage key
 */
export function getLocalStorage(key: string) {
  return window.localStorage.getItem(key);
}

/**
 * Saves value to local storage
 * @param key local storage key
 * @param value value to set
 */
export function setLocalStorage(key: string, value: string) {
  window.localStorage.setItem(key, value);
}
