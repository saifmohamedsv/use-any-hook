// Custom hook to persist data in local storage
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Get the stored value or use the initial value
  const storedValue = localStorage.getItem(key) || initialValue;

  // State to hold the current value
  const [value, setValue] = useState(storedValue);

  // Update the local storage whenever the value changes
  const setStoredValue = (newValue) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setStoredValue];
}

export default useLocalStorage;
