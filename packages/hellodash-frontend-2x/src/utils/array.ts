// replace item at the predicate
export function replaceAt<T>(collection: T[] | null, predicate: (item: T) => boolean, item: T) {
  if (!collection) {
    return collection;
  }

  let existingItemIndex: number;
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i])) {
      existingItemIndex = i;
      break;
    }
  }

  if (!isNaN(existingItemIndex)) {
    return [...collection.slice(0, existingItemIndex), item, ...collection.slice(existingItemIndex + 1, collection.length)];
  }

  return collection;
}
