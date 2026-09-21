import React, { useEffect, useRef, useState } from "react";
export function useMedia(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query),
      onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}
export function useTaskCelebration(enabled = true) {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [recent, setRecent] = useState([]),
    [bursts, setBursts] = useState([]);
  const timers = useRef(new Set());
  const locked = useRef(new Set());
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );
  const later = (fn, delay) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, delay);
    timers.current.add(id);
  };
  function celebrate(task, element) {
    if (locked.current.has(task.id)) return false;
    if (!enabled || reduced) return true;
    locked.current.add(task.id);
    setRecent((ids) => [...ids, task.id]);
    const r = element?.getBoundingClientRect?.();
    if (r) {
      const id = crypto.randomUUID();
      setBursts((bs) => [
        ...bs,
        { id, x: r.left + r.width / 2, y: r.top + r.height / 2 },
      ]);
      later(() => setBursts((bs) => bs.filter((b) => b.id !== id)), 1000);
    }
    later(() => {
      locked.current.delete(task.id);
      setRecent((ids) => ids.filter((id) => id !== task.id));
    }, 720);
    return true;
  }
  function clear(id) {
    locked.current.delete(id);
    setRecent((ids) => ids.filter((x) => x !== id));
    setBursts([]);
  }
  return {
    recent,
    bursts: enabled && !reduced ? bursts : [],
    celebrate,
    clear,
    reduced,
  };
}
export function CompletionEffects({ bursts }) {
  return (
    <div className="completion-effects" aria-hidden="true">
      {bursts.map((b) => (
        <div
          key={b.id}
          className="completion-burst"
          style={{ left: b.x, top: b.y }}
        >
          <span className="completion-ring" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * Math.PI) / 6;
            return (
              <i
                key={i}
                style={{
                  "--dx": `${Math.cos(angle) * (33 + (i % 3) * 8)}px`,
                  "--dy": `${Math.sin(angle) * (33 + (i % 3) * 8)}px`,
                  "--spin": `${i * 49}deg`,
                  "--particle": ["#e9b051", "#b498d8", "#8ca773", "#e6a49e"][
                    i % 4
                  ],
                  "--delay": `${(i % 3) * 18}ms`,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
