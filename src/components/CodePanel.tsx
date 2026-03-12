import type { AnimationStep, AlgorithmInfo } from '../algorithms/types';

interface CodePanelProps {
  readonly algorithmInfo: AlgorithmInfo | undefined;
  readonly currentStep: AnimationStep | null;
}

function getHighlightedLine(step: AnimationStep | null, code: string): number {
  if (!step) return -1;
  const lines = code.split('\n');

  const keywords: Record<string, string[]> = {
    compare: ['compare', 'if (arr', '<=', '>=', '<', '>'],
    swap: ['swap', '[arr['],
    pivot: ['pivot'],
    merge: ['place', 'arr[k'],
    search: ['mid', 'low', 'high'],
    found: ['return', 'found'],
    'not-found': ['return -1', 'not found'],
    sorted: ['break', 'return'],
    partition: ['partition'],
  };

  const hints = keywords[step.type] ?? [];
  for (const hint of hints) {
    const idx = lines.findIndex(line => line.toLowerCase().includes(hint.toLowerCase()));
    if (idx !== -1) return idx;
  }
  return -1;
}

export function CodePanel({ algorithmInfo, currentStep }: CodePanelProps) {
  if (!algorithmInfo) return null;

  const lines = algorithmInfo.code.split('\n');
  const highlightIdx = getHighlightedLine(currentStep, algorithmInfo.code);

  return (
    <div className="glass p-4 space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Algorithm Code
      </h3>
      <div className="bg-black/30 rounded-lg p-3 overflow-auto max-h-[300px] font-mono text-xs leading-relaxed">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`px-2 py-0.5 rounded-sm ${idx === highlightIdx ? 'code-highlight' : ''}`}
          >
            <span className="inline-block w-6 text-right mr-3 text-slate-600 select-none">
              {idx + 1}
            </span>
            <span className="text-slate-300">{line || '\u00A0'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
