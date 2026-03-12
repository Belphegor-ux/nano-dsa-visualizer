import { useState, useCallback, useMemo } from 'react';
import type { AnimationStep } from '../algorithms/types';
import { ALGORITHMS } from '../algorithms/metadata';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';
import { quickSort } from '../algorithms/sorting/quickSort';
import { heapSort } from '../algorithms/sorting/heapSort';
import { binarySearch } from '../algorithms/searching/binarySearch';
import { linearSearch } from '../algorithms/searching/linearSearch';
import { generateRandomArray } from '../lib/arrayUtils';
import { SIZE_RANGE } from '../lib/constants';

const SORTING_GENERATORS: Record<string, (arr: readonly number[]) => Generator<AnimationStep>> = {
  bubbleSort,
  mergeSort,
  quickSort,
  heapSort,
};

const SEARCHING_GENERATORS: Record<
  string,
  (arr: readonly number[], target: number) => Generator<AnimationStep>
> = {
  binarySearch,
  linearSearch,
};

interface UseAlgorithmReturn {
  readonly selectedAlgorithm: string;
  readonly array: readonly number[];
  readonly arraySize: number;
  readonly searchTarget: number;
  readonly algorithmInfo: (typeof ALGORITHMS)[string] | undefined;
  readonly generatorFactory: (() => Generator<AnimationStep>) | null;
  readonly selectAlgorithm: (name: string) => void;
  readonly setArray: (arr: readonly number[]) => void;
  readonly setArraySize: (size: number) => void;
  readonly setSearchTarget: (target: number) => void;
  readonly regenerateArray: () => void;
}

export function useAlgorithm(): UseAlgorithmReturn {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [arraySize, setArraySizeState] = useState<number>(SIZE_RANGE.default);
  const [array, setArray] = useState<readonly number[]>(() => generateRandomArray(SIZE_RANGE.default));
  const [searchTarget, setSearchTarget] = useState<number>(50);

  const algorithmInfo = ALGORITHMS[selectedAlgorithm];

  const selectAlgorithm = useCallback((name: string) => {
    setSelectedAlgorithm(name);
  }, []);

  const regenerateArray = useCallback(() => {
    setArray(generateRandomArray(arraySize));
  }, [arraySize]);

  const setArraySize = useCallback((size: number) => {
    setArraySizeState(size);
    setArray(generateRandomArray(size));
  }, []);

  const generatorFactory = useMemo(() => {
    if (algorithmInfo?.category === 'sorting' && SORTING_GENERATORS[selectedAlgorithm]) {
      const gen = SORTING_GENERATORS[selectedAlgorithm];
      return () => gen(array);
    }
    if (algorithmInfo?.category === 'searching' && SEARCHING_GENERATORS[selectedAlgorithm]) {
      const gen = SEARCHING_GENERATORS[selectedAlgorithm];
      return () => gen(array, searchTarget);
    }
    return null;
  }, [selectedAlgorithm, array, searchTarget, algorithmInfo]);

  return {
    selectedAlgorithm,
    array,
    arraySize,
    searchTarget,
    algorithmInfo,
    generatorFactory,
    selectAlgorithm,
    setArray,
    setArraySize,
    setSearchTarget,
    regenerateArray,
  };
}
