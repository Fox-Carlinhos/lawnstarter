import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type UITheme = "classic" | "starwars";

interface ThemeContextValue {
  theme: UITheme;
  toggleTheme: () => void;
  isStarWars: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "swstarter-ui-theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<UITheme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "starwars" ? "starwars" : "classic";
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "classic" ? "starwars" : "classic"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isStarWars: theme === "starwars" }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
