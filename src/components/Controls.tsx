import { Play, Pause, SkipForward, RotateCcw, Shuffle, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { SPEED_RANGE, SIZE_RANGE } from '../lib/constants';
import { generateRandomArray, generateSortedArray, generateReversedArray, generateNearlySortedArray } from '../lib/arrayUtils';

interface ControlsProps {
  readonly isPlaying: boolean;
  readonly isComplete: boolean;
  readonly speed: number;
  readonly arraySize: number;
  readonly isSearching: boolean;
  readonly searchTarget: number;
  readonly onPlay: () => void;
  readonly onPause: () => void;
  readonly onStep: () => void;
  readonly onReset: () => void;
  readonly onSpeedChange: (speed: number) => void;
  readonly onSizeChange: (size: number) => void;
  readonly onArrayChange: (arr: readonly number[]) => void;
  readonly onSearchTargetChange: (target: number) => void;
}

export function Controls({
  isPlaying,
  isComplete,
  speed,
  arraySize,
  isSearching,
  searchTarget,
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  onSizeChange,
  onArrayChange,
  onSearchTargetChange,
}: ControlsProps) {
  const isRunning = isPlaying || isComplete;

  return (
    <div className="glass p-4 space-y-4">
      {/* Playback */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onReset}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={isComplete}
          className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shadow-lg shadow-blue-500/25"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </button>
        <button
          onClick={onStep}
          disabled={isComplete || isPlaying}
          className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Step forward"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Speed + Size sliders */}
      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1">
          <span className="text-xs font-medium text-slate-400">Speed: {speed}ms</span>
          <input
            type="range"
            min={SPEED_RANGE.min}
            max={SPEED_RANGE.max}
            value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium text-slate-400">Size: {arraySize}</span>
          <input
            type="range"
            min={SIZE_RANGE.min}
            max={SIZE_RANGE.max}
            value={arraySize}
            onChange={e => onSizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="w-full accent-blue-500 disabled:opacity-40"
          />
        </label>
      </div>

      {/* Array generators */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onArrayChange(generateRandomArray(arraySize))}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" /> Random
        </button>
        <button
          onClick={() => onArrayChange(generateSortedArray(arraySize))}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" /> Sorted
        </button>
        <button
          onClick={() => onArrayChange(generateReversedArray(arraySize))}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors"
        >
          <ArrowDown className="w-3.5 h-3.5" /> Reversed
        </button>
        <button
          onClick={() => onArrayChange(generateNearlySortedArray(arraySize))}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" /> Nearly Sorted
        </button>
      </div>

      {/* Search target */}
      {isSearching && (
        <label className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Target:</span>
          <input
            type="number"
            value={searchTarget}
            onChange={e => onSearchTargetChange(Number(e.target.value))}
            disabled={isRunning}
            className="w-24 px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 focus:border-cyan-500 focus:outline-none disabled:opacity-40"
          />
        </label>
      )}
    </div>
  );
}
