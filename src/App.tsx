import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Play, RotateCcw, ShieldCheck, Zap, Terminal } from 'lucide-react';

const DSAVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 80) + 10);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setCompleted([]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(50);
        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(50);
        }
        setSwapping([]);
      }
      setCompleted(prev => [...prev, arr.length - i - 1]);
    }
    setSorting(false);
    setComparing([]);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl flex justify-between items-center glass-morphism p-6 rounded-2xl mb-12"
      >
        <div className="flex items-center gap-3">
          <div className="banana-gradient p-2 rounded-lg">
            <Zap className="text-slate-900" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">NanoDSA <span className="text-yellow-500">Visualizer</span></h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={generateArray}
            disabled={sorting}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all disabled:opacity-50"
          >
            <RotateCcw size={18} /> New Array
          </button>
          <button 
            onClick={bubbleSort}
            disabled={sorting}
            className="flex items-center gap-2 px-6 py-2 banana-gradient text-slate-950 font-bold rounded-lg hover:scale-105 transition-all disabled:opacity-50"
          >
            <Play size={18} /> Visualize
          </button>
        </div>
      </motion.div>

      {/* Main Visualization Area */}
      <div className="w-full max-w-4xl glass-morphism p-12 rounded-3xl h-[400px] flex items-end justify-between gap-2 text-slate-50">
        <AnimatePresence>
          {array.map((value, idx) => (
            <motion.div
              key={`${idx}-${value}`}
              layout
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              exit={{ scale: 0 }}
              className={`w-full rounded-t-md relative group ${
                swapping.includes(idx) ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                comparing.includes(idx) ? 'bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]' :
                completed.includes(idx) ? 'bg-green-400' : 'bg-slate-600'
              }`}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {value}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Info / Stats */}
      <div className="w-full max-w-4xl mt-12 grid grid-cols-3 gap-6">
        <div className="glass-morphism p-4 rounded-xl flex items-center gap-4">
          <BarChart3 className="text-yellow-500" />
          <div>
            <p className="text-xs text-slate-400 uppercase">Algorithm</p>
            <p className="font-bold">Bubble Sort</p>
          </div>
        </div>
        <div className="glass-morphism p-4 rounded-xl flex items-center gap-4">
          <ShieldCheck className="text-green-500" />
          <div>
            <p className="text-xs text-slate-400 uppercase">Complexity</p>
            <p className="font-bold">O(n²)</p>
          </div>
        </div>
        <div className="glass-morphism p-4 rounded-xl flex items-center gap-4">
          <Terminal className="text-blue-500" />
          <div>
            <p className="text-xs text-slate-400 uppercase">Status</p>
            <p className="font-bold">{sorting ? 'Visualizing...' : 'Ready'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAVisualizer;
