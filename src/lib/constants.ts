export const COLORS = {
  default: '#3b82f6',
  comparing: '#eab308',
  swapping: '#ef4444',
  sorted: '#22c55e',
  pivot: '#8b5cf6',
  found: '#22c55e',
  notFound: '#ef4444',
  searching: '#06b6d4',
  merge: '#f97316',
  partition: '#ec4899',
} as const;

export const SPEED_RANGE = { min: 1, max: 200, default: 50 } as const;
export const SIZE_RANGE = { min: 5, max: 100, default: 30 } as const;
