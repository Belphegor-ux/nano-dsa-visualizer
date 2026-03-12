import type { AnimationStep } from '../types';

export function* quickSort(input: readonly number[]): Generator<AnimationStep> {
  const arr = [...input];
  const sorted: number[] = [];

  yield* quickSortHelper(arr, 0, arr.length - 1, sorted);

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'sorted',
    description: 'Array is sorted!',
    sortedIndices: Object.freeze(Array.from({ length: arr.length }, (_, i) => i)),
  };
}

function* quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  sorted: number[],
): Generator<AnimationStep> {
  if (low >= high) {
    if (low === high) sorted.push(low);
    return;
  }

  const pivotIdx: number = yield* partition(arr, low, high, sorted);
  sorted.push(pivotIdx);

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([pivotIdx]),
    type: 'sorted',
    description: `Pivot ${arr[pivotIdx]} is in final position at index ${pivotIdx}`,
    sortedIndices: Object.freeze([...sorted]),
  };

  yield* quickSortHelper(arr, low, pivotIdx - 1, sorted);
  yield* quickSortHelper(arr, pivotIdx + 1, high, sorted);
}

function* partition(
  arr: number[],
  low: number,
  high: number,
  sorted: number[],
): Generator<AnimationStep, number> {
  const pivot = arr[high];

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([high]),
    type: 'pivot',
    description: `Selected pivot: ${pivot} at index ${high}`,
    sortedIndices: Object.freeze([...sorted]),
  };

  let i = low - 1;

  for (let j = low; j < high; j++) {
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([j, high]),
      type: 'compare',
      description: `Comparing ${arr[j]} with pivot ${pivot}`,
      sortedIndices: Object.freeze([...sorted]),
    };

    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        yield {
          array: Object.freeze([...arr]),
          highlighted: Object.freeze([i, j]),
          type: 'swap',
          description: `Swapped ${arr[i]} and ${arr[j]}`,
          sortedIndices: Object.freeze([...sorted]),
        };
      }
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([i + 1, high]),
    type: 'swap',
    description: `Placed pivot ${pivot} at index ${i + 1}`,
    sortedIndices: Object.freeze([...sorted]),
  };

  return i + 1;
}
