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

// waits for class to exist or not exist on element
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
