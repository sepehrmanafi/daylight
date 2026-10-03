import { useRef } from "react";

export function useSwipe(onNext, onBack) {
  const start = useRef(null);
  return {
    onPointerDown: (event) => {
      if (event.target.closest("input,textarea,select,button,a")) return;
      start.current = { x: event.clientX, y: event.clientY };
    },
    onPointerUp: (event) => {
      const point = start.current;
      start.current = null;
      if (!point) return;
      const x = event.clientX - point.x;
      const y = event.clientY - point.y;
      if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.4) {
        (x < 0 ? onNext : onBack)();
      }
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}
