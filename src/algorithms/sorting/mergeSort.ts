import type { AnimationStep } from '../types';

export function* mergeSort(input: readonly number[]): Generator<AnimationStep> {
  const arr = [...input];
  const sorted: number[] = [];

  yield* mergeSortHelper(arr, 0, arr.length - 1, sorted);

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'sorted',
    description: 'Array is sorted!',
    sortedIndices: Object.freeze(Array.from({ length: arr.length }, (_, i) => i)),
  };
}

function* mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  sorted: number[],
): Generator<AnimationStep> {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  yield* mergeSortHelper(arr, left, mid, sorted);
  yield* mergeSortHelper(arr, mid + 1, right, sorted);
  yield* merge(arr, left, mid, right, sorted);
}

function* merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  sorted: number[],
): Generator<AnimationStep> {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([left + i, mid + 1 + j]),
      type: 'compare',
      description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
      sortedIndices: Object.freeze([...sorted]),
    };

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }

    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([k]),
      type: 'merge',
      description: `Placed ${arr[k]} at index ${k}`,
      sortedIndices: Object.freeze([...sorted]),
    };
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([k]),
      type: 'merge',
      description: `Placed remaining ${arr[k]} at index ${k}`,
      sortedIndices: Object.freeze([...sorted]),
    };
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([k]),
      type: 'merge',
      description: `Placed remaining ${arr[k]} at index ${k}`,
      sortedIndices: Object.freeze([...sorted]),
    };
    j++;
    k++;
  }

  if (left === 0 && right === arr.length - 1) {
    for (let idx = left; idx <= right; idx++) sorted.push(idx);
  }
}
