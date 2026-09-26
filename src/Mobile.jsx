import React, { useState, useEffect } from "react";
import {
  Home,
  CalendarDays,
  Plus,
  Timer,
  Heart,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  Check,
  Sun,
  Sparkles,
  Leaf,
  BookOpen,
  Coffee,
  LayoutGrid,
  Inbox,
  CheckCheck,
  SlidersHorizontal,
  List,
  Columns3,
  Play,
  MoreHorizontal,
  Flag,
  X,
  Repeat2,
  Target,
  FolderOpen,
  ShieldCheck,
} from "lucide-react";
import "./mobile.css";
import GlassNav from "./GlassNav.jsx";
import MoodSpace from "./MoodSpace.jsx";
import ProjectArtwork from "./ProjectArtwork.jsx";
import "./experience.css";
const photo = (n) => `${import.meta.env.BASE_URL}images/${n}.jpg`;
const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => dayKey();
const parse = (s) => new Date(s + "T12:00:00");
const offset = (n, base = new Date()) => {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return dayKey(d);
};
const shortDate = (s) =>
  !s
    ? "Anytime"
    : s === today()
      ? "Today"
      : s === offset(1)
        ? "Tomorrow"
        : parse(s).toLocaleDateString("en", { month: "short", day: "numeric" });
const MOODS = [
  ["low", "Low", "#dfd5ed"],
  ["tired", "Tired", "#e7dcca"],
  ["okay", "Okay", "#f6d782"],
  ["good", "Good", "#f4bab2"],
  ["great", "Great", "#c5d7ac"],
];
function SectionTitle({ title, action, onClick }) {
  return (
    <div className="m-section-title">
      <h2>{title}</h2>
      {action && (
        <button onClick={onClick}>
          {action}
          <ArrowUpRight size={14} />
        </button>
      )}
    </div>
  );
}
export function MoodFace({ mood = "good", size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <circle
        cx="24"
        cy="24"
        r="23"
        fill={MOODS.find((m) => m[0] === mood)?.[2] || "#f6d782"}
      />
      {mood === "great" ? (
        <>
          <path
            d="M13 20q3-5 6 0m10 0q3-5 6 0"
            stroke="#554b3f"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M17 28q7 10 14 0Z" fill="#554b3f" />
        </>
      ) : (
        <>
          <path
            d={mood === "tired" ? "M13 21h6m10 0h6" : "M16 19v2m16-2v2"}
            stroke="#554b3f"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={
              mood === "low"
                ? "M18 31q6-7 12 0"
                : mood === "okay" || mood === "tired"
                  ? "M20 30h8"
                  : "M17 28q7 8 14 0"
            }
            stroke="#554b3f"
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}
      <ellipse cx="12" cy="27" rx="3" ry="1.6" fill="#da8e8050" />
      <ellipse cx="36" cy="27" rx="3" ry="1.6" fill="#da8e8050" />
    </svg>
  );
}
function TinyArt({ type = 0 }) {
  return (
    <svg className="tiny-art" viewBox="0 0 120 120" aria-hidden="true">
      {type % 3 === 0 ? (
        <>
          <ellipse cx="62" cy="103" rx="34" ry="7" fill="#76590e14" />
          <rect
            x="28"
            y="23"
            width="65"
            height="79"
            rx="13"
            fill="#fff5d5"
            transform="rotate(10 60 60)"
          />
          <rect
            x="31"
            y="24"
            width="58"
            height="68"
            rx="10"
            fill="#fffaf0"
            transform="rotate(10 60 60)"
          />
          <path
            d="M49 52l8 12 22-23"
            fill="none"
            stroke="#b89144"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="91" cy="79" r="17" fill="#e9ae6b" />
          <path
            d="M84 79h14m-7-7v14"
            stroke="#fff5d5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : type % 3 === 1 ? (
        <>
          <ellipse cx="61" cy="103" rx="34" ry="7" fill="#2e5b7814" />
          <circle cx="61" cy="61" r="38" fill="#e6e8f2" />
          <circle cx="61" cy="61" r="25" fill="#bec8e3" />
          <circle cx="61" cy="61" r="17" fill="#aacdf2" />
          <circle cx="42" cy="79" r="23" fill="#f4cfb8" />
          <circle cx="87" cy="85" r="14" fill="#677eae" />
        </>
      ) : (
        <>
          <ellipse cx="60" cy="103" rx="34" ry="7" fill="#2b5b2c14" />
          <path d="M60 94V40" stroke="#667e50" strokeWidth="5" />
          <ellipse
            cx="44"
            cy="54"
            rx="13"
            ry="25"
            fill="#8da56a"
            transform="rotate(-42 44 54)"
          />
          <ellipse
            cx="76"
            cy="42"
            rx="14"
            ry="27"
            fill="#607c53"
            transform="rotate(40 76 42)"
          />
          <path d="M34 83h53l-10 29H44z" fill="#eee7cc" />
        </>
      )}
    </svg>
  );
}
function ProgressRing({ value, goal, size = 42 }) {
  const pct = Math.min(1, value / Math.max(1, goal));
  return (
    <div
      className="m-progress-ring"
      style={{ width: size, height: size }}
      aria-label={`${value} of ${goal} daily tasks completed`}
    >
      <svg viewBox="0 0 48 48">
        <circle className="ring-track" cx="24" cy="24" r="20" />
        <circle
          className="ring-fill"
          cx="24"
          cy="24"
          r="20"
          pathLength="100"
          strokeDasharray={`${pct * 100} 100`}
        />
      </svg>
      <span>{value >= goal ? <Check size={16} /> : value}</span>
    </div>
  );
}
function WeekStrip({ selected, onSelect }) {
  const monday = parse(selected);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, i) => offset(i, monday));
  return (
    <section className="m-week" aria-label="Choose a day">
      <div className="m-week-caption">
        <button
          aria-label="Previous week"
          onClick={() => onSelect(offset(-7, parse(selected)))}
        >
          <ChevronLeft size={17} />
        </button>
        <span>
          {monday.toLocaleDateString("en", { month: "long", year: "numeric" })}
        </span>
        <button className="m-back-today" onClick={() => onSelect(today())}>
          Today
        </button>
        <button
          aria-label="Next week"
          onClick={() => onSelect(offset(7, parse(selected)))}
        >
          <ChevronRight size={17} />
        </button>
      </div>
      <div className="m-week-days">
        {days.map((d) => (
          <button
            key={d}
            aria-label={`Select ${d}`}
            aria-pressed={selected === d}
            onClick={() => onSelect(d)}
            className={`${selected === d ? "selected" : ""} ${d === today() ? "is-today" : ""}`}
          >
            <span>
              {parse(d).toLocaleDateString("en", { weekday: "short" })}
            </span>
            <b>{parse(d).getDate()}</b>
            <i />
          </button>
        ))}
      </div>
    </section>
  );
}
function MobileTask({
  task: t,
  projects,
  onEdit,
  onToggle,
  recent,
  featured = false,
  index = 0,
}) {
  const p = projects.find((p) => p.id === t.projectId);
  const finishing = recent.includes(t.id);
  return (
    <article
      className={`${featured ? "m-task-card" : "m-task-row"} ${t.status === "done" ? "is-done" : ""} ${finishing ? "just-completed" : ""}`}
      style={
        featured
          ? {
              "--card-color": ["#ffe0a3", "#bfd8fa", "#dae5c8", "#ead5e5"][
                index % 4
              ],
            }
          : undefined
      }
    >
      <button
        className="m-task-check"
        aria-label={`${t.status === "done" ? "Reopen" : "Complete"} ${t.title}`}
        aria-pressed={t.status === "done"}
        disabled={finishing}
        onClick={(e) => onToggle(t, e.currentTarget)}
      >
        {t.status === "done" && <Check size={18} />}
      </button>
      {featured && (
        <>
          <span className={`m-priority ${t.priority}`}>
            {t.priority === "high"
              ? "Make it matter"
              : t.priority === "medium"
                ? "A steady step"
                : "Take it easy"}
          </span>
          <TinyArt type={index} />
        </>
      )}
      <button className="m-task-open" onClick={() => onEdit(t)}>
        <strong>{t.title}</strong>
        <span>
          <i style={{ background: p?.color || "#ddd0ae" }} />
          {p?.name || "Inbox"}
          {t.repeat !== "none" && <Repeat2 size={12} />}
        </span>
        {!featured && (
          <small>
            {shortDate(t.due)}
            {t.subtasks.length > 0 &&
              ` · ${t.subtasks.filter((s) => s.done).length}/${t.subtasks.length} steps`}
          </small>
        )}
      </button>
      {featured ? (
        <div className="m-card-footer">
          <span>{shortDate(t.due)}</span>
          <button aria-label={`Open ${t.title}`} onClick={() => onEdit(t)}>
            <ArrowUpRight size={17} />
          </button>
        </div>
      ) : (
        <button
          className="m-task-options"
          onClick={() => onEdit(t)}
          aria-label={`Edit ${t.title}`}
        >
          <MoreHorizontal size={18} />
        </button>
      )}
    </article>
  );
}
function MobileHome({
  data,
  selected,
  onSelect,
  onGo,
  onModal,
  onAdd,
  onToggle,
  onEdit,
  onFocus,
  completed,
  focusMinutes,
  recent,
}) {
  const planned = data.tasks
    .filter(
      (t) =>
        (t.due === selected ||
          (selected === today() &&
            t.due &&
            t.due < today() &&
            t.status !== "done")) &&
        (t.status !== "done" || recent.includes(t.id)),
    )
    .sort(
      (a, b) =>
        ({ high: 0, medium: 1, low: 2 })[a.priority] -
        { high: 0, medium: 1, low: 2 }[b.priority],
    );
  const active = planned.filter((t) => t.status !== "done");
  return (
    <div className="m-home">
      <section className="m-hero">
        <div className="m-hero-copy">
          <span>
            <Sparkles size={12} />
            {data.profile.routine && data.profile.routine !== "Anytime"
              ? `YOUR ${data.profile.routine.toUpperCase()} MOMENT`
              : "SMALL STEPS, BIG FEELINGS"}
          </span>
          <h2>
            Your daily
            <br />
            little win.
          </h2>
          <p>
            Make space for
            <br />
            what matters to you.
          </p>
          <button
            onClick={() => (active.length ? onFocus(active[0]) : onGo("Focus"))}
          >
            Find my focus
            <ArrowUpRight size={14} />
          </button>
        </div>
        <img
          src={photo("focus-sculpture")}
          alt="Playful yellow and lavender balancing shapes"
        />
        <span className="m-hero-sticker">
          <Sun size={13} />
          at your own pace
        </span>
      </section>
      <WeekStrip selected={selected} onSelect={onSelect} />
      <SectionTitle
        title={
          selected === today() ? "Your plan" : shortDate(selected) + "’s plan"
        }
        action="See all"
        onClick={() => onGo("All tasks")}
      />
      <div className="m-plan-summary">
        <span>
          {active.length
            ? `${active.length} little ${active.length === 1 ? "step" : "steps"}. You’ve got this.`
            : "A little space for something good."}
        </span>
        <span className="m-count">
          {active.length} {active.length === 1 ? "task" : "tasks"}
        </span>
      </div>
      {planned.length ? (
        <>
          <div className="m-task-grid">
            {planned.slice(0, 2).map((t, i) => (
              <MobileTask
                key={t.id}
                task={t}
                projects={data.projects}
                onEdit={onEdit}
                onToggle={onToggle}
                recent={recent}
                featured
                index={i}
              />
            ))}
          </div>
          {planned.length > 2 && (
            <div className="m-small-tasks">
              {planned.slice(2, 5).map((t) => (
                <MobileTask
                  key={t.id}
                  task={t}
                  projects={data.projects}
                  onEdit={onEdit}
                  onToggle={onToggle}
                  recent={recent}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="m-empty">
          <Sun size={32} />
          <h3>A fresh little canvas.</h3>
          <p>
            {selected === today()
              ? "All clear for today. Take a breath, or plan what’s next."
              : "A little room for your next good idea."}
          </p>
          <button onClick={() => onAdd(selected)}>
            <Plus size={16} />
            Add a task
          </button>
        </div>
      )}
      <section className="m-daily-progress">
        <ProgressRing value={completed} goal={data.profile.goal} />
        <div>
          <b>
            {completed >= data.profile.goal
              ? "Look at you, growing."
              : "Every little win counts."}
          </b>
          <span>
            {completed} of {data.profile.goal} daily goal · {focusMinutes} focus
            min
          </span>
        </div>
        <Sparkles size={22} />
      </section>
      <SectionTitle
        title="A moment for you"
        action="Your space"
        onClick={() => onGo("You")}
      />
      <div className="m-inspiration-grid">
        <button
          className="m-journal-tile"
          onClick={() => onModal({ type: "reflection" })}
        >
          <img
            src={photo("mindful-morning")}
            alt="A smiling sun over quiet green hills"
          />
          <div>
            <span>PAUSE & REFLECT</span>
            <h3>
              Let a little
              <br />
              sunshine in.
            </h3>
            <small>
              Write your daily reflection
              <ArrowUpRight size={14} />
            </small>
          </div>
        </button>
        <button className="m-ritual-tile" onClick={() => onGo("Habits")}>
          <Leaf size={24} />
          <h3>
            Little
            <br />
            rituals.
          </h3>
          <p>
            Good things,
            <br />
            one day at a time.
          </p>
          <span>
            {data.habits.filter((h) => h.history.includes(today())).length}/
            {data.habits.length}
            <ArrowUpRight size={16} />
          </span>
          <TinyArt type={2} />
        </button>
      </div>
      <SectionTitle
        title="Your little big plans"
        action="All projects"
        onClick={() => onGo("Projects")}
      />
      <div className="m-project-strip">
        {data.projects.map((p) => (
          <button key={p.id} onClick={() => onGo(p.id)}>
            <div className="project-photo-wrapper">
              <ProjectArtwork name={p.name} color={p.color} />
              <img src={photo(p.image)} alt={`${p.name} project cover`} />
            </div>
            <span>
              <b>{p.name}</b>
              <small>
                {
                  data.tasks.filter(
                    (t) => t.projectId === p.id && t.status !== "done",
                  ).length
                }{" "}
                tasks
              </small>
              <ArrowUpRight size={14} />
            </span>
          </button>
        ))}
      </div>
      <p className="m-signoff">
        <Sun size={13} />
        Your pace. Your space.
      </p>
    </div>
  );
}
function MobileTasks({
  data,
  view,
  onGo,
  onModal,
  onAdd,
  onToggle,
  onEdit,
  recent,
  renderBoard,
}) {
  const project = data.projects.find((p) => p.id === view);
  const [filter, setFilter] = useState("all"),
    [priority, setPriority] = useState("all"),
    [board, setBoard] = useState(false),
    [filters, setFilters] = useState(false);
  useEffect(() => {
    setFilter(
      view === "Completed" ? "done" : view === "Upcoming" ? "upcoming" : "all",
    );
    setPriority("all");
    setBoard(false);
  }, [view]);
  const tasks = data.tasks
    .filter((t) => {
      if (project && t.projectId !== project.id) return false;
      if (view === "Inbox" && t.projectId) return false;
      if (priority !== "all" && t.priority !== priority) return false;
      if (filter === "done") return t.status === "done";
      if (filter === "today" && t.due !== today()) return false;
      if (filter === "upcoming" && (!t.due || t.due <= today())) return false;
      return t.status !== "done" || recent.includes(t.id) || board;
    })
    .sort(
      (a, b) =>
        (a.due || "9999").localeCompare(b.due || "9999") ||
        { high: 0, medium: 1, low: 2 }[a.priority] -
          { high: 0, medium: 1, low: 2 }[b.priority],
    );
  const allProjectTasks = project
    ? data.tasks.filter((t) => t.projectId === project.id)
    : [];
  const doneProjectTasks = allProjectTasks.filter((t) => t.status === "done").length;

  return (
    <div className="m-planner">
      {project && (
        <div className="m-project-hero" style={{ background: project.color }}>
          <ProjectArtwork name={project.name} color={project.color} />
          <img src={photo(project.image)} alt={`${project.name} inspiration`} />
          <div className="m-project-hero-badge">
            <button
              type="button"
              className="m-project-back-btn"
              onClick={() => onGo("Projects")}
              aria-label="Back to all projects"
            >
              <ChevronLeft size={16} /> All projects
            </button>
            <span className="m-project-counter-tag">
              {allProjectTasks.length - doneProjectTasks} to go · {allProjectTasks.length ? Math.round((doneProjectTasks / allProjectTasks.length) * 100) : 0}% done
            </span>
          </div>
          <span>
            {project.desc || "A little space for your next big idea."}
          </span>
          <div className="m-project-hero-footer">
            <div className="m-project-progress-bar">
              <i
                style={{
                  width: `${allProjectTasks.length ? (doneProjectTasks / allProjectTasks.length) * 100 : 0}%`,
                  background: "currentColor",
                }}
              />
            </div>
            <button onClick={() => onModal({ type: "project", project })}>
              Edit project
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
      <div className="m-view-tabs" aria-label="Task filters">
        {[
          ["all", "All"],
          ["today", "Today"],
          ["upcoming", "Upcoming"],
          ["done", "Done"],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-pressed={filter === id}
            className={filter === id ? "active" : ""}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="m-planner-toolbar">
        <span>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} · your pace
        </span>
        <button
          aria-label="Filter priorities"
          onClick={() => setFilters(!filters)}
          className={filters ? "active" : ""}
        >
          <SlidersHorizontal size={17} />
        </button>
        <button
          aria-label={board ? "List view" : "Board view"}
          onClick={() => setBoard(!board)}
        >
          {board ? <List size={18} /> : <Columns3 size={18} />}
        </button>
      </div>
      {filters && (
        <label className="m-filter-inline">
          Priority
          <select
            aria-label="Filter priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      )}
      {board ? (
        renderBoard(tasks)
      ) : (
        <div className="m-task-stack">
          {tasks.map((t) => (
            <MobileTask
              key={t.id}
              task={t}
              projects={data.projects}
              onEdit={onEdit}
              onToggle={onToggle}
              recent={recent}
            />
          ))}
        </div>
      )}
      {!tasks.length && (
        <div className="m-empty">
          <CheckCheck size={34} />
          <h3>
            {filter === "done"
              ? "Your wins will live here."
              : "A little breathing room."}
          </h3>
          <p>
            {filter === "done"
              ? "Every finished task is a step forward."
              : "Add a thought, make a plan, or just enjoy it."}
          </p>
        </div>
      )}
      <button
        className="m-add-row"
        onClick={() =>
          onAdd(filter === "upcoming" ? offset(1) : undefined, project?.id)
        }
      >
        <Plus size={18} />
        Make a little plan
      </button>
      {!project && (
        <div className="m-planner-shortcuts">
          <button onClick={() => onGo("Projects")}>
            <FolderOpen size={21} />
            <span>
              Your projects<small>Give your ideas a home</small>
            </span>
            <ChevronRight size={17} />
          </button>
          <button onClick={() => onGo("Calendar")}>
            <CalendarDays size={21} />
            <span>
              Look ahead<small>A calmer kind of calendar</small>
            </span>
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
function MobileCalendar({
  data,
  selected,
  onSelect,
  onEdit,
  onAdd,
  onToggle,
  recent,
}) {
  const [month, setMonth] = useState(
    () =>
      new Date(parse(selected).getFullYear(), parse(selected).getMonth(), 1),
  );
  const start = new Date(month);
  start.setDate(1 - ((start.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, i) => offset(i, start));
  const tasks = data.tasks.filter((t) => t.due === selected);
  return (
    <div className="m-calendar">
      <section className="m-month-card">
        <div className="m-month-heading">
          <button
            aria-label="Previous month"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
            }
          >
            <ChevronLeft size={20} />
          </button>
          <h2>
            {month.toLocaleDateString("en", { month: "long", year: "numeric" })}
          </h2>
          <button
            aria-label="Next month"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
            }
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="m-month-weekdays">
          {"MTWTFSS".split("").map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
        <div className="m-month-grid">
          {days.map((d) => (
            <button
              key={d}
              aria-label={`Select ${d}`}
              aria-pressed={d === selected}
              onClick={() => onSelect(d)}
              className={`${d === selected ? "selected" : ""} ${parse(d).getMonth() !== month.getMonth() ? "outside" : ""} ${d === today() ? "today" : ""}`}
            >
              <b>{parse(d).getDate()}</b>
              <span>
                {data.tasks
                  .filter((t) => t.due === d && t.status !== "done")
                  .slice(0, 3)
                  .map((t) => (
                    <i
                      key={t.id}
                      style={{
                        background:
                          data.projects.find((p) => p.id === t.projectId)
                            ?.color || "#bdaf85",
                      }}
                    />
                  ))}
              </span>
            </button>
          ))}
        </div>
      </section>
      <SectionTitle
        title={shortDate(selected)}
        action="Plan a task"
        onClick={() => onAdd(selected)}
      />
      <span className="m-agenda-subtitle">
        {parse(selected).toLocaleDateString("en", { weekday: "long" })} ·{" "}
        {tasks.length} things on your horizon
      </span>
      <div className="m-task-stack">
        {tasks.map((t) => (
          <MobileTask
            key={t.id}
            task={t}
            projects={data.projects}
            onEdit={onEdit}
            onToggle={onToggle}
            recent={recent}
          />
        ))}
      </div>
      {!tasks.length && (
        <div className="m-calendar-empty">
          <img
            src={photo("mindful-morning")}
            alt="Sunshine over a quiet green landscape"
          />
          <h3>Leave a little room for possibility.</h3>
          <button onClick={() => onAdd(selected)}>
            <Plus size={16} />
            Plan something good
          </button>
        </div>
      )}
    </div>
  );
}
function MobileHabits({ data, onModal, onToggle }) {
  const [week, setWeek] = useState(0);
  const mon = new Date();
  mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7) + week * 7);
  const days = Array.from({ length: 7 }, (_, i) => offset(i, mon));
  return (
    <div className="m-habits">
      <div className="m-habits-hero">
        <img
          src={photo("mindful-morning")}
          alt="Gentle sunshine over rolling green hills"
        />
        <div>
          <span>GROW AT YOUR OWN PACE</span>
          <h2>
            Small things.
            <br />
            Good days.
          </h2>
        </div>
      </div>
      <SectionTitle
        title="Your little rituals"
        action="Add new"
        onClick={() => onModal({ type: "habit" })}
      />
      <div className="m-habit-week-nav">
        <button
          aria-label="Previous week"
          onClick={() => setWeek((w) => w - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        <span>
          {week === 0
            ? "This week"
            : `${shortDate(days[0])} – ${shortDate(days[6])}`}
        </span>
        <button
          aria-label="Next week"
          disabled={week === 0}
          onClick={() => setWeek((w) => w + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
      {data.habits.map((h, i) => (
        <article key={h.id} className="m-habit-item">
          <button
            className="m-habit-name"
            onClick={() => onModal({ type: "habit", habit: h })}
          >
            <span
              style={{ background: ["#e1e9d0", "#e9e0f1", "#f8e8bf"][i % 3] }}
            >
              {h.icon === "book" ? (
                <BookOpen size={20} />
              ) : h.icon === "coffee" ? (
                <Coffee size={20} />
              ) : (
                <Leaf size={20} />
              )}
            </span>
            <span>
              <b>{h.title}</b>
              <small>
                {h.history.includes(today())
                  ? "A little win for today."
                  : "One kind thing for yourself."}
              </small>
            </span>
            <MoreHorizontal size={19} />
          </button>
          <div className="m-habit-days">
            {days.map((d) => (
              <div key={d}>
                <span>
                  {parse(d)
                    .toLocaleDateString("en", { weekday: "short" })
                    .slice(0, 1)}
                </span>
                <button
                  disabled={d > today()}
                  aria-label={`${h.history.includes(d) ? "Uncheck" : "Check"} ${h.title} on ${d}`}
                  className={h.history.includes(d) ? "checked" : ""}
                  onClick={() => onToggle(h.id, d)}
                >
                  {h.history.includes(d) ? (
                    <Check size={16} />
                  ) : (
                    parse(d).getDate()
                  )}
                </button>
              </div>
            ))}
          </div>
        </article>
      ))}
      {!data.habits.length && (
        <div className="m-empty">
          <Leaf size={30} />
          <h3>Start small. Grow gently.</h3>
          <p>Pick one thing you’d love to do every day.</p>
          <button onClick={() => onModal({ type: "habit" })}>
            <Plus size={17} />
            Create a ritual
          </button>
        </div>
      )}
      <p className="m-soft-note">
        Missed a day? You’re human.
        <br />
        There’s always room to begin again.
      </p>
    </div>
  );
}
function MobileYou({ data, onModal, onGo, onMood, completed, focusMinutes }) {
  const mood = data.moods?.[today()];
  const days = Array.from({ length: 7 }, (_, i) => offset(i - 6));
  const counts = days.map(
    (d) =>
      data.tasks.filter(
        (t) =>
          t.status === "done" &&
          t.completedAt &&
          dayKey(new Date(t.completedAt)) === d,
      ).length,
  );
  const max = Math.max(3, ...counts);
  const total = counts.reduce((a, b) => a + b, 0);
  return (
    <div className="m-you">
      <MoodSpace data={data} onMood={onMood} />
      <SectionTitle title="Your week in little wins" />
      <section className="m-weekly-wins">
        <div className="m-wins-top">
          <strong>
            {total}
            <small>{total === 1 ? "task" : "tasks"} completed</small>
          </strong>
          <span>
            <Sparkles size={17} />
            Every one counts
          </span>
        </div>
        <div
          className="m-bars"
          role="img"
          aria-label={`Last seven days: ${days.map((d, i) => `${shortDate(d)}: ${counts[i]} tasks`).join(", ")}`}
        >
          {days.map((d, i) => (
            <div key={d}>
              <b>{counts[i] || ""}</b>
              <div>
                <i
                  style={{
                    height: `${counts[i] ? Math.max(5, (counts[i] / max) * 100) : 0}%`,
                    background:
                      i === 6 ? "#c2df57" : i % 2 ? "#7c9b84" : "#aac4a5",
                  }}
                />
              </div>
              <span>
                {parse(d)
                  .toLocaleDateString("en", { weekday: "short" })
                  .slice(0, 1)}
              </span>
            </div>
          ))}
        </div>
        <div className="m-wins-footer">
          <span>
            <Timer size={15} />
            {focusMinutes} min focused today
          </span>
          <span>
            <CheckCheck size={15} />
            {completed} done today
          </span>
        </div>
      </section>
      <SectionTitle
        title="Your journal"
        action="Write a little"
        onClick={() => onModal({ type: "reflection" })}
      />
      <button
        className="m-reflect-feature"
        onClick={() => onModal({ type: "reflection" })}
      >
        <div>
          <span>JUST FOR YOU</span>
          <h3>
            Pause.
            <br />
            Reflect.
            <br />
            Begin again.
          </h3>
          <small>
            {data.reflections?.[today()]
              ? "Your reflection is saved"
              : "A few words can go a long way"}
            <ArrowUpRight size={14} />
          </small>
        </div>
        <img
          src={photo("slow-moments")}
          alt="A person taking a quiet moment to write in a journal"
        />
      </button>
      <div className="m-you-links">
        <button onClick={() => onGo("Habits")}>
          <Leaf size={20} />
          <span>
            Your rituals<small>Little things, lovely days</small>
          </span>
          <ChevronRight size={17} />
        </button>
        <button onClick={() => onModal({ type: "settings" })}>
          <Settings size={20} />
          <span>
            Make it yours<small>Preferences, appearance & backups</small>
          </span>
          <ChevronRight size={17} />
        </button>
      </div>
      <p className="m-signoff">
        <ShieldCheck size={13} />
        Private. Personal. A little space for you.
      </p>
    </div>
  );
}
function MobileProjects({ data, onGo, onModal }) {
  return (
    <div className="m-projects">
      <p className="m-page-note">
        For the things you’re working on.
        <br />
        And the things you’re working toward.
      </p>
      {data.projects.map((p) => {
        const tasks = data.tasks.filter((t) => t.projectId === p.id),
          done = tasks.filter((t) => t.status === "done").length;
        return (
          <button
            key={p.id}
            className="m-project-wide"
            onClick={() => onGo(p.id)}
          >
            <div className="project-photo-wrapper">
              <ProjectArtwork name={p.name} color={p.color} />
              <img src={photo(p.image)} alt={`${p.name} project cover`} />
            </div>
            <div>
              <span className="m-kicker">YOUR LITTLE BIG PLAN</span>
              <h2>{p.name}</h2>
              <p>
                {tasks.length - done} tasks to go <ArrowUpRight size={17} />
              </p>
              <div className="m-project-progress">
                <i
                  style={{
                    width: `${tasks.length ? (done / tasks.length) * 100 : 0}%`,
                    background: p.color,
                  }}
                />
              </div>
            </div>
          </button>
        );
      })}
      <button
        className="m-add-row"
        onClick={() => onModal({ type: "project" })}
      >
        <Plus size={20} />
        Room for another idea
      </button>
    </div>
  );
}
export function MobileBrowse({ data, onGo, onModal }) {
  return (
    <div className="m-browse">
      <h2>Your whole little world.</h2>
      <p>Everything has a home here.</p>
      <div className="m-browse-grid">
        {[
          ["My day", "Home", Home],
          ["All tasks", "All tasks", List],
          ["Inbox", "Inbox", Inbox],
          ["Upcoming", "Upcoming", CalendarDays],
          ["Calendar", "Calendar", CalendarDays],
          ["Projects", "Projects", LayoutGrid],
          ["Habits", "Rituals", Leaf],
          ["Completed", "Completed", CheckCheck],
        ].map(([id, label, Icon]) => (
          <button key={id} onClick={() => onGo(id)}>
            <Icon size={23} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button
        className="m-browse-settings"
        onClick={() => onModal({ type: "settings" })}
      >
        <Settings size={20} />
        Settings & backups
        <ChevronRight size={17} />
      </button>
    </div>
  );
}
export default function MobileExperience({
  data,
  view,
  onGo,
  onModal,
  onAdd,
  onToggle,
  onEdit,
  onFocus,
  onHabit,
  onMood,
  selected,
  onSelect,
  recent,
  completed,
  focusMinutes,
  timer,
  seconds,
  renderFocus,
  renderBoard,
}) {
  const project = data.projects.find((p) => p.id === view);
  const title =
    view === "My day"
      ? `Hi, ${data.profile.name}`
      : view === "All tasks"
        ? "Your plan."
        : view === "You"
          ? "A little space for you."
          : view === "Focus"
            ? "Find your flow."
            : view === "Habits"
              ? "Little rituals."
              : view === "Calendar"
                ? "A little look ahead."
                : project?.name || view;
  const shared = { data, onGo, onModal, onAdd, onToggle, onEdit, recent };
  return (
    <div className="mobile-experience">
      <header className="m-header">
        <div className="m-wordmark">
          <Sun size={21} />
          <span>daylight.</span>
        </div>
        <div className="m-header-actions">
          <button
            aria-label="Search your workspace"
            onClick={() => onModal({ type: "search" })}
          >
            <Search size={20} />
          </button>
          <button
            aria-label="Browse workspace"
            onClick={() => onModal({ type: "browse" })}
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </header>
      <main className="mobile-main">
        <div className="m-greeting">
          <div>
            <span className="m-kicker">
              {view === "My day"
                ? new Date().toLocaleDateString("en", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })
                : view === "You"
                  ? "YOUR PACE. YOUR SPACE."
                  : "A MORE MINDFUL KIND OF PRODUCTIVE"}
            </span>
            <h1>
              {title}
              {view === "My day" && <span className="m-hello-sun">✳</span>}
            </h1>
          </div>
          {view === "My day" ? (
            <button
              className="m-profile"
              aria-label="Open profile settings"
              onClick={() => onModal({ type: "settings" })}
            >
              <span>{data.profile.name[0].toUpperCase()}</span>
              <i />
            </button>
          ) : view === "You" ? (
            <button
              className="m-round"
              aria-label="Open profile settings"
              onClick={() => onModal({ type: "settings" })}
            >
              <Settings size={20} />
            </button>
          ) : (
            <button
              className="m-round"
              aria-label="Open calendar"
              onClick={() => onGo("Calendar")}
            >
              <CalendarDays size={20} />
            </button>
          )}
        </div>
        <div className="m-screen" key={view}>
          {view === "My day" ? (
            <MobileHome
              {...shared}
              selected={selected}
              onSelect={onSelect}
              onFocus={onFocus}
              completed={completed}
              focusMinutes={focusMinutes}
            />
          ) : view === "You" ? (
            <MobileYou
              data={data}
              onModal={onModal}
              onGo={onGo}
              onMood={onMood}
              completed={completed}
              focusMinutes={focusMinutes}
            />
          ) : view === "Habits" ? (
            <MobileHabits data={data} onModal={onModal} onToggle={onHabit} />
          ) : view === "Projects" ? (
            <MobileProjects data={data} onGo={onGo} onModal={onModal} />
          ) : view === "Calendar" ? (
            <MobileCalendar
              {...shared}
              selected={selected}
              onSelect={onSelect}
            />
          ) : view === "Focus" ? (
            <div className="m-focus-page">{renderFocus()}</div>
          ) : (
            <MobileTasks {...shared} view={view} renderBoard={renderBoard} />
          )}
        </div>
      </main>
      {timer.running && view !== "Focus" && (
        <button className="m-live-focus" onClick={() => onGo("Focus")}>
          <span className="live-dot" />
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
          <span>in your focus era</span>
          <ArrowUpRight size={14} />
        </button>
      )}
      <GlassNav
        view={view}
        onGo={onGo}
        onAdd={() =>
          onAdd(view === "My day" || view === "Calendar" ? selected : undefined)
        }
        timer={timer}
        solid={data.profile.solidNav}
      />
    </div>
  );
}
