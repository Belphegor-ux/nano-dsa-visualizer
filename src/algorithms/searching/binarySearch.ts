import type { AnimationStep } from '../types';

export function* binarySearch(
  input: readonly number[],
  target: number,
): Generator<AnimationStep> {
  const arr = [...input].sort((a, b) => a - b);

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'search',
    description: `Searching for ${target} in sorted array`,
    sortedIndices: Object.freeze(Array.from({ length: arr.length }, (_, i) => i)),
  };

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([low, mid, high]),
      type: 'search',
      description: `Range [${low}..${high}], checking mid=${mid} (value ${arr[mid]})`,
    };

    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([mid]),
      type: 'compare',
      description: `Comparing ${arr[mid]} with target ${target}`,
    };

    if (arr[mid] === target) {
      yield {
        array: Object.freeze([...arr]),
        highlighted: Object.freeze([mid]),
        type: 'found',
        description: `Found ${target} at index ${mid}!`,
      };
      return;
    }

    if (arr[mid] < target) {
      low = mid + 1;
      yield {
        array: Object.freeze([...arr]),
        highlighted: Object.freeze([mid]),
        type: 'compare',
        description: `${arr[mid]} < ${target}, searching right half`,
      };
    } else {
      high = mid - 1;
      yield {
        array: Object.freeze([...arr]),
        highlighted: Object.freeze([mid]),
        type: 'compare',
        description: `${arr[mid]} > ${target}, searching left half`,
      };
    }
  }

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'not-found',
    description: `${target} not found in array`,
  };
}
