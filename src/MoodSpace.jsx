import React, { useState, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Heart,
  Sun,
  ChevronLeft,
  ChevronRight,
  PenLine,
  Leaf,
  Sparkles,
  Trash2,
  X,
  ChevronDown,
} from "lucide-react";
import { useSwipe } from "./Journey.jsx";
export const FEELINGS = [
  {
    id: "low",
    label: "Low",
    color: "#d9c9ed",
    ink: "#45355f",
    line: "You don’t have to turn this into a good day.",
  },
  {
    id: "tired",
    label: "Tired",
    color: "#ecc3a6",
    ink: "#67452f",
    line: "It’s okay to leave a little room for rest.",
  },
  {
    id: "okay",
    label: "Okay",
    color: "#f5d98d",
    ink: "#665021",
    line: "Ordinary moments belong here, too.",
  },
  {
    id: "good",
    label: "Good",
    color: "#d9e794",
    ink: "#405224",
    line: "A little light. Take a moment to notice it.",
  },
  {
    id: "great",
    label: "Great",
    color: "#bfe1ce",
    ink: "#2c5846",
    line: "Let yourself enjoy this little pocket of good.",
  },
];
export const MOOD_TAGS = [
  "Work",
  "Rest",
  "Movement",
  "People",
  "Sleep",
  "Outdoors",
  "Creativity",
  "Learning",
  "Quiet time",
];
const key = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => key(),
  parse = (d) => new Date(d + "T12:00:00");
const offset = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return key(d);
};
const nice = (d) =>
  d === today()
    ? "Today"
    : parse(d).toLocaleDateString("en", { month: "short", day: "numeric" });
export function FeelingFace({ value = 2, small = false }) {
  const mouth = [91, 102, 113, 134, 146][value],
    eye = [15, 4, 10, 22, 8][value];
  return (
    <svg
      className={`feeling-face ${small ? "small" : ""}`}
      viewBox="0 0 200 170"
      aria-hidden="true"
    >
      <g className="face-eyes">
        <ellipse cx="63" cy="65" rx={value === 1 ? 24 : 22} ry={eye} />
        <ellipse cx="137" cy="65" rx={value === 1 ? 24 : 22} ry={eye} />
      </g>
      <path
        className="face-mouth"
        d={`M 72 119 C 85 ${mouth} 115 ${mouth} 128 119`}
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        style={{ d: `path("M 72 119 C 85 ${mouth} 115 ${mouth} 128 119")` }}
      />
      {value === 0 && (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M44 36l27-8M129 28l27 8" />
        </g>
      )}
      {value === 4 && (
        <g
          className="face-sparkles"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M15 94v14m-7-7h14M182 94v14m-7-7h14" />
        </g>
      )}
    </svg>
  );
}
function MoodTrends({ data, onEdit }) {
  const [range, setRange] = useState(7),
    [point, setPoint] = useState(null),
    [month, setMonth] = useState(
      () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    );
  const days = Array.from({ length: range }, (_, i) => offset(i - range + 1));
  const entries = days.filter((d) =>
    FEELINGS.some((f) => f.id === data.moods?.[d]),
  );
  const count = entries.length;
  const values = days.map((d) =>
    FEELINGS.findIndex((f) => f.id === data.moods?.[d]),
  );
  const x = (i) => 14 + (i * 292) / (range - 1),
    y = (v) => 128 - v * 25;
  const paths = [];
  let seg = [];
  values.forEach((v, i) => {
    if (v < 0) {
      if (seg.length > 1) paths.push(seg);
      seg = [];
    } else seg.push([x(i), y(v)]);
  });
  if (seg.length > 1) paths.push(seg);
  const totals = FEELINGS.map(
    (f) => entries.filter((d) => data.moods[d] === f.id).length,
  );
  const max = Math.max(...totals);
  const modes = totals.flatMap((n, i) => (n === max ? [FEELINGS[i]] : []));
  const typical = count ? (modes.length === 1 ? modes[0].label : "A mix") : "—";
  const tags = MOOD_TAGS.map((tag) => [
    tag,
    entries.filter((d) => data.moodDetails?.[d]?.tags?.includes(tag)).length,
  ])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  const chosen =
    point && days.includes(point) && data.moods?.[point]
      ? point
      : entries.at(-1);
  const f = FEELINGS.find((f) => f.id === data.moods?.[chosen]);
  const first = (month.getDay() + 6) % 7,
    monthDays = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0,
    ).getDate();
  const isCurrent =
    month.getFullYear() === new Date().getFullYear() &&
    month.getMonth() === new Date().getMonth();
  return (
    <>
      <section className="mood-trends">
        <div className="mood-section-head">
          <div>
            <span className="mood-overline">A LITTLE PERSPECTIVE</span>
            <h2>Your emotional weather.</h2>
          </div>
          <div className="mood-period" aria-label="Mood chart period">
            {[7, 30].map((n) => (
              <button
                key={n}
                aria-pressed={range === n}
                onClick={() => {
                  setRange(n);
                  setPoint(null);
                }}
              >
                {n}d
              </button>
            ))}
          </div>
        </div>
        <p>Every feeling is part of the picture.</p>
        <div className="mood-stats">
          <div>
            <b>
              {count}
              <small> / {range}</small>
            </b>
            <span>days checked in</span>
          </div>
          <div>
            <b>{typical}</b>
            <span>
              {typical === "A mix" ? "a range of feelings" : "most often felt"}
            </span>
          </div>
        </div>
        <div className="mood-plot">
          <div className="mood-axis">
            <span>Great</span>
            <span>Okay</span>
            <span>Low</span>
          </div>
          <svg
            viewBox="0 0 320 150"
            role="group"
            aria-label={`Mood over the last ${range} days. ${count ? entries.map((d) => `${nice(d)}: ${FEELINGS.find((f) => f.id === data.moods[d]).label}`).join("; ") : "No check-ins yet."}`}
          >
            <g className="mood-grid">
              {[28, 78, 128].map((v) => (
                <line key={v} x1="8" x2="312" y1={v} y2={v} />
              ))}
            </g>
            {paths.map((p, i) => (
              <path
                className="mood-trend-line"
                key={range + "-" + i}
                d={p.map(([a, b], j) => `${j ? "L" : "M"}${a},${b}`).join(" ")}
                fill="none"
                pathLength="1"
              />
            ))}
            {values.map(
              (v, i) =>
                v >= 0 && (
                  <g
                    key={days[i]}
                    className="mood-chart-point"
                    role="button"
                    tabIndex={0}
                    aria-label={`${nice(days[i])}: ${FEELINGS[v].label}`}
                    onClick={() => setPoint(days[i])}
                    onKeyDown={(e) => {
                      if (["Enter", " "].includes(e.key)) {
                        e.preventDefault();
                        setPoint(days[i]);
                      }
                    }}
                  >
                    <circle cx={x(i)} cy={y(v)} r="13" fill="transparent" />
                    <circle
                      cx={x(i)}
                      cy={y(v)}
                      r={chosen === days[i] ? 6 : 4.5}
                      fill={FEELINGS[v].ink}
                      stroke="#fffdf8"
                      strokeWidth="2"
                    />
                  </g>
                ),
            )}
          </svg>
        </div>
        <div className="mood-chart-dates">
          <span>{nice(days[0])}</span>
          <span>{range === 30 ? nice(days[14]) : nice(days[3])}</span>
          <span>Today</span>
        </div>
        {count ? (
          <div className="mood-point-detail" aria-live="polite">
            <span>
              <i style={{ background: f?.color }} />
              {nice(chosen)}
              <b>{f?.label}</b>
            </span>
            <button onClick={() => onEdit(chosen)}>
              View check-in
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="mood-no-data">
            <Sparkles size={19} />
            <div>
              <b>Your story starts with one check-in.</b>
              <p>No made-up history. Just a little space to begin.</p>
            </div>
          </div>
        )}
        <p className="mood-chart-note">
          Missing days stay empty. This is a reflection, not a score to beat.
        </p>
        {tags.length > 0 && (
          <div className="mood-context-summary">
            <span>Life alongside your feelings</span>
            <div>
              {tags.slice(0, 4).map(([tag, n]) => (
                <span key={tag}>
                  {tag}
                  <b>{n}</b>
                </span>
              ))}
            </div>
            <small>
              Tags you logged in this period, not causes or predictions.
            </small>
          </div>
        )}
      </section>
      <section className="mood-calendar">
        <div className="mood-section-head">
          <div>
            <span className="mood-overline">LITTLE MOMENTS, COLLECTED</span>
            <h2>Your month in color.</h2>
          </div>
          <Sun size={23} />
        </div>
        <div className="mood-calendar-nav">
          <button
            aria-label="Previous mood month"
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
            }
          >
            <ChevronLeft size={18} />
          </button>
          <b>
            {month.toLocaleDateString("en", { month: "long", year: "numeric" })}
          </b>
          <button
            aria-label="Next mood month"
            disabled={isCurrent}
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
            }
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="mood-calendar-grid">
          {"MTWTFSS".split("").map((s, i) => (
            <span key={"h" + i}>{s}</span>
          ))}
          {Array.from({ length: first }, (_, i) => (
            <i key={"blank" + i} />
          ))}
          {Array.from({ length: monthDays }, (_, i) => {
            const date = key(
                new Date(month.getFullYear(), month.getMonth(), i + 1),
              ),
              v = FEELINGS.find((f) => f.id === data.moods?.[date]);
            return (
              <button
                key={date}
                disabled={date > today()}
                onClick={() => onEdit(date)}
                aria-label={`${date}, ${v ? v.label : "no check-in"}`}
                className={date === today() ? "today" : ""}
                style={v ? { background: v.color, color: v.ink } : undefined}
              >
                {i + 1}
                {v && <i />}
              </button>
            );
          })}
        </div>
        <div className="mood-legend">
          {FEELINGS.map((f) => (
            <span key={f.id}>
              <i style={{ background: f.color }} />
              {f.label}
            </span>
          ))}
        </div>
        <p>Tap a day to revisit it, or fill in a moment you missed.</p>
      </section>
    </>
  );
}
export default function MoodSpace({ data, onMood }) {
  const [date, setDate] = useState(today),
    [value, setValue] = useState(() =>
      Math.max(
        0,
        FEELINGS.findIndex((f) => f.id === (data.moods?.[today()] || "okay")),
      ),
    ),
    [note, setNote] = useState(() => data.moodDetails?.[today()]?.note || ""),
    [tags, setTags] = useState(() => data.moodDetails?.[today()]?.tags || []),
    [step, setStep] = useState(0),
    [saved, setSaved] = useState(() => !!data.moods?.[today()]),
    [deleting, setDeleting] = useState(false);
  const panel = useRef(null),
    heading = useRef(null);
  const feeling = FEELINGS[value];
  const edit = (d) => {
    setDate(d);
    setValue(
      Math.max(
        0,
        FEELINGS.findIndex((f) => f.id === (data.moods?.[d] || "okay")),
      ),
    );
    setNote(data.moodDetails?.[d]?.note || "");
    setTags(data.moodDetails?.[d]?.tags || []);
    setStep(0);
    setSaved(false);
    setDeleting(false);
    requestAnimationFrame(() => {
      panel.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      heading.current?.focus({ preventScroll: true });
    });
  };
  const save = () => {
    if (date > today() || date < "1900-01-01") return;
    onMood({ mood: feeling.id, note: note.trim(), tags, at: Date.now() }, date);
    setSaved(true);
    setStep(0);
    setDeleting(false);
  };
  const swipe = useSwipe(
    () => {
      if (!saved) setStep(1);
    },
    () => {
      if (!saved) setStep(0);
    },
  );
  return (
    <div className="feeling-space">
      <section
        ref={panel}
        className={`mood-checkin ${saved ? "mood-is-saved" : ""}`}
        style={{ "--mood-color": feeling.color, "--mood-ink": feeling.ink }}
        aria-label="Your mood check-in"
      >
        <div className="mood-checkin-top">
          <span>
            <i />A MOMENT FOR YOU
          </span>
          <label className="mood-date-label">
            <span className="mood-date-display">
              {nice(date)}
              <ChevronDown size={13} />
            </span>
            <input
              type="date"
              aria-label="Check-in date"
              min="1900-01-01"
              max={today()}
              value={date}
              onChange={(e) => {
                if (
                  e.target.value &&
                  e.target.value <= today() &&
                  e.target.value >= "1900-01-01"
                )
                  edit(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="mood-slide" key={saved ? "saved" : step} {...swipe}>
          {saved ? (
            <div className="mood-saved">
              <span className="mood-saved-tick">
                <Check size={23} />
              </span>
              <h2 ref={heading} tabIndex={-1}>
                A moment, kept.
              </h2>
              <p>
                {nice(date)} felt <b>{feeling.label.toLowerCase()}.</b>
                <br />
                All of you belongs here.
              </p>
              <FeelingFace value={value} small />
              {note && <blockquote>“{note}”</blockquote>}
              {tags.length > 0 && (
                <div className="saved-mood-tags">
                  {tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
              <button className="mood-primary" onClick={() => setSaved(false)}>
                Edit this check-in
                <PenLine size={16} />
              </button>
              <small>Saved in this browser. One check-in per day.</small>
            </div>
          ) : step === 0 ? (
            <>
              <h2 ref={heading} tabIndex={-1}>
                How are you,
                <br />
                <em>really?</em>
              </h2>
              <p className="mood-opening">No right answer. Just your answer.</p>
              <FeelingFace value={value} />
              <div className="mood-value" key={value} aria-live="polite">
                {feeling.label}
                <span>{feeling.line}</span>
              </div>
              <label className="sr-only" htmlFor="feeling-slider">
                How are you feeling?
              </label>
              <input
                id="feeling-slider"
                className="feeling-slider"
                type="range"
                min="0"
                max="4"
                step="1"
                value={value}
                aria-valuetext={feeling.label}
                onChange={(e) => setValue(Number(e.target.value))}
              />
              <div className="mood-scale-labels">
                {FEELINGS.map((f, i) => (
                  <button
                    key={f.id}
                    aria-pressed={i === value}
                    onClick={() => setValue(i)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="mood-checkin-actions">
                <button onClick={() => setStep(1)}>
                  <Plus size={16} />
                  Add context
                </button>
                <button className="mood-primary" onClick={save}>
                  Save check-in
                  <ArrowRight size={17} />
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="mood-step-back" onClick={() => setStep(0)}>
                <ArrowLeft size={16} />
                Your feeling
              </button>
              <div className="mood-context-title">
                <div>
                  <h2>
                    A little
                    <br />
                    <em>more of the story.</em>
                  </h2>
                  <p>What’s been part of your day? All optional.</p>
                </div>
                <FeelingFace value={value} small />
              </div>
              <div className="mood-tags" aria-label="Today's context">
                {MOOD_TAGS.map((t) => (
                  <button
                    key={t}
                    aria-pressed={tags.includes(t)}
                    onClick={() =>
                      setTags((prev) =>
                        prev.includes(t)
                          ? prev.filter((x) => x !== t)
                          : [...prev, t],
                      )
                    }
                  >
                    {tags.includes(t) && <Check size={13} />} {t}
                  </button>
                ))}
              </div>
              <label className="mood-note-label" htmlFor="mood-note">
                Anything you’d like to remember?
              </label>
              <textarea
                id="mood-note"
                maxLength={1000}
                rows={3}
                placeholder="A little win, a heavy moment, anything at all…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <span className="mood-note-count">
                {note.length}/1000 · Just for you
              </span>
              <button className="mood-primary mood-save-wide" onClick={save}>
                Keep this little moment
                <ArrowRight size={17} />
              </button>
            </>
          )}
        </div>
        {!saved && (
          <div className="mood-step-dots" aria-label="Check-in steps">
            <button
              aria-label="Feeling step"
              aria-current={step === 0 ? "step" : undefined}
              onClick={() => setStep(0)}
            />
            <button
              aria-label="Context step"
              aria-current={step === 1 ? "step" : undefined}
              onClick={() => setStep(1)}
            />
          </div>
        )}
        {data.moods?.[date] && (
          <div className="mood-remove">
            {deleting ? (
              <>
                <span>Remove this check-in?</span>
                <button
                  onClick={() => {
                    onMood(null, date);
                    setSaved(false);
                    setDeleting(false);
                    setNote("");
                    setTags([]);
                  }}
                >
                  Remove
                </button>
                <button onClick={() => setDeleting(false)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setDeleting(true)}>
                <Trash2 size={12} />
                Remove check-in
              </button>
            )}
          </div>
        )}
      </section>
      <MoodTrends data={data} onEdit={edit} />
    </div>
  );
}
