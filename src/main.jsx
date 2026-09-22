import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Sun,
  Plus,
  Search,
  Inbox,
  CalendarDays,
  Calendar,
  Timer,
  Leaf,
  LayoutGrid,
  Settings,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  List,
  Columns3,
  SlidersHorizontal,
  Flag,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  CheckCheck,
  CircleHelp,
  Download,
  Monitor,
  Sparkles,
  BriefcaseBusiness,
  Heart,
  BookOpen,
  Palette,
  Plane,
  Circle,
  Clock3,
  Repeat2,
  Trash2,
  Upload,
  CheckCircle2,
  Menu,
  ChevronDown,
  Tag,
  Target,
  ShieldCheck,
  Flower2,
  Coffee,
  Volume2,
  VolumeX,
  Pencil,
  Archive,
} from "lucide-react";
import "./fonts.css";
import "./style.css";
import SetupJourney from "./Journey.jsx";
import MoodSpace from "./MoodSpace.jsx";
import MobileExperience, { MobileBrowse } from "./Mobile.jsx";
import { useMedia, useTaskCelebration, CompletionEffects } from "./motion.jsx";

const KEY = "daylight.workspace.v1";
const uid = () => crypto.randomUUID();
const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (n, base = new Date()) => {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return dateKey(d);
};
const today = () => dateKey();
const parseDate = (s) => new Date(s + "T12:00:00");
const niceDate = (s) =>
  !s
    ? "No date"
    : s === today()
      ? "Today"
      : s === addDays(1)
        ? "Tomorrow"
        : parseDate(s).toLocaleDateString("en", {
            month: "short",
            day: "numeric",
          });
const photo = (n) => `${import.meta.env.BASE_URL}images/${n}.jpg`;
function nextOccurrence(t) {
  let due = t.due ? parseDate(t.due) : new Date();
  if (t.repeat === "monthly") {
    const day = due.getDate();
    due.setDate(1);
    due.setMonth(due.getMonth() + 1);
    due.setDate(
      Math.min(
        day,
        new Date(due.getFullYear(), due.getMonth() + 1, 0).getDate(),
      ),
    );
  } else due.setDate(due.getDate() + (t.repeat === "weekly" ? 7 : 1));
  return {
    ...t,
    id: uid(),
    status: "todo",
    due: dateKey(due),
    completedAt: null,
    subtasks: t.subtasks.map((s) => ({ ...s, done: false })),
    repeatedFrom: t.id,
  };
}
const COLORS = [
  "#d9ddbf",
  "#f0c9df",
  "#d8d1ee",
  "#f6e2a0",
  "#c9dfe9",
  "#eacdbb",
];
const AREAS = [
  {
    name: "Work",
    icon: BriefcaseBusiness,
    desc: "Big ideas, little steps",
    image: "desk",
    color: COLORS[2],
  },
  {
    name: "Personal",
    icon: Heart,
    desc: "Life outside the to-do list",
    image: "coast",
    color: COLORS[1],
  },
  {
    name: "Wellbeing",
    icon: Leaf,
    desc: "A little time for yourself",
    image: "daisies",
    color: COLORS[0],
  },
  {
    name: "Learning",
    icon: BookOpen,
    desc: "Stay wonderfully curious",
    image: "books",
    color: COLORS[3],
  },
  {
    name: "Creative",
    icon: Palette,
    desc: "Make something your own",
    image: "architecture",
    color: COLORS[4],
  },
  {
    name: "Travel",
    icon: Plane,
    desc: "Good things on the horizon",
    image: "coast",
    color: COLORS[5],
  },
];
const themes = {
  sunshine: { name: "Sunshine", color: "#f7df83", desc: "A little brighter" },
  blossom: { name: "Blossom", color: "#efc7de", desc: "Soft & expressive" },
  sage: { name: "Sage", color: "#d7dfbb", desc: "Room to breathe" },
};
function makeWorkspace(p) {
  const projects = p.areas.map((name) => ({
    ...AREAS.find((x) => x.name === name),
    icon: undefined,
    id: uid(),
  }));
  const samples = {
    Work: [
      "Choose this week’s top priorities",
      "Make progress on your main project",
      "Plan the week ahead",
    ],
    Personal: [
      "Make a little room for something you love",
      "Plan something to look forward to",
      "Tidy up your digital space",
    ],
    Wellbeing: [
      "Step outside for a mindful walk",
      "Make time to recharge",
      "Try a new feel-good recipe",
    ],
    Learning: [
      "Read a chapter of your current book",
      "Practice one new skill",
      "Save an idea that inspires you",
    ],
    Creative: [
      "Collect inspiration for your next idea",
      "Spend 30 minutes creating",
      "Share something you made",
    ],
    Travel: [
      "Start a wishlist for your next trip",
      "Research a place you’d love to visit",
      "Make a simple travel budget",
    ],
  };
  const tasks = p.examples
    ? projects.flatMap((pr, i) =>
        samples[pr.name].map((title, j) => ({
          id: uid(),
          title,
          projectId: pr.id,
          due: j === 0 || (j === 1 && i === 0) ? today() : addDays(j + i),
          priority: j === 0 ? "high" : j === 1 ? "medium" : "low",
          status: j === 1 && i === 0 ? "doing" : "todo",
          notes:
            "A starter task to make your workspace feel at home. Edit it, complete it, or make it your own.",
          tags: [],
          subtasks: [],
          repeat: "none",
          createdAt: Date.now(),
        })),
      )
    : [];
  return {
    version: 1,
    profile: p,
    projects,
    tasks,
    habits: p.examples
      ? [
          { id: uid(), title: "Step outside", icon: "leaf", history: [] },
          { id: uid(), title: "Read a few pages", icon: "book", history: [] },
          {
            id: uid(),
            title: "A moment to pause",
            icon: "coffee",
            history: [],
          },
        ]
      : [],
    sessions: [],
  };
}
const defaultProfile = {
  name: "",
  purpose: "A little of both",
  areas: ["Work", "Personal", "Wellbeing"],
  goal: 5,
  focus: 25,
  theme: "sunshine",
  examples: true,
};
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    return validWorkspace(d) ? d : null;
  } catch {
    return null;
  }
}
function Flower({ className = "", color = "currentColor", size = 62 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="23"
          rx="15"
          ry="23"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="17" fill="#faf8ef" />
      <path
        d="M44 52q6 6 12 0"
        fill="none"
        stroke="#34372e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="44" cy="45" r="1.5" fill="#34372e" />
      <circle cx="56" cy="45" r="1.5" fill="#34372e" />
    </svg>
  );
}
function Brand() {
  return (
    <div className="brand">
      <Sun size={32} strokeWidth={1.8} />
      <span>
        daylight<span className="brand-dot">.</span>
      </span>
    </div>
  );
}
function Modal({ children, onClose, title, wide = false }) {
  const ref = useRef();
  useEffect(() => {
    const previous = document.activeElement;
    const first =
      (!window.matchMedia("(max-width: 767px)").matches
        ? ref.current?.querySelector("input:not([hidden]),textarea,select")
        : null) || ref.current?.querySelector("button");
    first?.focus({ preventScroll: true });
    document.querySelector(".sidebar")?.setAttribute("inert", "");
    document.querySelector(".app-body")?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    const listener = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = [
          ...ref.current.querySelectorAll(
            'button,input,select,textarea,[tabindex="0"]',
          ),
        ].filter((el) => !el.disabled && el.getClientRects().length > 0);
        if (e.shiftKey && document.activeElement === els[0]) {
          e.preventDefault();
          els.at(-1)?.focus();
        } else if (!e.shiftKey && document.activeElement === els.at(-1)) {
          e.preventDefault();
          els[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
      document.querySelector(".sidebar")?.removeAttribute("inert");
      document.querySelector(".app-body")?.removeAttribute("inert");
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className={`modal ${wide ? "wide" : ""}`}
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-top">
          <span className="eyebrow">YOUR DAY, YOUR WAY</span>
          <button
            className="icon-btn"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
function Onboarding({ onFinish }) {
  return (
    <SetupJourney
      initialProfile={defaultProfile}
      areas={AREAS}
      themes={themes}
      onFinish={onFinish}
    />
  );
}

function App() {
  const isMobile = useMedia("(max-width: 767px)");
  const [mobileDay, setMobileDay] = useState(today);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [isMobile]);
  const [data, setData] = useState(load),
    [view, setView] = useState("My day"),
    [modal, setModal] = useState(null),
    [toast, setToast] = useState(null),
    [query, setQuery] = useState(""),
    [layout, setLayout] = useState("list"),
    [priority, setPriority] = useState("all"),
    [projectFilter, setProjectFilter] = useState("all"),
    [sort, setSort] = useState("priority"),
    [filters, setFilters] = useState(false),
    [showDone, setShowDone] = useState(false),
    [mobileNav, setMobileNav] = useState(false),
    [installPrompt, setInstallPrompt] = useState(null),
    [now, setNow] = useState(Date.now());
  const [timer, setTimer] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("daylight.timer")) || {
          remaining: (load()?.profile.focus || 25) * 60,
          running: false,
          mode: "focus",
          taskId: "",
        }
      );
    } catch {
      return { remaining: 1500, running: false, mode: "focus", taskId: "" };
    }
  });
  const celebration = useTaskCelebration(data?.profile?.celebrations !== false);

  const toastTimer = useRef();
  const notify = (text, action = null) => {
    clearTimeout(toastTimer.current);
    setToast({ text, action });
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  };
  useEffect(() => {
    if (data)
      try {
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch {
        notify("Storage is full. Export a backup from Settings.");
      }
  }, [data]);
  useEffect(() => {
    try {
      localStorage.setItem("daylight.timer", JSON.stringify(timer));
    } catch {}
  }, [timer]);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);
  const seconds = timer.running
    ? Math.max(0, Math.ceil((timer.until - now) / 1000))
    : timer.remaining;
  useEffect(() => {
    if (data && timer.running && seconds === 0) {
      const mins = timer.duration || data?.profile.focus || 25;
      if (timer.mode === "focus")
        setData((d) => ({
          ...d,
          sessions: [
            ...d.sessions,
            { id: uid(), minutes: mins, at: Date.now(), taskId: timer.taskId },
          ],
        }));
      setTimer((t) => ({ ...t, running: false, remaining: 0 }));
      notify(
        timer.mode === "focus"
          ? "Focus session complete. Make a little room for a break."
          : "Break complete. Ready for a fresh start?",
      );
      if ("Notification" in window && Notification.permission === "granted")
        new Notification("Daylight", {
          body: "Your session is complete. Take a breath.",
          icon: `${import.meta.env.BASE_URL}icon-192.png`,
        });
    }
  }, [seconds, timer.running]);
  useEffect(() => {
    const f = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", f);
    return () => window.removeEventListener("beforeinstallprompt", f);
  }, []);
  useEffect(() => {
    const f = (e) => {
      if (!data) return;
      const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setModal({ type: "search" });
      }
      if (e.key === "Escape") {
        setModal(null);
        setMobileNav(false);
      }
      if (!typing && !modal && (e.key === "n" || e.key === "N")) {
        e.preventDefault();
        setModal({
          type: "task",
          projectId: data.projects.some((p) => p.id === view) ? view : "",
          due: ["Inbox", "All tasks"].includes(view)
            ? ""
            : view === "Upcoming"
              ? addDays(1)
              : today(),
        });
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [data, modal, view]);
  if (!data)
    return (
      <Onboarding
        onFinish={(p) => {
          setData(makeWorkspace(p));
          requestAnimationFrame(() =>
            window.scrollTo({ top: 0, behavior: "instant" }),
          );
          setTimer({
            remaining: p.focus * 60,
            running: false,
            mode: "focus",
            taskId: "",
          });
          notify(`Welcome to your little corner of Daylight, ${p.name}.`);
        }}
      />
    );
  const { profile, projects, tasks, habits } = data;
  const update = (fn) => setData((d) => fn(d));
  const saveMood = (entry, day) =>
    update((d) => {
      const moods = { ...d.moods },
        moodDetails = { ...d.moodDetails };
      if (entry) {
        moods[day] = entry.mood;
        moodDetails[day] = { note: entry.note, tags: entry.tags, at: entry.at };
      } else {
        delete moods[day];
        delete moodDetails[day];
      }
      return { ...d, moods, moodDetails };
    });
  const go = (v) => {
    setView(v);
    setMobileNav(false);
    setQuery("");
    setPriority("all");
    setProjectFilter("all");
    setFilters(false);
    if (isMobile) window.scrollTo({ top: 0, behavior: "instant" });
  };
  const currentProject = projects.find((p) => p.id === view);
  const overdue = tasks.filter(
    (t) => t.status !== "done" && t.due && t.due < today(),
  );
  const dayTasks = tasks.filter((t) => t.due === today());
  const completedToday = tasks.filter(
    (t) =>
      t.status === "done" &&
      t.completedAt &&
      dateKey(new Date(t.completedAt)) === today(),
  ).length;
  const activeToday = dayTasks.filter((t) => t.status !== "done").length;
  const focusMinutes = data.sessions
    .filter((s) => dateKey(new Date(s.at)) === today())
    .reduce((n, s) => n + s.minutes, 0);
  const toggleTask = (t, element) => {
    const done = t.status !== "done";
    if (done && !celebration.celebrate(t, element)) return;
    if (!done) celebration.clear(t.id);
    let next = null;
    if (done && t.repeat !== "none") next = nextOccurrence(t);
    update((d) => ({
      ...d,
      tasks: [
        ...d.tasks
          .filter((x) => done || x.repeatedFrom !== t.id)
          .map((x) =>
            x.id === t.id
              ? {
                  ...x,
                  status: done ? "done" : "todo",
                  completedAt: done ? Date.now() : null,
                }
              : x,
          ),
        ...(next ? [next] : []),
      ],
    }));
    if (done)
      notify(
        next
          ? "Done! The next occurrence is ready."
          : "A little progress. Nicely done.",
        () => {
          celebration.clear(t.id);
          update((d) => ({
            ...d,
            tasks: d.tasks
              .filter((x) => x.repeatedFrom !== t.id)
              .map((x) => (x.id === t.id ? t : x)),
          }));
        },
      );
  };
  const setTaskStatus = (id, status, element) => {
    const t = tasks.find((t) => t.id === id);
    if (!t) return;
    if (status === "done" && t.status !== "done") toggleTask(t, element);
    else if (t.status === "done" && status !== "done") {
      toggleTask(t);
      if (status === "doing")
        update((d) => ({
          ...d,
          tasks: d.tasks.map((x) =>
            x.id === id ? { ...x, status: "doing" } : x,
          ),
        }));
    } else
      update((d) => ({
        ...d,
        tasks: d.tasks.map((t) =>
          t.id === id
            ? {
                ...t,
                status,
                completedAt: status === "done" ? t.completedAt : null,
              }
            : t,
        ),
      }));
  };
  const saveTask = (t) => {
    if (
      t.status === "done" &&
      tasks.find((x) => x.id === t.id)?.status !== "done"
    )
      celebration.celebrate(t);
    if (t.status !== "done") celebration.clear(t.id);
    update((d) => {
      const previous = d.tasks.find((x) => x.id === t.id);
      let list = d.tasks;
      if (previous?.status === "done" && t.status !== "done")
        list = list.filter((x) => x.repeatedFrom !== t.id);
      list = previous ? list.map((x) => (x.id === t.id ? t : x)) : [...list, t];
      if (
        t.status === "done" &&
        previous?.status !== "done" &&
        t.repeat !== "none"
      )
        list.push(nextOccurrence(t));
      return { ...d, tasks: list };
    });
    setModal(null);
    notify("Task saved. One less thing on your mind.");
  };
  const deleteTask = (id) => {
    const old = tasks.find((t) => t.id === id);
    update((d) => ({ ...d, tasks: d.tasks.filter((t) => t.id !== id) }));
    setModal(null);
    notify("Task deleted", () =>
      update((d) => ({ ...d, tasks: [...d.tasks, old] })),
    );
  };
  const toggleHabit = (id, date = today()) =>
    update((d) => ({
      ...d,
      habits: d.habits.map((h) =>
        h.id === id
          ? {
              ...h,
              history: h.history.includes(date)
                ? h.history.filter((x) => x !== date)
                : [...h.history, date],
            }
          : h,
      ),
    }));
  const newTask = (due, projectId) =>
    setModal({
      type: "task",
      due:
        due ||
        (["Inbox", "All tasks"].includes(view)
          ? ""
          : view === "Upcoming"
            ? addDays(1)
            : today()),
      projectId: projectId || currentProject?.id || "",
    });
  const startPause = () => {
    if (timer.running)
      setTimer((t) => ({ ...t, running: false, remaining: seconds }));
    else {
      const remaining =
        seconds || (timer.mode === "break" ? 5 : profile.focus) * 60;
      setTimer((t) => ({
        ...t,
        running: true,
        remaining,
        until: Date.now() + remaining * 1000,
        duration: timer.mode === "break" ? 5 : profile.focus,
      }));
    }
  };
  const resetTimer = (mode = timer.mode) =>
    setTimer((t) => ({
      ...t,
      mode,
      running: false,
      remaining: (mode === "break" ? 5 : profile.focus) * 60,
    }));
  const startTaskFocus = (t) => {
    setTimer({
      mode: "focus",
      remaining: profile.focus * 60,
      running: true,
      until: Date.now() + profile.focus * 60000,
      duration: profile.focus,
      taskId: t.id,
    });
    setModal(null);
    go("Focus");
  };
  const install = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      setInstallPrompt(null);
    } else setModal({ type: "install" });
  };
  const visibleTasks = tasks
    .filter((t) => {
      if (
        view === "My day" &&
        !(
          t.due === today() ||
          (t.due &&
            t.due < today() &&
            (t.status !== "done" || celebration.recent.includes(t.id)))
        )
      )
        return false;
      if (view === "Inbox" && t.projectId) return false;
      if (view === "Upcoming" && (!t.due || t.due <= today())) return false;
      if (view === "Completed" && t.status !== "done") return false;
      if (currentProject && t.projectId !== currentProject.id) return false;
      if (
        view !== "Completed" &&
        !showDone &&
        t.status === "done" &&
        !celebration.recent.includes(t.id)
      )
        return false;
      if (priority !== "all" && t.priority !== priority) return false;
      if (projectFilter !== "all" && t.projectId !== projectFilter)
        return false;
      if (
        query &&
        !`${t.title} ${t.notes} ${t.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : sort === "date"
          ? (a.due || "9999").localeCompare(b.due || "9999")
          : { high: 0, medium: 1, low: 2 }[a.priority] -
            { high: 0, medium: 1, low: 2 }[b.priority],
    );
  const rowProps = {
    projects,
    recent: celebration.recent,
    onToggle: toggleTask,
    onEdit: (t) => setModal({ type: "task", task: t }),
    onFocus: startTaskFocus,
  };
  const taskPanel = (
    <section className="task-panel">
      <div className="section-heading">
        <div>
          <h2>
            {view === "My day"
              ? "Today’s plan"
              : currentProject
                ? "Project tasks"
                : view === "Upcoming"
                  ? "A little look ahead"
                  : view === "Inbox"
                    ? "A home for your thoughts"
                    : view === "Completed"
                      ? "Little wins, all together"
                      : "All your tasks"}
            <span className="count-chip">{visibleTasks.length}</span>
          </h2>
          {view === "My day" && <p>Small steps. Meaningful progress.</p>}
        </div>
        <div className="view-switch">
          <button
            aria-label="List view"
            className={layout === "list" ? "active" : ""}
            onClick={() => setLayout("list")}
          >
            <List size={17} />
          </button>
          <button
            aria-label="Board view"
            className={layout === "board" ? "active" : ""}
            onClick={() => {
              setLayout("board");
              setShowDone(true);
            }}
          >
            <Columns3 size={17} />
          </button>
        </div>
      </div>
      <div className="task-toolbar">
        <button
          className={filters ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilters(!filters)}
        >
          <SlidersHorizontal size={14} />
          Filters
          {(priority !== "all" || projectFilter !== "all") && (
            <span className="filter-dot" />
          )}
        </button>
        <button
          style={{ display: view === "Completed" ? "none" : undefined }}
          className="text-btn muted"
          onClick={() => setShowDone(!showDone)}
        >
          <CheckCheck size={15} />
          {showDone ? "Hide completed" : "Show completed"}
        </button>
        <select
          aria-label="Sort tasks"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="priority">By priority</option>
          <option value="date">By date</option>
          <option value="name">By name</option>
        </select>
      </div>
      {filters && (
        <div className="filter-row">
          <select
            aria-label="Filter priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="all">All priorities</option>
            <option value="high">High priority</option>
            <option value="medium">Medium priority</option>
            <option value="low">Low priority</option>
          </select>
          <select
            aria-label="Filter project"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">All projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button
            className="text-btn"
            onClick={() => {
              setPriority("all");
              setProjectFilter("all");
            }}
          >
            Reset
          </button>
        </div>
      )}
      {layout === "list" ? (
        <div className="task-list">
          {visibleTasks.map((t) => (
            <TaskRow key={t.id} task={t} {...rowProps} />
          ))}
          {!visibleTasks.length && (
            <Empty
              icon={Sun}
              title={
                query || priority !== "all" || projectFilter !== "all"
                  ? "Nothing matches just yet."
                  : "A little breathing room."
              }
              text={
                view === "Completed"
                  ? "Your completed tasks will feel right at home here."
                  : "Add a task, make a plan, or enjoy the space."
              }
            />
          )}
        </div>
      ) : (
        <Board tasks={visibleTasks} {...rowProps} setStatus={setTaskStatus} />
      )}
      <button className="inline-add" onClick={() => newTask()}>
        <Plus size={18} />
        Add a task<span>N</span>
      </button>
    </section>
  );
  return (
    <div
      className={`app theme-${profile.theme} ${profile.celebrations === false ? "less-motion" : ""} ${isMobile ? "mobile-app" : "desktop-app"} ${view === "My day" ? "home-enter" : ""}`}
      style={{
        "--accent": themes[profile.theme]?.color || themes.sunshine.color,
      }}
    >
      {mobileNav && (
        <div className="nav-scrim" onClick={() => setMobileNav(false)} />
      )}
      {!isMobile && (
        <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
          <Brand />
          <button
            className="workspace-switch"
            onClick={() => setModal({ type: "settings" })}
          >
            <span className="workspace-avatar">
              {profile.name[0].toUpperCase()}
            </span>
            <span>
              My personal space<small>Just for you</small>
            </span>
            <ChevronDown size={14} />
          </button>
          <button
            className="sidebar-search"
            onClick={() => setModal({ type: "search" })}
          >
            <Search size={17} />
            <span>Find anything</span>
            <kbd>Ctrl K</kbd>
          </button>
          <div className="nav-label">YOUR WORKSPACE</div>
          <nav>
            {[
              ["My day", Sun, activeToday],
              [
                "Inbox",
                Inbox,
                tasks.filter((t) => !t.projectId && t.status !== "done").length,
              ],
              ["Upcoming", CalendarDays, null],
              ["Calendar", Calendar, null],
              ["Focus", Timer, null],
              ["Habits", Leaf, null],
              ["You", Heart, null],
            ].map(([name, Icon, count]) => (
              <button
                key={name}
                className={`nav-item ${view === name ? "active" : ""}`}
                onClick={() => go(name)}
              >
                <Icon size={19} />
                <span>{name}</span>
                {count > 0 && <small>{count}</small>}
                {name === "Focus" && timer.running && (
                  <span className="live-dot" />
                )}
              </button>
            ))}
          </nav>
          <div className="nav-label project-label">
            <button onClick={() => go("Projects")}>MY PROJECTS</button>
            <button
              className="icon-btn"
              aria-label="New project"
              onClick={() => setModal({ type: "project" })}
            >
              <Plus size={16} />
            </button>
          </div>
          <nav>
            {projects.map((p) => (
              <button
                key={p.id}
                className={`nav-item ${view === p.id ? "active" : ""}`}
                onClick={() => go(p.id)}
              >
                <span className="project-dot" style={{ background: p.color }} />
                <span>{p.name}</span>
                <small>
                  {
                    tasks.filter(
                      (t) => t.projectId === p.id && t.status !== "done",
                    ).length
                  }
                </small>
              </button>
            ))}
            <button
              className={`nav-item ${view === "All tasks" ? "active" : ""}`}
              onClick={() => go("All tasks")}
            >
              <LayoutGrid size={17} />
              <span>All tasks</span>
            </button>
            <button
              className={`nav-item ${view === "Completed" ? "active" : ""}`}
              onClick={() => go("Completed")}
            >
              <CheckCheck size={18} />
              <span>Completed</span>
            </button>
          </nav>
          <div className="sidebar-bottom">
            <div className="install-card">
              <div className="install-card-top">
                <Monitor size={26} />
                <span>
                  YOUR LITTLE
                  <br />
                  DESKTOP COMPANION
                </span>
                <Sparkles size={18} />
              </div>
              <p>A brighter day, one click away.</p>
              <button onClick={install}>
                Install Daylight
                <ArrowUpRight size={15} />
              </button>
            </div>
            <button
              className="nav-item settings-btn"
              onClick={() => setModal({ type: "settings" })}
            >
              <Settings size={18} />
              <span>Settings & preferences</span>
            </button>
            <div className="sidebar-foot">
              <span>
                <i />
                Saved on this device
              </span>
              <button
                className="icon-btn"
                aria-label="Help and shortcuts"
                onClick={() => setModal({ type: "help" })}
              >
                <CircleHelp size={16} />
              </button>
            </div>
          </div>
        </aside>
      )}
      {!isMobile && (
        <div className="app-body">
          <header className="topbar">
            <div className="breadcrumb">
              <button
                className="icon-btn mobile-menu"
                aria-label="Open menu"
                onClick={() => setMobileNav(true)}
              >
                <Menu size={20} />
              </button>
              <span>My workspace</span>
              <ChevronRight size={13} />
              <b>{currentProject?.name || view}</b>
            </div>
            <div className="topbar-right">
              <span className="local-label">
                <ShieldCheck size={14} />
                Private & personal
              </span>
              <button
                className="icon-btn"
                aria-label="Search your workspace"
                onClick={() => setModal({ type: "search" })}
              >
                <Search size={18} />
              </button>
              <button
                className="profile-avatar"
                aria-label="Open profile settings"
                onClick={() => setModal({ type: "settings" })}
              >
                {profile.name[0].toUpperCase()}
              </button>
            </div>
          </header>
          <main className="main-content">
            <div className="page-heading">
              <div>
                <div className="page-eyebrow">
                  {view === "My day"
                    ? new Date().toLocaleDateString("en", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "A LITTLE MORE CLARITY"}
                </div>
                <h1>
                  {view === "My day"
                    ? `Hello, ${profile.name}`
                    : view === "You"
                      ? "A little space for you."
                      : currentProject?.name || view}
                  {view === "My day" && <span className="greeting-sun">✳</span>}
                </h1>
              </div>
              <div className="heading-actions">
                {currentProject && (
                  <button
                    className="btn secondary"
                    onClick={() =>
                      setModal({ type: "project", project: currentProject })
                    }
                  >
                    <Pencil size={15} />
                    Edit project
                  </button>
                )}
                <button className="btn dark" onClick={() => newTask()}>
                  <Plus size={18} />
                  Add task<kbd>N</kbd>
                </button>
              </div>
            </div>
            {view === "My day" && (
              <>
                <section className="day-hero">
                  <div className="hero-copy">
                    <span className="eyebrow">
                      <span className="tiny-sun">✳</span>{" "}
                      {profile.routine && profile.routine !== "Anytime"
                        ? `YOUR ${profile.routine.toUpperCase()} MOMENT`
                        : "A FRESH PERSPECTIVE"}
                    </span>
                    <h2>
                      A little focus.
                      <br />A <em>brighter</em> day.
                    </h2>
                    <p>
                      You don’t have to do it all.
                      <br />
                      Just make room for what matters.
                    </p>
                    <button
                      onClick={() => {
                        document.getElementById("plan")?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className="hero-link"
                    >
                      Let’s make today a good one
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="hero-art">
                    <div className="hero-lavender" />
                    <img
                      src={photo("studio")}
                      alt="Sunlit creative studio with a yellow chair and fresh daisies"
                    />
                    <Flower
                      className="hero-flower"
                      color="#e8b6d4"
                      size={107}
                    />
                    <div className="hero-note">
                      <span>
                        <Check size={15} />
                      </span>
                      One thing at a time.
                    </div>
                    <span className="hero-scribble">
                      grow at your own pace ↗
                    </span>
                  </div>
                </section>
                <div className="day-stats">
                  <div>
                    <span className="stat-icon yellow">
                      <Sun size={21} />
                    </span>
                    <div>
                      <span>On your list</span>
                      <b>
                        {activeToday}
                        <small>tasks for today</small>
                      </b>
                    </div>
                  </div>
                  <div>
                    <span className="stat-icon green">
                      <CheckCheck size={21} />
                    </span>
                    <div>
                      <span>Little wins</span>
                      <b>
                        {completedToday}
                        <small>of {profile.goal} daily goal</small>
                      </b>
                    </div>
                    <div className="mini-progress">
                      <i
                        style={{
                          width: `${Math.min(100, (completedToday / profile.goal) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="stat-icon purple">
                      <Timer size={21} />
                    </span>
                    <div>
                      <span>Time well spent</span>
                      <b>
                        {focusMinutes}
                        <small>focused minutes</small>
                      </b>
                    </div>
                  </div>
                </div>
                <div className="dashboard-grid" id="plan">
                  <div className="dashboard-main">
                    {overdue.length > 0 && (
                      <div className="overdue-note">
                        <Clock3 size={15} />
                        {overdue.length} task{overdue.length > 1 ? "s" : ""}{" "}
                        carried over. A fresh chance today.
                      </div>
                    )}
                    {taskPanel}
                    <div className="section-heading project-section-heading">
                      <h2>Your little big plans</h2>
                      <button
                        className="text-btn"
                        onClick={() => go("Projects")}
                      >
                        All projects
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                    <div className="project-grid compact">
                      {projects.slice(0, 3).map((p) => (
                        <ProjectCard
                          key={p.id}
                          project={p}
                          tasks={tasks}
                          onClick={() => go(p.id)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="dashboard-side">
                    <FocusCard
                      seconds={seconds}
                      timer={timer}
                      onToggle={startPause}
                      onReset={() => resetTimer()}
                      onOpen={() => go("Focus")}
                    />
                    <section className="habit-card">
                      <div className="section-heading">
                        <h2>Little rituals</h2>
                        <button
                          className="icon-btn"
                          aria-label="All habits"
                          onClick={() => go("Habits")}
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                      <p>Good days start with small things.</p>
                      {habits.length ? (
                        habits.slice(0, 3).map((h) => (
                          <button
                            key={h.id}
                            className={`habit-mini ${h.history.includes(today()) ? "done" : ""}`}
                            onClick={() => toggleHabit(h.id)}
                          >
                            <span className="habit-icon">
                              {h.icon === "book" ? (
                                <BookOpen size={17} />
                              ) : h.icon === "coffee" ? (
                                <Coffee size={17} />
                              ) : (
                                <Leaf size={17} />
                              )}
                            </span>
                            <span>{h.title}</span>
                            <span className="habit-tick">
                              {h.history.includes(today()) && (
                                <Check size={12} />
                              )}
                            </span>
                          </button>
                        ))
                      ) : (
                        <button
                          className="text-btn"
                          onClick={() => setModal({ type: "habit" })}
                        >
                          <Plus size={16} />
                          Create your first ritual
                        </button>
                      )}
                    </section>
                    <button
                      className="daily-spark"
                      onClick={() => setModal({ type: "reflection" })}
                    >
                      <img
                        src={photo("daisies")}
                        alt="Daisies in the sunshine"
                      />
                      <span>
                        <span className="eyebrow">A GENTLE REMINDER</span>
                        <b>Progress, not perfection.</b>
                        <small>
                          A moment for yourself
                          <ArrowUpRight size={14} />
                        </small>
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
            {(["Inbox", "Upcoming", "All tasks", "Completed"].includes(view) ||
              currentProject) && (
              <>
                {currentProject && (
                  <div
                    className="project-banner"
                    style={{ background: currentProject.color }}
                  >
                    <div>
                      <span className="eyebrow">SPACE FOR WHAT MATTERS</span>
                      <h2>
                        {currentProject.desc || "One little step closer."}
                      </h2>
                      <p>
                        {
                          tasks.filter(
                            (t) =>
                              t.projectId === currentProject.id &&
                              t.status === "done",
                          ).length
                        }{" "}
                        completed ·{" "}
                        {
                          tasks.filter(
                            (t) =>
                              t.projectId === currentProject.id &&
                              t.status !== "done",
                          ).length
                        }{" "}
                        still to explore
                      </p>
                    </div>
                    <img
                      src={photo(currentProject.image)}
                      alt={`${currentProject.name} project inspiration`}
                    />
                  </div>
                )}
                {view === "Inbox" && (
                  <p className="view-intro">
                    Get it out of your head. Give it a home later.
                  </p>
                )}
                {taskPanel}
              </>
            )}
            {view === "Projects" && (
              <>
                <div className="projects-intro">
                  <p>
                    For the things you’re working on. And the things you’re
                    working toward.
                  </p>
                  <button
                    className="btn secondary"
                    onClick={() => setModal({ type: "project" })}
                  >
                    <Plus size={17} />
                    New project
                  </button>
                </div>
                <div className="project-grid full">
                  {projects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      tasks={tasks}
                      onClick={() => go(p.id)}
                    />
                  ))}
                  <button
                    className="project-new"
                    onClick={() => setModal({ type: "project" })}
                  >
                    <Plus size={27} />
                    <b>Room for another idea</b>
                    <span>Create a project</span>
                  </button>
                </div>
              </>
            )}
            {view === "Calendar" && (
              <CalendarView
                tasks={tasks}
                projects={projects}
                onEdit={rowProps.onEdit}
                onAdd={newTask}
              />
            )}
            {view === "Focus" && (
              <FocusView
                seconds={seconds}
                timer={timer}
                tasks={tasks}
                profile={profile}
                onToggle={startPause}
                onReset={resetTimer}
                onSelect={(id) => setTimer((t) => ({ ...t, taskId: id }))}
                sessions={data.sessions}
              />
            )}
            {view === "Habits" && (
              <HabitsView
                habits={habits}
                onToggle={toggleHabit}
                onAdd={() => setModal({ type: "habit" })}
                onEdit={(h) => setModal({ type: "habit", habit: h })}
              />
            )}
            {view === "You" && (
              <div className="desktop-feelings">
                <MoodSpace data={data} onMood={saveMood} />
              </div>
            )}
            <footer className="main-footer">
              <span>
                <Sun size={13} /> Your pace. Your space.
              </span>
              <span>A little better, every day.</span>
            </footer>
          </main>
        </div>
      )}
      {isMobile && (
        <div className="app-body mobile-app-body">
          <MobileExperience
            data={data}
            view={view}
            onGo={go}
            onModal={setModal}
            onAdd={newTask}
            onToggle={toggleTask}
            onEdit={rowProps.onEdit}
            onFocus={startTaskFocus}
            onHabit={toggleHabit}
            onMood={saveMood}
            selected={mobileDay}
            onSelect={setMobileDay}
            recent={celebration.recent}
            completed={completedToday}
            focusMinutes={focusMinutes}
            timer={timer}
            seconds={seconds}
            renderBoard={(items) => (
              <Board tasks={items} {...rowProps} setStatus={setTaskStatus} />
            )}
            renderFocus={() => (
              <FocusView
                seconds={seconds}
                timer={timer}
                tasks={tasks}
                profile={profile}
                onToggle={startPause}
                onReset={resetTimer}
                onSelect={(id) => setTimer((t) => ({ ...t, taskId: id }))}
                sessions={data.sessions}
              />
            )}
          />
        </div>
      )}
      {modal?.type === "browse" && (
        <Modal title="Browse your workspace" onClose={() => setModal(null)}>
          <MobileBrowse
            data={data}
            onGo={(v) => {
              setModal(null);
              go(v);
            }}
            onModal={setModal}
          />
        </Modal>
      )}
      <CompletionEffects bursts={celebration.bursts} />
      {modal?.type === "task" && (
        <TaskEditor
          task={modal.task}
          due={modal.due}
          projectId={modal.projectId}
          projects={projects}
          onSave={saveTask}
          onDelete={deleteTask}
          onClose={() => setModal(null)}
          onFocus={startTaskFocus}
        />
      )}
      {modal?.type === "project" && (
        <ProjectEditor
          project={modal.project}
          onClose={() => setModal(null)}
          onSave={(p) => {
            update((d) => ({
              ...d,
              projects: d.projects.some((x) => x.id === p.id)
                ? d.projects.map((x) => (x.id === p.id ? p : x))
                : [...d.projects, p],
            }));
            setModal(null);
            go(p.id);
            notify("A little space for a big idea. Project saved.");
          }}
          onDelete={(id) => {
            update((d) => ({
              ...d,
              projects: d.projects.filter((p) => p.id !== id),
              tasks: d.tasks.map((t) =>
                t.projectId === id ? { ...t, projectId: "" } : t,
              ),
            }));
            setModal(null);
            go("Projects");
            notify("Project removed. Its tasks are safely in your Inbox.");
          }}
        />
      )}
      {modal?.type === "habit" && (
        <HabitEditor
          habit={modal.habit}
          onClose={() => setModal(null)}
          onSave={(h) => {
            update((d) => ({
              ...d,
              habits: d.habits.some((x) => x.id === h.id)
                ? d.habits.map((x) => (x.id === h.id ? h : x))
                : [...d.habits, h],
            }));
            setModal(null);
            notify("Your ritual is ready. Small steps, every day.");
          }}
          onDelete={(id) => {
            const old = habits.find((h) => h.id === id);
            update((d) => ({
              ...d,
              habits: d.habits.filter((h) => h.id !== id),
            }));
            setModal(null);
            notify("Ritual removed", () =>
              update((d) => ({ ...d, habits: [...d.habits, old] })),
            );
          }}
        />
      )}
      {modal?.type === "search" && (
        <SearchModal
          tasks={tasks}
          projects={projects}
          onClose={() => setModal(null)}
          onTask={rowProps.onEdit}
          onProject={(id) => {
            go(id);
            setModal(null);
          }}
        />
      )}
      {modal?.type === "settings" && (
        <SettingsModal
          data={data}
          onClose={() => setModal(null)}
          onSave={(p) => {
            update((d) => ({ ...d, profile: p }));
            if (!timer.running)
              setTimer((t) => ({
                ...t,
                remaining: (t.mode === "break" ? 5 : p.focus) * 60,
              }));
            setModal(null);
            notify("Your space, a little more you. Preferences saved.");
          }}
          onImport={(d) => {
            setData(d);
            setModal(null);
            go("My day");
            setTimer({
              remaining: d.profile.focus * 60,
              running: false,
              mode: "focus",
              taskId: "",
            });
            notify("Welcome back. Your workspace has been restored.");
          }}
          notify={notify}
        />
      )}
      {modal?.type === "help" && (
        <Modal title="A little guidance" onClose={() => setModal(null)}>
          <h2>A little guidance.</h2>
          <p className="muted">Less clicking. More doing.</p>
          <div className="shortcut-row">
            <span>Create a new task</span>
            <kbd>N</kbd>
          </div>
          <div className="shortcut-row">
            <span>Search tasks & projects</span>
            <kbd>Ctrl K</kbd>
          </div>
          <div className="shortcut-row">
            <span>Close a window</span>
            <kbd>Esc</kbd>
          </div>
          <div className="help-note">
            <h3>Your first little steps</h3>
            <p>
              Capture a thought in Inbox. Give it a date and a project. Use the
              board to move it from To do to In progress to Done. Need a little
              momentum? Start a focus session.
            </p>
            <p>
              <b>Quick dates:</b> type “today” or “tomorrow” in a task title.
              Add p1, p2, or p3 for priority.
            </p>
            <p>
              This is your private, local workspace. Use Settings to export a
              backup. There’s no cloud sync or shared workspace.
            </p>
          </div>
        </Modal>
      )}
      {modal?.type === "install" && (
        <Modal
          title="Install Daylight on Windows"
          onClose={() => setModal(null)}
        >
          <div className="modal-feature-icon yellow">
            <Monitor size={30} />
          </div>
          <h2>Your desktop companion.</h2>
          <p className="muted">Give Daylight a little home on Windows.</p>
          <ol className="install-steps">
            <li>
              Open this app’s live URL in <b>Microsoft Edge</b> or{" "}
              <b>Google Chrome</b>, outside the preview frame.
            </li>
            <li>
              In Edge, open <b>⋯ → Apps → Install this site as an app</b>. In
              Chrome, use <b>⋮ → Cast, save and share → Install page as app</b>{" "}
              (wording may vary).
            </li>
            <li>
              Pin Daylight to your taskbar. Come back whenever you need a little
              clarity.
            </li>
          </ol>
          <div className="help-note">
            This is an installable web app, not a native .exe. Installation and
            offline caching depend on browser support. Open it online once
            before using it offline.
          </div>
          <button
            className="btn dark full-width"
            onClick={() => setModal(null)}
          >
            Sounds good
            <Check size={16} />
          </button>
        </Modal>
      )}
      {modal?.type === "reflection" && (
        <Reflection
          value={data.reflections?.[today()] || ""}
          onClose={() => setModal(null)}
          onSave={(value) => {
            update((d) => ({
              ...d,
              reflections: { ...d.reflections, [today()]: value },
            }));
            setModal(null);
            notify("A moment worth keeping. Reflection saved.");
          }}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <span className="toast-check">
            <Check size={16} />
          </span>
          {toast.text}
          {toast.action && (
            <button
              onClick={() => {
                toast.action();
                setToast(null);
              }}
            >
              Undo
            </button>
          )}
          <button
            className="icon-btn"
            aria-label="Dismiss notification"
            onClick={() => setToast(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

function Empty({ icon: Icon, title, text }) {
  return (
    <div className="empty-state">
      <Icon size={36} strokeWidth={1.3} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
function TaskRow({
  task: t,
  projects,
  onToggle,
  onEdit,
  onFocus,
  recent = [],
}) {
  const p = projects.find((p) => p.id === t.projectId);
  return (
    <div
      className={`task-row ${t.status === "done" ? "completed" : ""} ${recent.includes(t.id) ? "just-completed" : ""}`}
    >
      <button
        className={`task-check ${t.priority}`}
        onClick={(e) => onToggle(t, e.currentTarget)}
        disabled={recent.includes(t.id)}
        aria-label={`${t.status === "done" ? "Reopen" : "Complete"} ${t.title}`}
      >
        {t.status === "done" && <Check size={13} />}
      </button>
      <button className="task-content" onClick={() => onEdit(t)}>
        <span className="task-title">{t.title}</span>
        <span className="task-meta">
          {p ? (
            <span>
              <i style={{ background: p.color }} />
              {p.name}
            </span>
          ) : (
            <span>
              <Inbox size={11} />
              Inbox
            </span>
          )}
          {t.subtasks.length > 0 && (
            <span>
              <List size={11} />
              {t.subtasks.filter((s) => s.done).length}/{t.subtasks.length}
            </span>
          )}
          {t.repeat !== "none" && <Repeat2 size={11} />}{" "}
          {t.tags.slice(0, 1).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </span>
      </button>
      <div className="task-row-right">
        <span className={`priority-badge ${t.priority}`}>{t.priority}</span>
        <span
          className={`task-date ${t.due && t.due < today() && t.status !== "done" ? "overdue" : ""}`}
        >
          {t.due ? (
            <>
              <Calendar size={12} />
              {niceDate(t.due)}
            </>
          ) : null}
        </span>
        <button
          className="task-focus icon-btn"
          aria-label={`Focus on ${t.title}`}
          onClick={() => onFocus(t)}
        >
          <Play size={15} />
        </button>
        <button
          className="icon-btn task-more"
          aria-label={`Edit ${t.title}`}
          onClick={() => onEdit(t)}
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
    </div>
  );
}
function Board({
  tasks,
  projects,
  onEdit,
  onToggle,
  onFocus,
  setStatus,
  recent = [],
}) {
  return (
    <div className="board">
      {[
        ["todo", "To do", "#e8ddba"],
        ["doing", "In progress", "#d6cceb"],
        ["done", "Done", "#ccddba"],
      ].map(([status, name, color]) => (
        <div
          className="board-column"
          key={status}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setStatus(e.dataTransfer.getData("text/plain"), status);
          }}
        >
          <h3>
            <i style={{ background: color }} />
            {name}
            <span>{tasks.filter((t) => t.status === status).length}</span>
          </h3>
          {tasks
            .filter((t) => t.status === status)
            .map((t) => (
              <article
                className={`board-task ${recent.includes(t.id) ? "just-completed" : ""}`}
                key={t.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", t.id)}
              >
                <button className="board-task-title" onClick={() => onEdit(t)}>
                  {t.title}
                </button>
                <div className="board-task-meta">
                  <span className={`priority-badge ${t.priority}`}>
                    {t.priority}
                  </span>
                  <small>{niceDate(t.due)}</small>
                </div>
                <select
                  aria-label={`Status of ${t.title}`}
                  value={t.status}
                  onChange={(e) =>
                    setStatus(t.id, e.target.value, e.currentTarget)
                  }
                >
                  <option value="todo">To do</option>
                  <option value="doing">In progress</option>
                  <option value="done">Done</option>
                </select>
              </article>
            ))}
          {!tasks.some((t) => t.status === status) && (
            <p className="board-empty">
              A little space for progress.
              <br />
              Drop a task here.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
function ProjectCard({ project: p, tasks, onClick }) {
  const all = tasks.filter((t) => t.projectId === p.id),
    done = all.filter((t) => t.status === "done").length;
  return (
    <button className="project-card" onClick={onClick}>
      <div className="project-photo">
        <img src={photo(p.image)} alt={`${p.name} inspiration`} />
        <span style={{ background: p.color }}>
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="project-card-body">
        <h3>
          <i style={{ background: p.color }} />
          {p.name}
        </h3>
        <div className="project-progress-label">
          <span>{all.length - done} tasks to go</span>
          <span>{all.length ? Math.round((done / all.length) * 100) : 0}%</span>
        </div>
        <div className="project-progress">
          <i
            style={{
              background: p.color,
              width: `${all.length ? (done / all.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
    </button>
  );
}
function timeLabel(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function FocusCard({ seconds, timer, onToggle, onReset, onOpen }) {
  return (
    <section className="focus-card">
      <div className="section-heading">
        <span>
          <Timer size={17} />A little focus
        </span>
        <button
          className="icon-btn"
          aria-label="Open focus room"
          onClick={onOpen}
        >
          <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="focus-clock">
        {timeLabel(seconds)}
        <Flower size={48} color="#b8aed1" />
      </div>
      <p>
        {timer.running
          ? "One thing. Your full attention."
          : timer.mode === "break"
            ? "You’ve earned a little breather."
            : "One task. A fresh perspective."}
      </p>
      <div className="focus-controls">
        <button className="btn dark" onClick={onToggle}>
          {timer.running ? <Pause size={15} /> : <Play size={15} />}{" "}
          {timer.running ? "Pause session" : "Start focusing"}
        </button>
        <button
          className="round-button"
          aria-label="Reset focus timer"
          onClick={onReset}
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </section>
  );
}

function TaskEditor({
  task,
  due,
  projectId,
  projects,
  onSave,
  onClose,
  onDelete,
  onFocus,
}) {
  const [t, setT] = useState(
      task || {
        id: uid(),
        title: "",
        notes: "",
        projectId: projectId || "",
        due: due ?? today(),
        priority: "medium",
        repeat: "none",
        status: "todo",
        tags: [],
        subtasks: [],
        createdAt: Date.now(),
      },
    ),
    [sub, setSub] = useState(""),
    [tagText, setTagText] = useState(task?.tags.join(", ") || ""),
    [confirmDelete, setConfirmDelete] = useState(false);
  const change = (k, v) => setT((t) => ({ ...t, [k]: v }));
  function save(e) {
    e.preventDefault();
    let title = t.title.trim(),
      due = t.due,
      priority = t.priority;
    if (/\btomorrow\b/i.test(title)) {
      due = addDays(1);
      title = title.replace(/\btomorrow\b/i, "").trim();
    } else if (/\btoday\b/i.test(title)) {
      due = today();
      title = title.replace(/\btoday\b/i, "").trim();
    }
    const m = title.match(/\bp([123])\b/i);
    if (m) {
      priority = { 1: "high", 2: "medium", 3: "low" }[m[1]];
      title = title.replace(m[0], "").trim();
    }
    if (!title) return;
    onSave({
      ...t,
      title,
      due,
      priority,
      tags: tagText
        .split(",")
        .map((x) => x.trim().replace(/^#/, ""))
        .filter(Boolean),
      completedAt: t.status === "done" ? t.completedAt || Date.now() : null,
    });
  }
  return (
    <Modal title={task ? "Edit task" : "Add a task"} onClose={onClose}>
      <form onSubmit={save}>
        <h2>
          {task ? "A little more detail." : "One less thing on your mind."}
        </h2>
        <input
          className="task-title-input"
          aria-label="Task title"
          placeholder="What would you like to do?"
          value={t.title}
          onChange={(e) => change("title", e.target.value)}
          required
          maxLength={200}
        />
        <div className="quick-hint">
          <Sparkles size={12} />
          Try “Read a chapter tomorrow p2”
        </div>
        <textarea
          aria-label="Task notes"
          placeholder="A few notes, a little context…"
          value={t.notes}
          onChange={(e) => change("notes", e.target.value)}
          rows={3}
          maxLength={5000}
        />
        <div className="form-grid">
          <label>
            <span>
              <LayoutGrid size={14} />
              Project
            </span>
            <select
              aria-label="Project"
              value={t.projectId}
              onChange={(e) => change("projectId", e.target.value)}
            >
              <option value="">Inbox</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>
              <Calendar size={14} />
              Date
            </span>
            <input
              aria-label="Date"
              type="date"
              value={t.due}
              onChange={(e) => change("due", e.target.value)}
            />
          </label>
          <label>
            <span>
              <Flag size={14} />
              Priority
            </span>
            <select
              aria-label="Priority"
              value={t.priority}
              onChange={(e) => change("priority", e.target.value)}
            >
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
            </select>
          </label>
          <label>
            <span>
              <Repeat2 size={14} />
              Repeat
            </span>
            <select
              aria-label="Repeat"
              value={t.repeat}
              onChange={(e) => change("repeat", e.target.value)}
            >
              <option value="none">Does not repeat</option>
              <option value="daily">Every day</option>
              <option value="weekly">Every week</option>
              <option value="monthly">Every month</option>
            </select>
          </label>
          <label>
            <span>
              <Circle size={14} />
              Status
            </span>
            <select
              aria-label="Status"
              value={t.status}
              onChange={(e) => change("status", e.target.value)}
            >
              <option value="todo">To do</option>
              <option value="doing">In progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <label>
            <span>
              <Tag size={14} />
              Tags
            </span>
            <input
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              placeholder="e.g. home, creative"
            />
          </label>
        </div>
        <div className="subtasks">
          <label className="field-label">
            Little steps{" "}
            <span>
              {t.subtasks.filter((s) => s.done).length}/{t.subtasks.length}
            </span>
          </label>
          {t.subtasks.map((s, i) => (
            <div className="subtask" key={s.id}>
              <input
                aria-label={`Complete subtask ${s.title}`}
                type="checkbox"
                checked={s.done}
                onChange={(e) =>
                  change(
                    "subtasks",
                    t.subtasks.map((x) =>
                      x.id === s.id ? { ...x, done: e.target.checked } : x,
                    ),
                  )
                }
              />
              <span className={s.done ? "struck" : ""}>{s.title}</span>
              <button
                type="button"
                className="icon-btn"
                aria-label={`Remove subtask ${s.title}`}
                onClick={() =>
                  change(
                    "subtasks",
                    t.subtasks.filter((x) => x.id !== s.id),
                  )
                }
              >
                <X size={13} />
              </button>
            </div>
          ))}
          <div className="subtask-add">
            <Plus size={16} />
            <input
              aria-label="New subtask"
              placeholder="Break it into a smaller step…"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (sub.trim()) {
                    change("subtasks", [
                      ...t.subtasks,
                      { id: uid(), title: sub.trim(), done: false },
                    ]);
                    setSub("");
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                if (sub.trim()) {
                  change("subtasks", [
                    ...t.subtasks,
                    { id: uid(), title: sub.trim(), done: false },
                  ]);
                  setSub("");
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="modal-actions">
          {task ? (
            <div className="row">
              <button
                type="button"
                className={`icon-btn ${confirmDelete ? "danger" : ""}`}
                aria-label={
                  confirmDelete ? "Confirm delete task" : "Delete task"
                }
                onClick={() =>
                  confirmDelete ? onDelete(t.id) : setConfirmDelete(true)
                }
              >
                {confirmDelete ? <span>Delete?</span> : <Trash2 size={17} />}
              </button>
              <button
                type="button"
                className="text-btn"
                onClick={() => onFocus(task)}
              >
                <Play size={14} />
                Focus
              </button>
            </div>
          ) : (
            <button type="button" className="text-btn" onClick={onClose}>
              Cancel
            </button>
          )}
          <button className="btn dark" type="submit">
            {task ? "Save changes" : "Add task"}
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
function ProjectEditor({ project, onSave, onDelete, onClose }) {
  const [p, setP] = useState(
      project || {
        id: uid(),
        name: "",
        desc: "",
        color: COLORS[0],
        image: "desk",
      },
    ),
    [confirm, setConfirm] = useState(false);
  return (
    <Modal title={project ? "Edit project" : "New project"} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (p.name.trim()) onSave({ ...p, name: p.name.trim() });
        }}
      >
        <h2>
          {project ? "Make it your own." : "A little space for a big idea."}
        </h2>
        <label className="field-label">Project name</label>
        <input
          required
          aria-label="Project name"
          placeholder="What are you working toward?"
          maxLength={45}
          value={p.name}
          onChange={(e) => setP({ ...p, name: e.target.value })}
        />
        <label className="field-label">A few words about it</label>
        <input
          placeholder="One little step closer…"
          maxLength={100}
          value={p.desc}
          onChange={(e) => setP({ ...p, desc: e.target.value })}
        />
        <label className="field-label">Set the mood</label>
        <div className="cover-picker">
          {["desk", "coast", "daisies", "architecture", "forest", "books"].map(
            (img) => (
              <button
                type="button"
                aria-label={`${img} cover`}
                className={p.image === img ? "selected" : ""}
                key={img}
                onClick={() => setP({ ...p, image: img })}
              >
                <img src={photo(img)} alt={img} />
                {p.image === img && <Check size={20} />}
              </button>
            ),
          )}
        </div>
        <label className="field-label">A little color</label>
        <div className="color-picker">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c}
              aria-label={`Color ${c}`}
              style={{ background: c }}
              onClick={() => setP({ ...p, color: c })}
            >
              {p.color === c && <Check size={18} />}
            </button>
          ))}
        </div>
        <div className="modal-actions">
          {project ? (
            <button
              type="button"
              className="text-btn danger"
              onClick={() => (confirm ? onDelete(p.id) : setConfirm(true))}
            >
              <Trash2 size={15} />
              {confirm ? "Confirm remove project?" : "Remove project"}
            </button>
          ) : (
            <button type="button" className="text-btn" onClick={onClose}>
              Cancel
            </button>
          )}
          <button className="btn dark" type="submit">
            {project ? "Save project" : "Create project"}
            <ArrowRight size={16} />
          </button>
        </div>
        {confirm && (
          <p className="small muted">
            Your tasks will move to Inbox. They won’t be deleted.
          </p>
        )}
      </form>
    </Modal>
  );
}
function HabitEditor({ habit, onSave, onDelete, onClose }) {
  const [h, setH] = useState(
    habit || { id: uid(), title: "", icon: "leaf", history: [] },
  );
  return (
    <Modal title="Your daily ritual" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (h.title.trim()) onSave({ ...h, title: h.title.trim() });
        }}
      >
        <div className="modal-feature-icon green">
          <Leaf size={26} />
        </div>
        <h2>{habit ? "A ritual, reimagined." : "Small things. Good days."}</h2>
        <p className="muted">
          Choose one little thing you’d like to do every day.
        </p>
        <label className="field-label">Your daily ritual</label>
        <input
          aria-label="Habit name"
          required
          placeholder="e.g. Take a 10-minute walk"
          maxLength={80}
          value={h.title}
          onChange={(e) => setH({ ...h, title: e.target.value })}
        />
        <div className="icon-picker">
          {[
            ["leaf", Leaf],
            ["book", BookOpen],
            ["coffee", Coffee],
          ].map(([id, Icon]) => (
            <button
              className={h.icon === id ? "selected" : ""}
              type="button"
              aria-label={`${id} icon`}
              key={id}
              onClick={() => setH({ ...h, icon: id })}
            >
              <Icon size={23} />
            </button>
          ))}
        </div>
        <div className="modal-actions">
          {habit ? (
            <button
              type="button"
              className="text-btn danger"
              onClick={() => onDelete(h.id)}
            >
              <Trash2 size={16} />
              Remove ritual
            </button>
          ) : (
            <button type="button" className="text-btn" onClick={onClose}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn dark">
            Save ritual
            <Check size={16} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
function CalendarView({ tasks, projects, onEdit, onAdd }) {
  const [month, setMonth] = useState(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    ),
    [selected, setSelected] = useState(today());
  const start = new Date(month);
  start.setDate(1 - ((start.getDay() + 6) % 7));
  const days = Array.from({ length: 42 }, (_, i) => addDays(i, start));
  const shift = (n) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));
  return (
    <div className="calendar-layout">
      <section className="calendar-card">
        <div className="calendar-heading">
          <h2>
            {month.toLocaleDateString("en", { month: "long", year: "numeric" })}
          </h2>
          <div className="row">
            <button
              className="btn secondary small-btn"
              onClick={() => {
                setMonth(
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                );
                setSelected(today());
              }}
            >
              Today
            </button>
            <button
              className="icon-btn"
              aria-label="Previous month"
              onClick={() => shift(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="icon-btn"
              aria-label="Next month"
              onClick={() => shift(1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="calendar-weekdays">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {days.map((date) => {
            const ts = tasks.filter((t) => t.due === date);
            return (
              <div
                key={date}
                className={`calendar-cell ${parseDate(date).getMonth() !== month.getMonth() ? "outside" : ""} ${date === today() ? "today" : ""} ${date === selected ? "selected" : ""}`}
              >
                <div className="calendar-cell-head">
                  <button
                    aria-label={`Select ${date}`}
                    onClick={() => setSelected(date)}
                  >
                    {parseDate(date).getDate()}
                  </button>
                  <button
                    className="calendar-add"
                    aria-label={`Add task on ${date}`}
                    onClick={() => onAdd(date)}
                  >
                    <Plus size={12} />
                  </button>
                </div>
                {ts.slice(0, 3).map((t) => (
                  <button
                    key={t.id}
                    className={`calendar-event ${t.status === "done" ? "struck" : ""}`}
                    style={{
                      background:
                        projects.find((p) => p.id === t.projectId)?.color ||
                        "#f4e5af",
                    }}
                    onClick={() => onEdit(t)}
                  >
                    {t.status === "done" && <Check size={10} />} {t.title}
                  </button>
                ))}
                {ts.length > 3 && (
                  <button
                    className="calendar-more"
                    onClick={() => setSelected(date)}
                  >
                    +{ts.length - 3} more
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <aside className="calendar-agenda">
        <img
          src={photo("architecture")}
          alt="Architectural curves in the sunlight"
        />
        <span className="eyebrow">A LITTLE LOOK AHEAD</span>
        <h2>
          {parseDate(selected).toLocaleDateString("en", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </h2>
        <p>
          {tasks.filter((t) => t.due === selected).length} things on your
          horizon
        </p>
        {tasks
          .filter((t) => t.due === selected)
          .map((t) => (
            <button
              className="agenda-task"
              onClick={() => onEdit(t)}
              key={t.id}
            >
              <span className={`priority-dot ${t.priority}`} />
              <span>
                {t.title}
                <small>
                  {t.status === "done"
                    ? "Completed"
                    : t.status === "doing"
                      ? "In progress"
                      : "To do"}
                </small>
              </span>
              <ChevronRight size={14} />
            </button>
          ))}
        <button className="btn dark" onClick={() => onAdd(selected)}>
          <Plus size={16} />
          Plan a little something
        </button>
      </aside>
    </div>
  );
}
function FocusView({
  seconds,
  timer,
  tasks,
  profile,
  onToggle,
  onReset,
  onSelect,
  sessions,
}) {
  const [scene, setScene] = useState("forest"),
    [sound, setSound] = useState(false);
  const audioRef = useRef(null);
  useEffect(
    () => () => {
      audioRef.current?.close();
    },
    [],
  );
  function toggleSound() {
    if (sound) {
      audioRef.current?.close();
      audioRef.current = null;
      setSound(false);
      return;
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const channel = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < channel.length; i++) {
        last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
        channel[i] = last * 4;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      const gain = ctx.createGain();
      gain.gain.value = 0.18;
      source.connect(gain).connect(ctx.destination);
      source.start();
      audioRef.current = ctx;
      setSound(true);
    } catch {
      setSound(false);
    }
  }
  return (
    <>
      <p className="view-intro">Quiet the noise. Make room for one thing.</p>
      <section
        className="focus-room"
        style={{
          backgroundImage: `linear-gradient(0deg,rgba(13,28,22,.57),rgba(13,28,22,.26)),url(${photo(scene)})`,
        }}
      >
        <div className="focus-room-top">
          <span>
            <span className={`live-dot ${timer.running ? "" : "idle"}`} />
            {timer.running ? "IN YOUR FOCUS ERA" : "YOUR MOMENT OF CLARITY"}
          </span>
          <button onClick={toggleSound} className="sound-btn">
            {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}Brown noise{" "}
            {sound ? "on" : "off"}
          </button>
        </div>
        <div className="focus-room-content">
          <div className="focus-mode">
            <button
              className={timer.mode === "focus" ? "selected" : ""}
              onClick={() => onReset("focus")}
            >
              Focus
            </button>
            <button
              className={timer.mode === "break" ? "selected" : ""}
              onClick={() => onReset("break")}
            >
              Short break
            </button>
          </div>
          <div className="big-clock">{timeLabel(seconds)}</div>
          <p>
            {timer.mode === "focus"
              ? "Be here. Do one thing well."
              : "Step back. Take a breath. You’ve earned it."}
          </p>
          <div className="focus-room-controls">
            <button className="btn" onClick={onToggle}>
              {timer.running ? <Pause size={18} /> : <Play size={18} />}{" "}
              {timer.running ? "Pause session" : "Start session"}
            </button>
            <button
              className="round-button"
              aria-label="Reset timer"
              onClick={() => onReset()}
            >
              <RotateCcw size={18} />
            </button>
          </div>
          <div className="focus-task-select">
            <Target size={17} />
            <select
              aria-label="Task to focus on"
              value={timer.taskId}
              onChange={(e) => onSelect(e.target.value)}
            >
              <option value="">Just a little time to focus</option>
              {tasks
                .filter((t) => t.status !== "done" || t.id === timer.taskId)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="focus-room-bottom">
          <div className="scene-picker">
            {[
              ["forest", "Forest"],
              ["coast", "Lakeside"],
              ["studio", "Studio"],
            ].map(([id, name]) => (
              <button
                key={id}
                title={name}
                aria-label={`${name} background`}
                className={scene === id ? "selected" : ""}
                onClick={() => setScene(id)}
              >
                <img src={photo(id)} alt={name} />
              </button>
            ))}
          </div>
          <span>No rush. Just you, and this moment.</span>
        </div>
      </section>
      <div className="focus-bottom">
        <div className="focus-summary">
          <span className="stat-icon purple">
            <Timer size={22} />
          </span>
          <div>
            <b>
              {
                sessions.filter((s) => dateKey(new Date(s.at)) === today())
                  .length
              }
            </b>
            <span>sessions today</span>
          </div>
          <div>
            <b>
              {sessions
                .filter((s) => dateKey(new Date(s.at)) === today())
                .reduce((n, s) => n + s.minutes, 0)}
              <small> min</small>
            </b>
            <span>time well spent</span>
          </div>
          <div>
            <b>
              {profile.focus}
              <small> min</small>
            </b>
            <span>your focus rhythm</span>
          </div>
        </div>
        <div className="focus-tip">
          <Flower size={42} color="#d1b8de" />
          <p>
            Focus is a practice, not a perfect score.
            <br />
            <b>Every session is a little win.</b>
          </p>
        </div>
      </div>
    </>
  );
}
function HabitsView({ habits, onToggle, onAdd, onEdit }) {
  const [offset, setOffset] = useState(0);
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7) + offset * 7);
  const dates = Array.from({ length: 7 }, (_, i) => addDays(i, monday));
  function streak(h) {
    let n = 0,
      d = today();
    if (!h.history.includes(d)) d = addDays(-1);
    while (h.history.includes(d)) {
      n++;
      d = addDays(-1, parseDate(d));
    }
    return n;
  }
  return (
    <>
      <section className="habits-hero">
        <div>
          <span className="eyebrow">GROW AT YOUR OWN PACE</span>
          <h2>
            A little every day.
            <br />A lot over time.
          </h2>
          <p>Small rituals make space for a happier you.</p>
          <button className="btn dark" onClick={onAdd}>
            <Plus size={17} />
            New ritual
          </button>
        </div>
        <img src={photo("daisies")} alt="Daisies growing toward the sky" />
        <Flower size={94} color="#edbdd7" />
      </section>
      <section className="habit-tracker">
        <div className="section-heading">
          <h2>Your everyday little things</h2>
          <div className="row">
            <button
              className="icon-btn"
              aria-label="Previous week"
              onClick={() => setOffset(offset - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="small">
              {offset === 0
                ? "This week"
                : `${niceDate(dates[0])} – ${niceDate(dates[6])}`}
            </span>
            <button
              className="icon-btn"
              aria-label="Next week"
              disabled={offset >= 0}
              onClick={() => setOffset(offset + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        {habits.length ? (
          <div className="habit-table">
            <div className="habit-table-heading">
              <span>YOUR RITUAL</span>
              {dates.map((d) => (
                <span className={d === today() ? "today" : ""} key={d}>
                  {parseDate(d).toLocaleDateString("en", { weekday: "short" })}
                  <b>{parseDate(d).getDate()}</b>
                </span>
              ))}
              <span>STREAK</span>
            </div>
            {habits.map((h) => (
              <div className="habit-table-row" key={h.id}>
                <button className="habit-name" onClick={() => onEdit(h)}>
                  <span className="stat-icon green">
                    {h.icon === "book" ? (
                      <BookOpen size={20} />
                    ) : h.icon === "coffee" ? (
                      <Coffee size={20} />
                    ) : (
                      <Leaf size={20} />
                    )}
                  </span>
                  {h.title}
                  <Pencil size={13} />
                </button>
                {dates.map((d) => (
                  <button
                    key={d}
                    aria-label={`${h.history.includes(d) ? "Uncheck" : "Check"} ${h.title} on ${d}`}
                    disabled={d > today()}
                    className={`ritual-check ${h.history.includes(d) ? "checked" : ""}`}
                    onClick={() => onToggle(h.id, d)}
                  >
                    {h.history.includes(d) ? <Check size={18} /> : <span />}
                  </button>
                ))}
                <span className="streak">
                  <Sparkles size={15} />
                  {streak(h)}
                  <small>days</small>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Empty
            icon={Leaf}
            title="Good things start small."
            text="Add your first ritual and make a little space for yourself."
          />
        )}
      </section>
      <div className="habit-bottom">
        <span>
          <Leaf size={19} />
          {habits.filter((h) => h.history.includes(today())).length} of{" "}
          {habits.length} rituals enjoyed today
        </span>
        <p>Missed a day? That’s okay. There’s always a fresh start.</p>
      </div>
    </>
  );
}
function SearchModal({ tasks, projects, onClose, onTask, onProject }) {
  const [q, setQ] = useState("");
  const results = tasks.filter((t) =>
    `${t.title} ${t.notes} ${t.tags.join(" ")}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  const ps = projects.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <Modal title="Search your workspace" onClose={onClose}>
      <div className="search-input">
        <Search size={22} />
        <input
          aria-label="Search tasks and projects"
          placeholder="Find a task, project, or little idea…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <kbd>Esc</kbd>
      </div>
      <div className="search-results">
        <span className="eyebrow">PROJECTS</span>
        {ps.map((p) => (
          <button key={p.id} onClick={() => onProject(p.id)}>
            <span className="project-dot" style={{ background: p.color }} />
            <b>{p.name}</b>
            <ArrowUpRight size={15} />
          </button>
        ))}
        <span className="eyebrow">{q ? "MATCHING TASKS" : "RECENT TASKS"}</span>
        {results.slice(0, 20).map((t) => (
          <button key={t.id} onClick={() => onTask(t)}>
            {t.status === "done" ? (
              <CheckCircle2 size={17} />
            ) : (
              <Circle size={17} />
            )}
            <span>
              {t.title}
              <small>
                {projects.find((p) => p.id === t.projectId)?.name || "Inbox"} ·{" "}
                {niceDate(t.due)}
              </small>
            </span>
            <ChevronRight size={15} />
          </button>
        ))}
        {!results.length && !ps.length && (
          <Empty
            icon={Search}
            title="Nothing here just yet."
            text="Try another word or a project name."
          />
        )}
      </div>
    </Modal>
  );
}
function validWorkspace(d) {
  return (
    d &&
    d.version === 1 &&
    typeof d.profile?.name === "string" &&
    d.profile.name.trim() &&
    Object.hasOwn(themes, d.profile.theme) &&
    [15, 25, 50].includes(d.profile.focus) &&
    [3, 5, 8].includes(d.profile.goal) &&
    (d.profile.celebrations === undefined ||
      typeof d.profile.celebrations === "boolean") &&
    (d.profile.solidNav === undefined ||
      typeof d.profile.solidNav === "boolean") &&
    (d.moods === undefined ||
      (d.moods !== null &&
        typeof d.moods === "object" &&
        !Array.isArray(d.moods) &&
        Object.entries(d.moods).every(
          ([key, value]) =>
            /^\d{4}-\d{2}-\d{2}$/.test(key) &&
            ["low", "tired", "okay", "good", "great"].includes(value),
        ))) &&
    (d.reflections === undefined ||
      (d.reflections !== null &&
        typeof d.reflections === "object" &&
        !Array.isArray(d.reflections) &&
        Object.entries(d.reflections).every(
          ([key, value]) =>
            /^\d{4}-\d{2}-\d{2}$/.test(key) && typeof value === "string",
        ))) &&
    (d.profile.routine === undefined ||
      ["Morning", "Afternoon", "Evening", "Anytime"].includes(
        d.profile.routine,
      )) &&
    (d.moodDetails === undefined ||
      (d.moodDetails !== null &&
        typeof d.moodDetails === "object" &&
        !Array.isArray(d.moodDetails) &&
        Object.entries(d.moodDetails).every(
          ([k, v]) =>
            /^\d{4}-\d{2}-\d{2}$/.test(k) &&
            v &&
            typeof v.note === "string" &&
            v.note.length <= 1000 &&
            Array.isArray(v.tags) &&
            v.tags.length <= 9 &&
            v.tags.every((t) =>
              [
                "Work",
                "Rest",
                "Movement",
                "People",
                "Sleep",
                "Outdoors",
                "Creativity",
                "Learning",
                "Quiet time",
              ].includes(t),
            ) &&
            typeof v.at === "number" &&
            Number.isFinite(v.at),
        ))) &&
    Array.isArray(d.projects) &&
    d.projects.every(
      (p) =>
        typeof p.id === "string" &&
        typeof p.name === "string" &&
        [
          "desk",
          "coast",
          "daisies",
          "architecture",
          "forest",
          "books",
        ].includes(p.image) &&
        /^#[\da-f]{6}$/i.test(p.color),
    ) &&
    Array.isArray(d.tasks) &&
    d.tasks.every(
      (t) =>
        typeof t.id === "string" &&
        typeof t.title === "string" &&
        typeof t.notes === "string" &&
        typeof t.projectId === "string" &&
        typeof t.due === "string" &&
        (!t.due || /^\d{4}-\d{2}-\d{2}$/.test(t.due)) &&
        ["todo", "doing", "done"].includes(t.status) &&
        ["high", "medium", "low"].includes(t.priority) &&
        ["none", "daily", "weekly", "monthly"].includes(t.repeat) &&
        Array.isArray(t.tags) &&
        t.tags.every((x) => typeof x === "string") &&
        Array.isArray(t.subtasks) &&
        t.subtasks.every(
          (s) =>
            typeof s.id === "string" &&
            typeof s.title === "string" &&
            typeof s.done === "boolean",
        ),
    ) &&
    Array.isArray(d.habits) &&
    d.habits.every(
      (h) =>
        typeof h.id === "string" &&
        typeof h.title === "string" &&
        Array.isArray(h.history) &&
        h.history.every((x) => typeof x === "string"),
    ) &&
    Array.isArray(d.sessions) &&
    d.sessions.every(
      (s) => typeof s.minutes === "number" && typeof s.at === "number",
    )
  );
}
function SettingsModal({ data, onClose, onSave, onImport, notify }) {
  const [p, setP] = useState(data.profile),
    [incoming, setIncoming] = useState(null),
    [error, setError] = useState("");
  const fileRef = useRef();
  function exportData() {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `daylight-backup-${today()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify("Your little world, safely backed up.");
  }
  async function readFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error();
      const d = JSON.parse(await file.text());
      if (!validWorkspace(d)) throw new Error();
      setIncoming(d);
      setError("");
    } catch {
      setError(
        "That doesn’t look like a valid Daylight backup. Please choose an exported JSON file.",
      );
    }
    e.target.value = "";
  }
  return (
    <Modal title="Settings and preferences" onClose={onClose}>
      <h2>Your space, your way.</h2>
      <p className="muted">A few little things that make Daylight yours.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (p.name.trim()) onSave({ ...p, name: p.name.trim() });
        }}
      >
        <label className="field-label">What should we call you?</label>
        <input
          aria-label="Your name"
          value={p.name}
          required
          maxLength={35}
          onChange={(e) => setP({ ...p, name: e.target.value })}
        />
        <div className="form-grid">
          <label>
            <span>Daily task goal</span>
            <select
              value={p.goal}
              onChange={(e) => setP({ ...p, goal: Number(e.target.value) })}
            >
              {[3, 5, 8].map((n) => (
                <option key={n} value={n}>
                  {n} tasks ·{" "}
                  {n === 3
                    ? "Easy does it"
                    : n === 5
                      ? "A steady flow"
                      : "Feeling ambitious"}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Focus session</span>
            <select
              value={p.focus}
              onChange={(e) => setP({ ...p, focus: Number(e.target.value) })}
            >
              {[15, 25, 50].map((n) => (
                <option key={n} value={n}>
                  {n} minutes
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="field-label" htmlFor="focus-routine">
          Your focus moment
        </label>
        <select
          id="focus-routine"
          style={{
            width: "100%",
            marginBottom: 20,
            padding: 12,
            borderRadius: 12,
          }}
          value={p.routine || "Anytime"}
          onChange={(e) => setP({ ...p, routine: e.target.value })}
        >
          {["Morning", "Afternoon", "Evening", "Anytime"].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <label className="field-label">Your everyday palette</label>
        <div className="settings-themes">
          {Object.entries(themes).map(([id, t]) => (
            <button
              type="button"
              className={p.theme === id ? "selected" : ""}
              style={{ background: t.color }}
              key={id}
              onClick={() => setP({ ...p, theme: id })}
            >
              {t.name}
              {p.theme === id && <Check size={16} />}
            </button>
          ))}
        </div>
        <div className="comfort-settings">
          <label>
            <span>
              <b>Celebrate the little wins</b>
              <small>
                A brief checkmark pop and a little confetti. Respects Reduce
                Motion.
              </small>
            </span>
            <input
              type="checkbox"
              checked={p.celebrations !== false}
              onChange={(e) => setP({ ...p, celebrations: e.target.checked })}
            />
          </label>
          <label>
            <span>
              <b>Solid mobile navigation</b>
              <small>
                Prefer less transparency? Give your dock a solid background.
              </small>
            </span>
            <input
              type="checkbox"
              checked={!!p.solidNav}
              onChange={(e) => setP({ ...p, solidNav: e.target.checked })}
            />
          </label>
        </div>
        <div className="settings-data">
          <h3>A little peace of mind.</h3>
          <p>
            This workspace is saved in this browser, on this device. Clearing
            browser data removes it. Export regularly to keep your plans safe.
          </p>
          <div className="row">
            <button
              className="btn secondary"
              type="button"
              onClick={exportData}
            >
              <Download size={15} />
              Export backup
            </button>
            <button
              className="btn secondary"
              type="button"
              onClick={() => fileRef.current.click()}
            >
              <Upload size={15} />
              Restore backup
            </button>
            <input
              type="file"
              accept=".json,application/json"
              ref={fileRef}
              hidden
              onChange={readFile}
            />
          </div>
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          {incoming && (
            <div className="restore-confirm">
              <b>Replace this workspace?</b>
              <p>
                This backup contains {incoming.tasks.length} tasks and{" "}
                {incoming.projects.length} projects. Export your current
                workspace first; restoring replaces it.
              </p>
              <div className="row">
                <button
                  type="button"
                  className="btn dark small-btn"
                  onClick={() => onImport(incoming)}
                >
                  Yes, restore backup
                </button>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => setIncoming(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="modal-actions">
          <span className="small muted">
            <ShieldCheck size={13} />
            Local-first. No account needed.
          </span>
          <button className="btn dark" type="submit">
            Save preferences
            <Check size={16} />
          </button>
        </div>
      </form>
    </Modal>
  );
}
function Reflection({ value, onSave, onClose }) {
  const [text, setText] = useState(value);
  return (
    <Modal title="A moment for yourself" onClose={onClose}>
      <img
        className="reflection-image"
        src={photo("daisies")}
        alt="Daisies in the sunshine"
      />
      <span className="eyebrow">A MOMENT FOR YOURSELF</span>
      <h2>Progress, not perfection.</h2>
      <p className="muted">
        What’s one little thing that felt good today? Big wins are lovely. Small
        ones count, too.
      </p>
      <textarea
        aria-label="Today's reflection"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Today, I’m glad I…"
        rows={5}
        maxLength={3000}
      />
      <div className="modal-actions">
        <span className="small muted">Just for you. Saved for today.</span>
        <button className="btn dark" onClick={() => onSave(text)}>
          Keep this moment
          <Heart size={16} />
        </button>
      </div>
    </Modal>
  );
}
createRoot(document.getElementById("root")).render(<App />);
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () =>
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .catch(() => {}),
  );
}
