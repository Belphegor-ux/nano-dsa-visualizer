export function generateRandomArray(size: number, min = 5, max = 100): readonly number[] {
  return Object.freeze(
    Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
  );
}

export function generateSortedArray(size: number): readonly number[] {
  return Object.freeze(
    Array.from({ length: size }, (_, i) => Math.floor(((i + 1) / size) * 95) + 5)
  );
}

export function generateReversedArray(size: number): readonly number[] {
  return Object.freeze([...generateSortedArray(size)].reverse());
}

export function generateNearlySortedArray(size: number): readonly number[] {
  const arr = [...generateSortedArray(size)];
  const swaps = Math.floor(size * 0.1);
  for (let i = 0; i < swaps; i++) {
    const j = Math.floor(Math.random() * size);
    const k = Math.min(j + Math.floor(Math.random() * 3) + 1, size - 1);
    [arr[j], arr[k]] = [arr[k], arr[j]];
  }
  return Object.freeze(arr);
}
