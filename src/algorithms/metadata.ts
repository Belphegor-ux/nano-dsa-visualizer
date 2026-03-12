import type { AlgorithmInfo } from './types';

export const ALGORITHMS: Record<string, AlgorithmInfo> = {
  bubbleSort: {
    name: 'Bubble Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n)', average: 'O(n\u00B2)', worst: 'O(n\u00B2)' },
    spaceComplexity: 'O(1)',
    stable: true,
    description:
      'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Simple but inefficient for large datasets.',
    code: `function bubbleSort(arr) {
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {    // compare
        swap(arr[j], arr[j + 1]);    // swap
        swapped = true;
      }
    }
    if (!swapped) break;             // optimization
  }
}`,
  },

  mergeSort: {
    name: 'Merge Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    description:
      'Divides the array into halves, recursively sorts them, and merges the sorted halves. Guaranteed O(n log n) but requires extra memory.',
    code: `function mergeSort(arr, l, r) {
  if (l >= r) return;
  const mid = (l + r) / 2;
  mergeSort(arr, l, mid);           // sort left
  mergeSort(arr, mid + 1, r);       // sort right
  merge(arr, l, mid, r);            // merge halves
}

function merge(arr, l, mid, r) {
  while (i < left.len && j < right.len) {
    if (left[i] <= right[j])        // compare
      arr[k++] = left[i++];         // place left
    else
      arr[k++] = right[j++];        // place right
  }
}`,
  },

  quickSort: {
    name: 'Quick Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n\u00B2)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    description:
      'Picks a pivot, partitions elements around it, and recursively sorts the partitions. Very fast in practice with good pivot selection.',
    code: `function quickSort(arr, low, high) {
  if (low >= high) return;
  const pivot = partition(arr, low, high);
  quickSort(arr, low, pivot - 1);   // sort left
  quickSort(arr, pivot + 1, high);  // sort right
}

function partition(arr, low, high) {
  const pivot = arr[high];          // pick pivot
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {           // compare
      i++;
      swap(arr[i], arr[j]);         // swap
    }
  }
  swap(arr[i+1], arr[high]);        // place pivot
  return i + 1;
}`,
  },

  heapSort: {
    name: 'Heap Sort',
    category: 'sorting',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    stable: false,
    description:
      'Builds a max heap and repeatedly extracts the maximum element. In-place with guaranteed O(n log n) performance.',
    code: `function heapSort(arr) {
  // Build max heap
  for (let i = n/2 - 1; i >= 0; i--)
    siftDown(arr, n, i);

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    swap(arr[0], arr[i]);           // move max
    siftDown(arr, i, 0);            // restore heap
  }
}

function siftDown(arr, size, root) {
  let largest = root;
  if (left < size && arr[left] > arr[largest])
    largest = left;                  // compare
  if (right < size && arr[right] > arr[largest])
    largest = right;                 // compare
  if (largest !== root) {
    swap(arr[root], arr[largest]);   // swap
    siftDown(arr, size, largest);
  }
}`,
  },

  binarySearch: {
    name: 'Binary Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    stable: true,
    description:
      'Efficiently finds a target in a sorted array by repeatedly halving the search range. Requires sorted input.',
    code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    const mid = (low + high) / 2;
    if (arr[mid] === target)         // found!
      return mid;
    if (arr[mid] < target)           // search right
      low = mid + 1;
    else                             // search left
      high = mid - 1;
  }
  return -1;                         // not found
}`,
  },

  linearSearch: {
    name: 'Linear Search',
    category: 'searching',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    stable: true,
    description:
      'Checks every element sequentially until the target is found. Works on any array, sorted or unsorted.',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target)           // check
      return i;                      // found!
  }
  return -1;                         // not found
}`,
  },
} as const;
