import { useState, useRef, useCallback, useEffect } from 'react';
import type { AnimationStep } from '../algorithms/types';

interface Stats {
  readonly comparisons: number;
  readonly swaps: number;
}

interface UseVisualizationReturn {
  readonly currentStep: AnimationStep | null;
  readonly isPlaying: boolean;
  readonly isComplete: boolean;
  readonly stats: Stats;
  readonly play: () => void;
  readonly pause: () => void;
  readonly step: () => void;
  readonly reset: () => void;
}

export function useVisualization(
  generatorFactory: (() => Generator<AnimationStep>) | null,
  speed: number,
): UseVisualizationReturn {
  const [currentStep, setCurrentStep] = useState<AnimationStep | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [stats, setStats] = useState<Stats>({ comparisons: 0, swaps: 0 });

  const generatorRef = useRef<Generator<AnimationStep> | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isPlayingRef = useRef(false);

  const updateStats = useCallback((stepType: string) => {
    setStats(prev => {
      const next = { ...prev };
      if (stepType === 'compare' || stepType === 'search') {
        return { ...next, comparisons: next.comparisons + 1 };
      }
      if (stepType === 'swap') {
        return { ...next, swaps: next.swaps + 1 };
      }
      return next;
    });
  }, []);

  const advanceStep = useCallback((): boolean => {
    if (!generatorRef.current) return false;
    const result = generatorRef.current.next();
    if (result.done) {
      setIsComplete(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
      return false;
    }
    setCurrentStep(result.value);
    updateStats(result.value.type);
    return true;
  }, [updateStats]);

  const animate = useCallback(
    (timestamp: number) => {
      if (!isPlayingRef.current) return;

      const elapsed = timestamp - lastTimeRef.current;
      const delay = Math.max(1, 201 - speed);

      if (elapsed >= delay) {
        lastTimeRef.current = timestamp;
        const hasMore = advanceStep();
        if (!hasMore) return;
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [speed, advanceStep],
  );

  const play = useCallback(() => {
    if (isComplete) return;
    if (!generatorRef.current && generatorFactory) {
      generatorRef.current = generatorFactory();
    }
    setIsPlaying(true);
    isPlayingRef.current = true;
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);
  }, [isComplete, generatorFactory, animate]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  const step = useCallback(() => {
    if (isComplete) return;
    if (!generatorRef.current && generatorFactory) {
      generatorRef.current = generatorFactory();
    }
    pause();
    advanceStep();
  }, [isComplete, generatorFactory, pause, advanceStep]);

  const reset = useCallback(() => {
    pause();
    generatorRef.current = null;
    setCurrentStep(null);
    setIsComplete(false);
    setStats({ comparisons: 0, swaps: 0 });
  }, [pause]);

  // Reset when generator factory changes
  useEffect(() => {
    reset();
  }, [generatorFactory, reset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { currentStep, isPlaying, isComplete, stats, play, pause, step, reset };
}
