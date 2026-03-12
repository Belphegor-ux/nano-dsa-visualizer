import { motion } from 'framer-motion';
import type { AnimationStep } from '../algorithms/types';
import { COLORS } from '../lib/constants';

interface ArrayBarsProps {
  readonly array: readonly number[];
  readonly currentStep: AnimationStep | null;
  readonly maxValue?: number;
}

function getBarColor(
  index: number,
  step: AnimationStep | null,
  value: number,
  maxVal: number,
): string {
  if (!step) {
    const ratio = value / maxVal;
    return `color-mix(in srgb, ${COLORS.default} ${Math.round((1 - ratio) * 100)}%, #8b5cf6 ${Math.round(ratio * 100)}%)`;
  }

  const isHighlighted = step.highlighted.includes(index);
  const isSorted = step.sortedIndices?.includes(index);

  if (isSorted && !isHighlighted) return COLORS.sorted;

  if (isHighlighted) {
    switch (step.type) {
      case 'compare':
      case 'search':
        return COLORS.comparing;
      case 'swap':
        return COLORS.swapping;
      case 'sorted':
        return COLORS.sorted;
      case 'pivot':
      case 'partition':
        return COLORS.pivot;
      case 'merge':
        return COLORS.merge;
      case 'found':
        return COLORS.found;
      case 'not-found':
        return COLORS.notFound;
    }
  }

  const ratio = value / maxVal;
  return `color-mix(in srgb, ${COLORS.default} ${Math.round((1 - ratio) * 100)}%, #8b5cf6 ${Math.round(ratio * 100)}%)`;
}

export function ArrayBars({ array, currentStep, maxValue }: ArrayBarsProps) {
  const maxVal = maxValue ?? Math.max(...array, 1);
  const showLabels = array.length <= 30;

  return (
    <div className="glass p-4 flex-1 min-h-[300px] flex items-end justify-center gap-[1px] md:gap-[2px] overflow-hidden">
      {array.map((value, index) => {
        const heightPercent = (value / maxVal) * 100;
        const color = getBarColor(index, currentStep, value, maxVal);

        return (
          <motion.div
            key={`${index}-${array.length}`}
            layout
            className="relative flex flex-col items-center justify-end"
            style={{
              width: `${Math.max(100 / array.length - 0.5, 2)}%`,
              minWidth: '2px',
            }}
          >
            {showLabels && (
              <span className="text-[9px] font-mono text-slate-400 mb-1 select-none">
                {value}
              </span>
            )}
            <motion.div
              className="w-full rounded-t-sm"
              animate={{
                height: `${heightPercent}%`,
                backgroundColor: color,
              }}
              transition={{
                height: { type: 'spring', stiffness: 300, damping: 30 },
                backgroundColor: { duration: 0.15 },
              }}
              style={{
                minHeight: '4px',
                maxHeight: '280px',
                height: `${heightPercent}%`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
