type RefetchFn = () => void;

const refetchers: RefetchFn[] = [];

export const registerRefetcher = (fn: RefetchFn) => {
  refetchers.push(fn);
};

export const runAllRefetchers = () => {
  refetchers.forEach((fn) => fn());
};
