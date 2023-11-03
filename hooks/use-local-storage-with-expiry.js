import { useState, useEffect } from "react";
import useLocalStorage from "./use-local-storage";

function useLocalStorageWithExpiry(key, initialValue, expiryMs) {
  const [value, setValue] = useLocalStorage(key, initialValue);

  useEffect(() => {
    const item = localStorage.getItem(key);
    const itemWithExpiry = JSON.parse(item);

    if (
      itemWithExpiry &&
      itemWithExpiry.expiry &&
      new Date().getTime() > itemWithExpiry.expiry
    ) {
      localStorage.removeItem(key);
      setValue(initialValue);
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue) => {
    const now = new Date();
    const itemWithExpiry = {
      value: newValue,
      expiry: now.getTime() + expiryMs,
    };
    localStorage.setItem(key, JSON.stringify(itemWithExpiry));
    setValue(newValue);
  };

  return [value, setStoredValue];
}

export default useLocalStorageWithExpiry;
