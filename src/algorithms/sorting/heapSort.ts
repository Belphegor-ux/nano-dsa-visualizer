import type { AnimationStep } from '../types';

export function* heapSort(input: readonly number[]): Generator<AnimationStep> {
  const arr = [...input];
  const n = arr.length;
  const sorted: number[] = [];

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* siftDown(arr, n, i, sorted);
  }

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'compare',
    description: 'Max heap built, starting extraction',
    sortedIndices: Object.freeze([...sorted]),
  };

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([0, i]),
      type: 'swap',
      description: `Swapped max ${arr[i]} to position ${i}`,
      sortedIndices: Object.freeze([...sorted]),
    };

    sorted.push(i);
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([i]),
      type: 'sorted',
      description: `Element ${arr[i]} in final position`,
      sortedIndices: Object.freeze([...sorted]),
    };

    yield* siftDown(arr, i, 0, sorted);
  }

  sorted.push(0);
  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'sorted',
    description: 'Array is sorted!',
    sortedIndices: Object.freeze(Array.from({ length: n }, (_, i) => i)),
  };
}

function* siftDown(
  arr: number[],
  heapSize: number,
  root: number,
  sorted: number[],
): Generator<AnimationStep> {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;

  if (left < heapSize) {
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([largest, left]),
      type: 'compare',
      description: `Comparing ${arr[largest]} with left child ${arr[left]}`,
      sortedIndices: Object.freeze([...sorted]),
    };
    if (arr[left] > arr[largest]) largest = left;
  }

  if (right < heapSize) {
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([largest, right]),
      type: 'compare',
      description: `Comparing ${arr[largest]} with right child ${arr[right]}`,
      sortedIndices: Object.freeze([...sorted]),
    };
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== root) {
    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([root, largest]),
      type: 'swap',
      description: `Swapped ${arr[root]} and ${arr[largest]}`,
      sortedIndices: Object.freeze([...sorted]),
    };
    yield* siftDown(arr, heapSize, largest, sorted);
  }
}
