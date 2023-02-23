/**
 * Deep copy an object
 * @param obj object to copy
 * @returns deep copy of object
 */
export function deepCopy(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}
