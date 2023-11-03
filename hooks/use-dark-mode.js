// Custom hook for managing theme (light/dark mode)
import { useState } from "react";

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode };
}

export default useDarkMode;
