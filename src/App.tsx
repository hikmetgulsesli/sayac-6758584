import { useState, useEffect } from 'react';
import { CounterScreen } from './screens/CounterScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { AppState } from './types';
import { loadState, saveState, createHistoryEntry } from './utils/storage';

type View = 'counter' | 'history';

function App() {
  const [appState, setAppState] = useState<AppState>(() => loadState());
  const [currentView, setCurrentView] = useState<View>('counter');

  useEffect(() => {
    saveState(appState);
  }, [appState]);

  useEffect(() => {
    const root = document.documentElement;
    if (appState.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [appState.darkMode]);

  const handleIncrement = () => {
    const newCount = appState.count + 1;
    const entry = createHistoryEntry('increment', appState.count, newCount);
    const newHistory = [entry, ...appState.history].slice(0, 50);
    setAppState(prev => ({
      ...prev,
      count: newCount,
      history: newHistory,
    }));
  };

  const handleDecrement = () => {
    const newCount = Math.max(0, appState.count - 1);
    const entry = createHistoryEntry('decrement', appState.count, newCount);
    const newHistory = [entry, ...appState.history].slice(0, 50);
    setAppState(prev => ({
      ...prev,
      count: newCount,
      history: newHistory,
    }));
  };

  const handleReset = () => {
    const entry = createHistoryEntry('reset', appState.count, 0);
    const newHistory = [entry, ...appState.history].slice(0, 50);
    setAppState(prev => ({
      ...prev,
      count: 0,
      history: newHistory,
    }));
  };

  const handleToggleDarkMode = () => {
    setAppState(prev => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const handleBack = () => {
    setCurrentView('counter');
  };

  if (currentView === 'history') {
    return (
      <HistoryScreen
        history={appState.history}
        onToggleDarkMode={handleToggleDarkMode}
        darkMode={appState.darkMode}
        onBack={handleBack}
      />
    );
  }

  return (
    <CounterScreen
      count={appState.count}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onReset={handleReset}
      onToggleDarkMode={handleToggleDarkMode}
      darkMode={appState.darkMode}
    />
  );
}

export default App;