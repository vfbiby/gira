import React, { ReactNode, useContext, useEffect } from "react";
import { darkModeKey, useDarkMode } from "../utils/use-darkMode";

interface ThemeContextProps {
  isDark: boolean;
  setDark: (isDark: boolean) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps | undefined>(
  undefined
);

export const DarkProvider = ({ children }: { children: ReactNode }) => {
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const setDark = (isDark: boolean) => {
    localStorage.setItem(darkModeKey, `${isDark}`);
    setDarkMode(isDark);
  };

  const themesContext = {
    isDark: darkMode,
    setDark,
  };

  return (
    <ThemeContext.Provider value={themesContext}>
      {children}
    </ThemeContext.Provider>
  );
};

// this hook is covered by dark-context.test.tsx
export const useDarkTheme = () => {
  const themesContext = useContext(ThemeContext);
  if (themesContext === undefined) {
    throw new Error("useTheme must be wrapped in ThemeContext");
  }
  return themesContext;
};
