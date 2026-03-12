import { Clock, HardDrive, Info } from 'lucide-react';
import type { AlgorithmInfo } from '../algorithms/types';

interface ComplexityInfoProps {
  readonly algorithmInfo: AlgorithmInfo | undefined;
}

export function ComplexityInfo({ algorithmInfo }: ComplexityInfoProps) {
  if (!algorithmInfo) return null;

  return (
    <div className="glass p-4 space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Complexity Analysis
      </h3>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-slate-400">Time Complexity</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {(['best', 'average', 'worst'] as const).map(key => (
            <div key={key} className="bg-white/5 rounded-lg p-2">
              <div className="text-[10px] uppercase text-slate-500 mb-1">{key}</div>
              <div className="font-mono text-sm font-medium">{algorithmInfo.timeComplexity[key]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-slate-400">Space</span>
          <span className="font-mono text-sm">{algorithmInfo.spaceComplexity}</span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            algorithmInfo.stable
              ? 'bg-green-500/10 text-green-400'
              : 'bg-orange-500/10 text-orange-400'
          }`}
        >
          {algorithmInfo.stable ? 'Stable' : 'Unstable'}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-400 leading-relaxed">{algorithmInfo.description}</p>
      </div>
    </div>
  );
}
