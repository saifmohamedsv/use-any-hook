import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.hook"; // Assuming useLocalStorage is also typed

export interface UseLocalStorageWithExpiryState<T> {
  value: T | null;
  setStoredValue: (newValue: T) => void;
}

export const useLocalStorageWithExpiry = <T>(
  key: string,
  initialValue: T,
  expiryMs: number
): UseLocalStorageWithExpiryState<T> => {
  const { value, setStoredValue: setValue } = useLocalStorage<T>(
    key,
    initialValue
  );

  useEffect(() => {
    const item = localStorage.getItem(key) as string;
    const itemWithExpiry: { value: T; expiry: number } | null =
      JSON.parse(item) || null;

    if (
      itemWithExpiry &&
      itemWithExpiry.expiry &&
      new Date().getTime() > itemWithExpiry.expiry
    ) {
      localStorage.removeItem(key);
    }
  }, [key, initialValue, expiryMs]); // Include expiryMs in the dependency array

  const setStoredValue = (newValue: T) => {
    const now = new Date();
    const itemWithExpiry = {
      value: newValue,
      expiry: now.getTime() + expiryMs,
    };
    localStorage.setItem(key, JSON.stringify(itemWithExpiry));
  };

  return { value, setStoredValue };
};
