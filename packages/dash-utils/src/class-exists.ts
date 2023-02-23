/**
 * Waits for a mutation to occur on the element
 * @param element  element to observe
 * @param predicate predicate to check for mutation
 * @returns promise that resolves when mutation occurs
 */
function waitFor(element: HTMLElement, predicate: (target: HTMLElement) => boolean) {
  let resolveDefer: (value?: unknown) => void;
  const promise = new Promise(resolve => {
    resolveDefer = resolve;
  });

  const observer = new MutationObserver(mutations => {
    for (let mutationRecord of mutations) {
      if (predicate(mutationRecord.target as HTMLElement)) {
        resolveDefer();
      }
    }

    observer.disconnect();
  });

  observer.observe(element, { attributes: true });

  return promise;
}

/**
 * Checks if a class exists on an element
 * @param element element to check
 * @param className class to check for
 * @param checkExists if true, checks if class exists, otherwise checks if class does not exist
 * @returns promise that resolves when class exists or does not exist
 */
export async function classExists(element: HTMLElement, className: string, checkExists = true) {
  const check = (target: HTMLElement) => {
    const classNames = target.className?.split(' ') ?? [];
    const found = classNames.find(name => name === className);

    return checkExists ? !!found : !found;
  };

  if (check(element)) {
    return true;
  }

  return waitFor(element, check);
}
