import { RefObject, useEffect, useRef, useState } from "react";

 interface MousePosition {
  x: number | null;
  y: number | null;
}

export const useMousePosition = <T extends HTMLElement>(
  ref: React.Ref<T>
): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      if ((ref as RefObject<HTMLElement>).current) {
        const { left, top } = (
          ref as RefObject<HTMLElement>
        )?.current?.getBoundingClientRect() as DOMRect;
        setMousePosition({ x: clientX - left, y: clientY - top });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [ref]);

  return mousePosition;
};
