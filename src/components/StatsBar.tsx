import { Activity, ArrowLeftRight, GitCompare } from 'lucide-react';
import type { AnimationStep } from '../algorithms/types';

interface StatsBarProps {
  readonly currentStep: AnimationStep | null;
  readonly comparisons: number;
  readonly swaps: number;
  readonly isPlaying: boolean;
  readonly isComplete: boolean;
}

export function StatsBar({ currentStep, comparisons, swaps, isPlaying, isComplete }: StatsBarProps) {
  const status = isComplete ? 'Complete' : isPlaying ? 'Running' : 'Ready';
  const statusColor = isComplete ? 'text-green-400' : isPlaying ? 'text-yellow-400' : 'text-slate-400';

  return (
    <div className="glass p-3 flex flex-wrap items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <Activity className={`w-4 h-4 ${statusColor}`} />
        <span className={`font-medium ${statusColor}`}>{status}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-300">
        <GitCompare className="w-4 h-4 text-yellow-400" />
        <span>Comparisons: <strong>{comparisons}</strong></span>
      </div>
      <div className="flex items-center gap-2 text-slate-300">
        <ArrowLeftRight className="w-4 h-4 text-red-400" />
        <span>Swaps: <strong>{swaps}</strong></span>
      </div>
      {currentStep && (
        <div className="flex-1 text-right text-slate-400 font-mono text-xs truncate">
          {currentStep.description}
        </div>
      )}
    </div>
  );
}
