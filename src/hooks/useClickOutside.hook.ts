import { RefObject, useEffect, useRef } from "react";

export type ClickOutsideCallback = () => void;

export const useClickOutside = <T extends HTMLElement>(
  ref: React.Ref<T>,
  callback: ClickOutsideCallback
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref) {
        if (
          (ref as RefObject<T>) &&
          "current" in ref &&
          !ref?.current?.contains(event.target as Node)
        ) {
          callback();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
