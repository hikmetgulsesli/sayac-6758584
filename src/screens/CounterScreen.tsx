interface CounterDisplayProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onToggleDarkMode: () => void;
  darkMode: boolean;
}

export function CounterScreen({
  count,
  onIncrement,
  onDecrement,
  onReset,
  onToggleDarkMode,
  darkMode,
}: CounterDisplayProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface dark:bg-[#0f172a] shadow-none">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight text-on-surface dark:text-white uppercase font-headline">
            Sayıcı
          </h1>
          <button
            onClick={onToggleDarkMode}
            className="text-primary dark:text-[#9396ff] hover:bg-surface-container-low dark:hover:bg-slate-800 rounded-full p-2 transition-colors scale-95 duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            aria-label={darkMode ? 'Aydınlık kipe geç' : 'Karanlık kipe geç'}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              contrast
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pb-32 w-full max-w-lg mx-auto relative">
        {/* Ambient Background */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

        {/* Counter Display */}
        <div className="w-full relative z-10 flex flex-col items-center mt-[-5vh]">
          <div className="bg-surface-container-lowest dark:bg-surface-container-low rounded-[2.5rem] p-12 flex flex-col items-center w-full shadow-[0_24px_48px_-12px_rgba(70,71,211,0.08)] relative overflow-hidden">
            <h2 className="text-label-md font-bold tracking-widest text-on-surface-variant dark:text-white mb-8 uppercase font-label">
              Günlük Takip
            </h2>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[96px] leading-[0.8] font-extrabold tracking-[-0.04em] text-on-surface dark:text-white">
                {count}
              </span>
            </div>
            <span className="text-body-md text-on-surface-variant dark:text-white mt-6 font-medium font-body">
              Adet
            </span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="w-full relative z-10 mt-10 flex flex-col gap-8 px-2">
          {/* Increment / Decrement Row */}
          <div className="flex items-center justify-center gap-6 w-full">
            {/* Decrement Button */}
            <button
              onClick={onDecrement}
              className="bg-surface-container-low dark:bg-surface-container text-primary dark:text-[#9396ff] hover:bg-surface-container-high transition-colors rounded-3xl w-20 h-24 flex flex-col items-center justify-center shadow-[0_8px_16px_-4px_rgba(70,71,211,0.06)] active:scale-90 duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
              aria-label="Azalt"
            >
              <span className="material-symbols-outlined text-4xl mb-1">remove</span>
              <span className="text-label-md font-bold text-on-surface-variant dark:text-white">-1</span>
            </button>

            {/* Primary Increment Button */}
            <button
              onClick={onIncrement}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary hover:opacity-90 transition-all rounded-[2.5rem] flex-grow h-32 flex flex-col items-center justify-center shadow-[0_16px_32px_-8px_rgba(70,71,211,0.25)] active:scale-95 duration-200 focus:outline-none focus:ring-4 focus:ring-primary-container/50 relative overflow-hidden group cursor-pointer"
              aria-label="Artır"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="material-symbols-outlined text-6xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              <span className="text-body-md font-bold opacity-90 tracking-wide">+1</span>
            </button>
          </div>

          {/* Reset Action */}
          <div className="flex justify-end w-full pr-4 mt-2">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-on-surface-variant dark:text-white hover:text-error transition-colors px-5 py-3 rounded-full hover:bg-surface-container-low active:scale-95 duration-200 focus:outline-none focus:ring-2 focus:ring-outline-variant/40 cursor-pointer"
              aria-label="Sıfırla"
            >
              <span className="material-symbols-outlined text-xl">refresh</span>
              <span className="text-body-md font-semibold tracking-wide font-body">Sıfırla</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-12px_32px_-4px_rgba(99,102,241,0.08)] flex justify-around items-center px-4 pb-8 pt-4 md:hidden">
        <a
          href="#"
          className="flex flex-col items-center justify-center bg-[#6366F1]/10 dark:bg-[#6366F1]/20 text-[#6366F1] dark:text-[#9396ff] rounded-2xl px-8 py-3 hover:scale-105 transition-transform active:scale-90 duration-200 w-24 cursor-pointer"
          aria-current="page"
        >
          <span className="material-symbols-outlined mb-1 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>plus_one</span>
          <span className="font-headline text-[12px] font-bold tracking-wide uppercase">Sayaç</span>
        </a>
        <a
          href="#history"
          className="flex flex-col items-center justify-center text-[#abadaf] dark:text-[#64748b] px-8 py-3 hover:scale-105 transition-transform active:scale-90 duration-200 w-24 cursor-pointer"
        >
          <span className="material-symbols-outlined mb-1 text-[28px]">history</span>
          <span className="font-headline text-[12px] font-bold tracking-wide uppercase">Geçmiş</span>
        </a>
      </nav>
    </div>
  );
}