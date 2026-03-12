import type { AnimationStep } from '../types';

export function* bubbleSort(input: readonly number[]): Generator<AnimationStep> {
  const arr = [...input];
  const n = arr.length;
  const sorted: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: Object.freeze([...arr]),
        highlighted: Object.freeze([j, j + 1]),
        type: 'compare',
        description: `Comparing index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]})`,
        sortedIndices: Object.freeze([...sorted]),
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        yield {
          array: Object.freeze([...arr]),
          highlighted: Object.freeze([j, j + 1]),
          type: 'swap',
          description: `Swapped ${arr[j]} and ${arr[j + 1]}`,
          sortedIndices: Object.freeze([...sorted]),
        };
      }
    }
    sorted.push(n - 1 - i);
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([n - 1 - i]),
      type: 'sorted',
      description: `Element at index ${n - 1 - i} is in final position`,
      sortedIndices: Object.freeze([...sorted]),
    };
    if (!swapped) break;
  }

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'sorted',
    description: 'Array is sorted!',
    sortedIndices: Object.freeze(Array.from({ length: n }, (_, i) => i)),
  };
}
