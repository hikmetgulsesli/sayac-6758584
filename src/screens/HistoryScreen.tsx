import { HistoryEntry } from '../types';
import { formatDate } from '../utils/time';

interface HistoryScreenProps {
  history: HistoryEntry[];
  onToggleDarkMode: () => void;
  darkMode: boolean;
  onBack: () => void;
}

export function HistoryScreen({
  history,
  onToggleDarkMode,
  darkMode,
  onBack,
}: HistoryScreenProps) {
  const recentHistory = history.slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface dark:bg-[#0f172a] shadow-none">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-on-surface dark:text-white uppercase font-headline">
            Sayıcı
          </div>
          <button
            onClick={onToggleDarkMode}
            className="text-primary dark:text-[#9396ff] hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors rounded-full p-2 scale-95 duration-200 focus:outline-none cursor-pointer"
            aria-label={darkMode ? 'Aydınlık kipe geç' : 'Karanlık kipe geç'}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              contrast
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-32 px-4 max-w-lg mx-auto w-full relative">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold font-headline text-on-surface dark:text-white">İşlem Geçmişi</h1>
          <p className="text-sm text-on-surface-variant dark:text-white mt-2">Son 10 hareketiniz</p>
        </div>

        {recentHistory.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-slate-800/80 dark:bg-surface-container flex items-center justify-center relative shadow-inner mb-8">
              <div className="absolute inset-0 rounded-full border border-white/10 scale-105" />
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-110 opacity-50" />
              <span className="material-symbols-outlined text-6xl text-[#9396ff] opacity-80 rotate-[-5deg]">
                history_toggle_off
              </span>
            </div>
            <h2 className="font-headline text-[24px] font-semibold text-on-surface dark:text-white mb-3">Henüz İşlem Yok</h2>
            <p className="font-body text-[14px] text-on-surface-variant dark:text-white mb-10 max-w-[250px] leading-relaxed text-center">
              Geçmiş liste boş. Saymaya başlayarak burada kayıtlarınızı görebilirsiniz.
            </p>
            <button
              onClick={onBack}
              className="relative bg-gradient-to-br from-primary to-primary-container text-white font-headline text-[16px] font-bold py-4 px-10 rounded-[1.5rem] shadow-[0_12px_32px_-4px_rgba(70,71,211,0.3)] hover:scale-95 transition-all duration-200 active:scale-90 overflow-hidden w-full max-w-[280px] cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Saymaya Başla
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </span>
            </button>
          </div>
        ) : (
          /* History List */
          <div className="flex flex-col gap-4 relative">
            {recentHistory.map((entry, index) => (
              <HistoryItem key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-12px_32px_-4px_rgba(99,102,241,0.08)] flex justify-around items-center px-4 pb-8 pt-4 md:hidden">
        <a
          href="#"
          className="flex flex-col items-center justify-center text-[#abadaf] dark:text-[#64748b] px-6 py-3 hover:scale-105 transition-transform cursor-pointer"
          onClick={onBack}
        >
          <span className="material-symbols-outlined mb-1 text-[24px]">plus_one</span>
          <span className="font-headline text-[12px] font-bold tracking-wide uppercase">Sayaç</span>
        </a>
        <a
          href="#history"
          className="flex flex-col items-center justify-center bg-[#6366F1]/10 dark:bg-[#6366F1]/20 text-[#6366F1] dark:text-[#9396ff] rounded-2xl px-6 py-2 scale-90 transition-all duration-200 cursor-pointer"
          aria-current="page"
        >
          <span className="material-symbols-outlined mb-1 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="font-headline text-[12px] font-bold tracking-wide uppercase">Geçmiş</span>
        </a>
      </nav>
    </div>
  );
}

interface HistoryItemProps {
  entry: HistoryEntry;
  index: number;
}

function HistoryItem({ entry }: HistoryItemProps) {
  const getIconAndColor = () => {
    switch (entry.type) {
      case 'increment':
        return {
          icon: 'add',
          bgClass: 'bg-primary-container',
          textClass: 'text-primary',
          label: 'Artırıldı',
        };
      case 'decrement':
        return {
          icon: 'remove',
          bgClass: 'bg-secondary-container',
          textClass: 'text-secondary',
          label: 'Azaltıldı',
        };
      case 'reset':
        return {
          icon: 'refresh',
          bgClass: 'bg-surface-variant',
          textClass: 'text-on-surface-variant',
          label: 'Sıfırlandı',
        };
    }
  };

  const { icon, bgClass, textClass, label } = getIconAndColor();

  return (
    <div className="bg-surface-container-lowest dark:bg-surface-container rounded-[24px] p-5 shadow-[0_12px_32px_-4px_rgba(70,71,211,0.06)] flex items-center justify-between transform hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${bgClass} flex items-center justify-center shrink-0`}>
          <span className={`material-symbols-outlined font-bold ${textClass}`} style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <div>
          <h3 className="font-bold text-on-surface dark:text-white text-base font-body">{label}</h3>
          <p className="text-xs text-on-surface-variant dark:text-white font-medium mt-0.5 font-body">
            {formatDate(entry.timestamp)}
          </p>
        </div>
      </div>
      <div className="bg-surface-container-low dark:bg-surface-container-high px-4 py-2 rounded-full">
        <span className="font-bold text-on-surface dark:text-white tracking-wide font-label">
          {entry.fromValue} <span className="material-symbols-outlined text-[14px] align-middle mx-1">arrow_forward</span> {entry.toValue}
        </span>
      </div>
    </div>
  );
}