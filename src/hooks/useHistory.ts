import { useState, useEffect } from 'react';
import { HistoryEntry } from '../types';

const HISTORY_KEY = 'sayac-history';

export interface HistoryState {
  history: HistoryEntry[];
  recentHistory: HistoryEntry[];
  addEntry: (type: 'increment' | 'decrement' | 'reset', fromValue: number, toValue: number) => void;
  clearHistory: () => void;
}

function createEntry(
  type: 'increment' | 'decrement' | 'reset',
  fromValue: number,
  toValue: number
): HistoryEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    fromValue,
    toValue,
    timestamp: Date.now(),
  };
}

export function useHistory(): HistoryState {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  const addEntry = (
    type: 'increment' | 'decrement' | 'reset',
    fromValue: number,
    toValue: number
  ) => {
    const entry = createEntry(type, fromValue, toValue);
    setHistory(prev => [entry, ...prev].slice(0, 50));
  };

  const clearHistory = () => setHistory([]);

  return {
    history,
    recentHistory: history.slice(0, 10),
    addEntry,
    clearHistory,
  };
}