import { AppState, HistoryEntry } from '../types';

const STORAGE_KEY = 'sayac-app-state';

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, history: [], darkMode: false };
    const parsed = JSON.parse(raw);
    return {
      count: parsed.count ?? 0,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      darkMode: parsed.darkMode ?? false,
    };
  } catch {
    return { count: 0, history: [], darkMode: false };
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function createHistoryEntry(
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