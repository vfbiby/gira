import { useEffect, useState } from "react";

export const darkModeKey = '__dark_mode__';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem(darkModeKey) === "true" ||
      (!(darkModeKey in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);
  return { darkMode, setDarkMode };
};
