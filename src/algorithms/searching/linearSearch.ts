import type { AnimationStep } from '../types';

export function* linearSearch(
  input: readonly number[],
  target: number,
): Generator<AnimationStep> {
  const arr = [...input];

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'search',
    description: `Searching for ${target} linearly`,
  };

  for (let i = 0; i < arr.length; i++) {
    yield {
      array: Object.freeze([...arr]),
      highlighted: Object.freeze([i]),
      type: 'compare',
      description: `Checking index ${i}: ${arr[i]} === ${target}?`,
    };

    if (arr[i] === target) {
      yield {
        array: Object.freeze([...arr]),
        highlighted: Object.freeze([i]),
        type: 'found',
        description: `Found ${target} at index ${i}!`,
      };
      return;
    }
  }

  yield {
    array: Object.freeze([...arr]),
    highlighted: Object.freeze([]),
    type: 'not-found',
    description: `${target} not found in array`,
  };
}
