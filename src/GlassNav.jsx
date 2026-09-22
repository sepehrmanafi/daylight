import React, { useState, useRef } from "react";
import { Home, CalendarDays, Plus, Timer, Heart } from "lucide-react";
// Material and spring from the user's liqid glass.html. Tailwind layout is local CSS.
export default function GlassNav({ view, onGo, onAdd, timer, solid }) {
  const active =
    view === "My day"
      ? 0
      : view === "Focus"
        ? 3
        : ["You", "Habits"].includes(view)
          ? 4
          : 1;
  const [drag, setDrag] = useState(null);
  const gesture = useRef(null),
    suppress = useRef(false),
    container = useRef(null);
  const items = [
    ["My day", "Home", Home],
    ["All tasks", "Plan", CalendarDays],
    ["add", "Add a task", Plus],
    ["Focus", "Focus", Timer],
    ["You", "You", Heart],
  ];
  const choose = (i) => {
    if (i === 2) onAdd();
    else onGo(items[i][0]);
  };
  const down = (e) => {
    if (e.button !== 0 || !e.target.closest("button")) return;
    const index = Number(e.target.closest("button").dataset.index);
    if (index !== active) return;
    const width = container.current.clientWidth;
    gesture.current = {
      x: e.clientX,
      left: (active * width) / 5,
      width,
      moved: false,
    };
  };
  const move = (e) => {
    const g = gesture.current;
    if (!g) return;
    const dx = e.clientX - g.x;
    if (Math.abs(dx) > 7 && !g.moved) {
      g.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (g.moved) setDrag(Math.max(0, Math.min((g.width * 4) / 5, g.left + dx)));
  };
  const end = (e, cancel = false) => {
    const g = gesture.current;
    if (!g) return;
    gesture.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (g.moved) {
      suppress.current = true;
      setTimeout(() => {
        suppress.current = false;
      }, 0);
      const i = Math.round(
        Math.max(0, Math.min((g.width * 4) / 5, g.left + e.clientX - g.x)) /
          (g.width / 5),
      );
      if (!cancel) choose(i);
    }
    setDrag(null);
  };
  const preview =
    drag === null
      ? active
      : Math.round(drag / (container.current.clientWidth / 5));
  return (
    <div className={`m-dock-wrap supplied-dock ${solid ? "solid-glass" : ""}`}>
      <nav className="glass-nav" aria-label="Mobile navigation">
        <span className="glass-specular" />
        <span className="glass-rim" />
        <div
          ref={container}
          className="glass-icons"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={(e) => end(e)}
          onPointerCancel={(e) => end(e, true)}
        >
          <span
            className="simple-gray-pill"
            style={{
              left: drag === null ? `${active * 20}%` : drag,
              transition: drag === null ? undefined : "none",
            }}
          />
          {items.map(([id, label, Icon], i) => (
            <button
              key={id}
              data-index={i}
              type="button"
              title={label}
              aria-label={label}
              aria-current={i === active ? "page" : undefined}
              className={`nav-btn ${preview === i ? "active" : ""}`}
              onClick={() => {
                if (suppress.current) {
                  suppress.current = false;
                  return;
                }
                choose(i);
              }}
            >
              <Icon size={25} strokeWidth={1.85} />
              {id === "Focus" && timer.running && (
                <i className="nav-timer-dot" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
