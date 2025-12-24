import { useTheme } from "../contexts/ThemeContext";

export const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="w-full h-12 flex items-center justify-between px-4 shadow-[0_1px_0_0_rgb(0,128,128)] bg-white">
      <div />
      <h1 className="text-base font-semibold text-center leading-none">
        SWStarter
      </h1>
      <button
        onClick={toggleTheme}
        className="px-3 py-1.5 rounded-full border border-teal-500 bg-teal-50 text-teal-600 text-[10px] font-bold tracking-wide hover:bg-teal-100 transition-colors"
      >
        STAR WARS UI
      </button>
    </header>
  );
};
