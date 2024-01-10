export const weakMap = new WeakMap();

const MAX_ENDPOINT_CALLS = 5;

export function queryAPI(endpoint) {
  if (!weakMap.has(endpoint)) {
    weakMap.set(endpoint, 0);
  }
  
  const count = weakMap.get(endpoint) + 1;
  weakMap.set(endpoint, count);

  if (count >= MAX_ENDPOINT_CALLS) {
    throw new Error('Endpoint load is high');
  }
}

