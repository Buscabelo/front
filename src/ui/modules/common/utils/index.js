export function getEdgeElements(array) {
  if (!Array.isArray(array)) {
    throw new Error('You need to pass an array');
  }

  const _array = [...array];
  const [first,] = _array;
  const last = _array.pop();

  return [first, last];
}
