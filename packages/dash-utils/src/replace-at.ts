/**
 * Replaces an item in a collection with a new item.
 * @param collection collection to replace item in
 * @param predicate predicate to find item to replace
 * @param item  item to replace with
 * @returns new collection with item replaced
 */
export function replaceAt<T>(collection: T[], predicate: (item: T) => boolean, item: T) {
  if (!collection) {
    return collection;
  }

  let existingItemIndex: number | undefined = undefined;
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      existingItemIndex = i;
      break;
    }
  }

  if (!isNaN(existingItemIndex as number)) {
    return [...collection.slice(0, existingItemIndex), item, ...collection.slice((existingItemIndex as number) + 1, collection.length)];
  }

  return collection;
}
