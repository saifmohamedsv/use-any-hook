import { useEffect, useState } from "react";

export interface UseDarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkMode = (): UseDarkModeState => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Get initial state from localStorage (optional)
    const persistedTheme = localStorage.getItem("theme");
    return persistedTheme === "dark" ? true : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    // Optional: Apply CSS classes based on isDarkMode
    const bodyElement = document.body;
    const darkClass = "dark"; // Replace with your actual class name

    if (isDarkMode) {
      bodyElement.classList.add(darkClass);
    } else {
      bodyElement.classList.remove(darkClass);
    }

    // Cleanup function to remove class on unmount
    return () => {
      bodyElement.classList.remove(darkClass);
    };
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode };
};
