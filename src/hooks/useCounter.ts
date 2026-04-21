import { useState, useEffect } from 'react';

const COUNT_KEY = 'sayac-counter-count';

export interface CounterState {
  count: number;
  increment: () => void;
  incrementBy: (amount: number) => void;
  decrement: () => void;
  decrementBy: (amount: number) => void;
  reset: () => void;
}

export function useCounter(): CounterState {
  const [count, setCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(COUNT_KEY);
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(COUNT_KEY, String(count));
    } catch {
      // ignore
    }
  }, [count]);

  const increment = () => setCount(prev => prev + 1);
  const incrementBy = (amount: number) => setCount(prev => prev + amount);
  const decrement = () => setCount(prev => Math.max(0, prev - 1));
  const decrementBy = (amount: number) => setCount(prev => Math.max(0, prev - amount));
  const reset = () => setCount(0);

  return { count, increment, incrementBy, decrement, decrementBy, reset };
}