import { useEffect, useState } from "react";

interface UseLocalStorageResponse<T> {
  value: T;
  setStoredValue: (value: T | ((val: T) => T)) => void;
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): UseLocalStorageResponse<T> => {
  // State to store our value
  const [value, setValue] = useState<T>(initialValue);

  // Get from local storage only during initial render
  useEffect(() => {
    // Parse stored json or return initialValue
    const item = window.localStorage.getItem(key);
    const parsedValue: T = item ? JSON.parse(item) : initialValue;
    setValue(parsedValue);
  }, [key, initialValue]); // Only re-run on change in `key` or `initialValue`

  // Return a wrapper function that provides access to the stored value
  // and a setter function to update it
  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    // Allow value to be a function so we have same API as useState
    const updatedValue =
      newValue instanceof Function ? newValue(value) : newValue;

    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(updatedValue));
    setValue(updatedValue);
  };

  return { value, setStoredValue };
};
