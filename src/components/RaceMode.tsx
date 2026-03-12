import { useState, useMemo, useCallback } from 'react';
import { useVisualization } from '../hooks/useVisualization';
import { ArrayBars } from './ArrayBars';
import { StatsBar } from './StatsBar';
import { ALGORITHMS } from '../algorithms/metadata';
import { SPEED_RANGE } from '../lib/constants';
import { generateRandomArray } from '../lib/arrayUtils';
import { bubbleSort } from '../algorithms/sorting/bubbleSort';
import { mergeSort } from '../algorithms/sorting/mergeSort';
import { quickSort } from '../algorithms/sorting/quickSort';
import { heapSort } from '../algorithms/sorting/heapSort';
import { Play, RotateCcw } from 'lucide-react';
import type { AnimationStep } from '../algorithms/types';

const SORT_ALGORITHMS: Record<string, (arr: readonly number[]) => Generator<AnimationStep>> = {
  bubbleSort,
  mergeSort,
  quickSort,
  heapSort,
};

const sortingEntries = Object.entries(ALGORITHMS).filter(([, info]) => info.category === 'sorting');

export function RaceMode() {
  const [leftAlgo, setLeftAlgo] = useState('bubbleSort');
  const [rightAlgo, setRightAlgo] = useState('mergeSort');
  const [speed, setSpeed] = useState<number>(SPEED_RANGE.default);
  const [array, setArray] = useState<readonly number[]>(() => generateRandomArray(30));
  const [racing, setRacing] = useState(false);

  const leftFactory = useMemo(() => {
    const gen = SORT_ALGORITHMS[leftAlgo];
    return gen ? () => gen(array) : null;
  }, [leftAlgo, array]);

  const rightFactory = useMemo(() => {
    const gen = SORT_ALGORITHMS[rightAlgo];
    return gen ? () => gen(array) : null;
  }, [rightAlgo, array]);

  const left = useVisualization(racing ? leftFactory : null, speed);
  const right = useVisualization(racing ? rightFactory : null, speed);

  const startRace = useCallback(() => {
    setRacing(false);
    // Use setTimeout to ensure state resets before starting
    setTimeout(() => {
      setRacing(true);
      // play is called by the useVisualization effect when factory changes
    }, 50);
  }, []);

  const resetRace = useCallback(() => {
    setRacing(false);
    setArray(generateRandomArray(30));
  }, []);

  // Auto-play when racing starts
  const leftShouldPlay = racing && !left.isPlaying && !left.isComplete && left.currentStep === null;
  const rightShouldPlay = racing && !right.isPlaying && !right.isComplete && right.currentStep === null;

  if (leftShouldPlay) setTimeout(() => left.play(), 100);
  if (rightShouldPlay) setTimeout(() => right.play(), 100);

  const leftDisplayArray = left.currentStep?.array ?? array;
  const rightDisplayArray = right.currentStep?.array ?? array;

  return (
    <div className="space-y-4">
      <div className="glass p-4">
        <h2 className="text-lg font-semibold mb-3">Algorithm Race</h2>
        <div className="flex flex-wrap items-center gap-4">
          <label className="space-y-1">
            <span className="text-xs text-slate-400">Left</span>
            <select
              value={leftAlgo}
              onChange={e => { setRacing(false); setLeftAlgo(e.target.value); }}
              className="block px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 focus:outline-none"
            >
              {sortingEntries.map(([key, info]) => (
                <option key={key} value={key}>{info.name}</option>
              ))}
            </select>
          </label>
          <span className="text-xl font-bold text-slate-500 mt-4">VS</span>
          <label className="space-y-1">
            <span className="text-xs text-slate-400">Right</span>
            <select
              value={rightAlgo}
              onChange={e => { setRacing(false); setRightAlgo(e.target.value); }}
              className="block px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 focus:outline-none"
            >
              {sortingEntries.map(([key, info]) => (
                <option key={key} value={key}>{info.name}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 ml-auto">
            <span className="text-xs text-slate-400">Speed: {speed}ms</span>
            <input
              type="range"
              min={SPEED_RANGE.min}
              max={SPEED_RANGE.max}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="block w-32 accent-blue-500"
            />
          </label>
          <div className="flex gap-2 mt-4">
            <button
              onClick={startRace}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            >
              <Play className="w-4 h-4" /> Race
            </button>
            <button
              onClick={resetRace}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-center">
            {ALGORITHMS[leftAlgo]?.name ?? leftAlgo}
            {left.isComplete && <span className="ml-2 text-green-400">Done!</span>}
          </h3>
          <ArrayBars array={leftDisplayArray} currentStep={left.currentStep} />
          <StatsBar
            currentStep={left.currentStep}
            comparisons={left.stats.comparisons}
            swaps={left.stats.swaps}
            isPlaying={left.isPlaying}
            isComplete={left.isComplete}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-center">
            {ALGORITHMS[rightAlgo]?.name ?? rightAlgo}
            {right.isComplete && <span className="ml-2 text-green-400">Done!</span>}
          </h3>
          <ArrayBars array={rightDisplayArray} currentStep={right.currentStep} />
          <StatsBar
            currentStep={right.currentStep}
            comparisons={right.stats.comparisons}
            swaps={right.stats.swaps}
            isPlaying={right.isPlaying}
            isComplete={right.isComplete}
          />
        </div>
      </div>
    </div>
  );
}
