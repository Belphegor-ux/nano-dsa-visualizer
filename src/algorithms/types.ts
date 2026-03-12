export type StepType =
  | 'compare'
  | 'swap'
  | 'sorted'
  | 'pivot'
  | 'merge'
  | 'found'
  | 'not-found'
  | 'search'
  | 'partition';

export interface AnimationStep {
  readonly array: readonly number[];
  readonly highlighted: readonly number[];
  readonly type: StepType;
  readonly description: string;
  readonly sortedIndices?: readonly number[];
}

export interface AlgorithmInfo {
  readonly name: string;
  readonly category: 'sorting' | 'searching';
  readonly timeComplexity: { readonly best: string; readonly average: string; readonly worst: string };
  readonly spaceComplexity: string;
  readonly stable: boolean;
  readonly description: string;
  readonly code: string;
}
