import { ALGORITHMS } from '../algorithms/metadata';

interface AlgorithmSelectorProps {
  readonly selected: string;
  readonly onSelect: (name: string) => void;
}

const sortingAlgorithms = Object.entries(ALGORITHMS).filter(([, info]) => info.category === 'sorting');
const searchingAlgorithms = Object.entries(ALGORITHMS).filter(([, info]) => info.category === 'searching');

export function AlgorithmSelector({ selected, onSelect }: AlgorithmSelectorProps) {
  return (
    <div className="glass p-4 space-y-3">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Sorting
        </h3>
        <div className="flex flex-wrap gap-2">
          {sortingAlgorithms.map(([key, info]) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected === key
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {info.name}
              <span className="ml-1.5 text-xs opacity-60">{info.timeComplexity.average}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Searching
        </h3>
        <div className="flex flex-wrap gap-2">
          {searchingAlgorithms.map(([key, info]) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected === key
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {info.name}
              <span className="ml-1.5 text-xs opacity-60">{info.timeComplexity.average}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
