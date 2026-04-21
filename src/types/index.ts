export interface HistoryEntry {
  id: string;
  type: 'increment' | 'decrement' | 'reset';
  fromValue: number;
  toValue: number;
  timestamp: number;
}

export interface AppState {
  count: number;
  history: HistoryEntry[];
  darkMode: boolean;
}

export type ThemeMode = 'light' | 'dark';