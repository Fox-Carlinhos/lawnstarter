import { useTheme } from "../../contexts/ThemeContext";

export const SWHeader = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-[#0a0a0f] border-b border-[#ffd700]/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#ffd700] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
          <span className="text-black text-xs font-black">SW</span>
        </div>
        <h1 className="text-xl font-bold tracking-wider text-[#ffd700]">
          SWSTARTER
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-full border border-[#4a9eff]/50 bg-[#4a9eff]/10 text-[#4a9eff] text-xs font-semibold tracking-wide hover:bg-[#4a9eff]/20 hover:border-[#4a9eff] transition-all duration-300 cursor-pointer"
      >
        CLASSIC UI
      </button>
    </header>
  );
};
