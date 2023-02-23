/**
 * Wait for a given amount of time in milliseconds.
 * @param milliseconds time to wait in milliseconds
 * @returns promise that resolves after the given amount of time
 */
export function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
