import { useState } from 'react';
import { useAlgorithm } from '../hooks/useAlgorithm';
import { useVisualization } from '../hooks/useVisualization';
import { AlgorithmSelector } from './AlgorithmSelector';
import { Controls } from './Controls';
import { ArrayBars } from './ArrayBars';
import { StatsBar } from './StatsBar';
import { CodePanel } from './CodePanel';
import { ComplexityInfo } from './ComplexityInfo';
import { SPEED_RANGE } from '../lib/constants';

export function Visualizer() {
  const [speed, setSpeed] = useState<number>(SPEED_RANGE.default);
  const algorithm = useAlgorithm();
  const visualization = useVisualization(algorithm.generatorFactory, speed);

  const displayArray = visualization.currentStep?.array ?? algorithm.array;
  const isSearching = algorithm.algorithmInfo?.category === 'searching';

  return (
    <div className="space-y-4">
      <AlgorithmSelector
        selected={algorithm.selectedAlgorithm}
        onSelect={algorithm.selectAlgorithm}
      />

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main area */}
        <div className="flex-1 space-y-4 min-w-0">
          <ArrayBars array={displayArray} currentStep={visualization.currentStep} />

          <StatsBar
            currentStep={visualization.currentStep}
            comparisons={visualization.stats.comparisons}
            swaps={visualization.stats.swaps}
            isPlaying={visualization.isPlaying}
            isComplete={visualization.isComplete}
          />

          <Controls
            isPlaying={visualization.isPlaying}
            isComplete={visualization.isComplete}
            speed={speed}
            arraySize={algorithm.arraySize}
            isSearching={isSearching}
            searchTarget={algorithm.searchTarget}
            onPlay={visualization.play}
            onPause={visualization.pause}
            onStep={visualization.step}
            onReset={() => {
              visualization.reset();
              algorithm.regenerateArray();
            }}
            onSpeedChange={setSpeed}
            onSizeChange={algorithm.setArraySize}
            onArrayChange={arr => {
              visualization.reset();
              algorithm.setArray(arr);
            }}
            onSearchTargetChange={algorithm.setSearchTarget}
          />
        </div>

        {/* Side panel */}
        <div className="lg:w-80 space-y-4">
          <ComplexityInfo algorithmInfo={algorithm.algorithmInfo} />
          <CodePanel
            algorithmInfo={algorithm.algorithmInfo}
            currentStep={visualization.currentStep}
          />
        </div>
      </div>
    </div>
  );
}
