import { useState } from 'react';
import { Layout } from './components/Layout';
import { Visualizer } from './components/Visualizer';
import { RaceMode } from './components/RaceMode';

type View = 'visualizer' | 'race';

function App() {
  const [view, setView] = useState<View>('visualizer');

  return (
    <Layout>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('visualizer')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === 'visualizer'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Visualizer
        </button>
        <button
          onClick={() => setView('race')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === 'race'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Race Mode
        </button>
      </div>

      {view === 'visualizer' && <Visualizer />}
      {view === 'race' && <RaceMode />}
    </Layout>
  );
}

export default App;
