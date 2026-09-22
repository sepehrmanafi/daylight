import React, { useRef, useState } from "react";
import {
  Sun,
  ArrowRight,
  ArrowLeft,
  Check,
  BriefcaseBusiness,
  Heart,
  Sparkles,
  ShieldCheck,
  Timer,
  Target,
} from "lucide-react";
const image = (n) => `${import.meta.env.BASE_URL}images/${n}.jpg`;
export function useSwipe(onNext, onBack) {
  const start = useRef(null);
  return {
    onPointerDown: (e) => {
      if (e.target.closest("input,textarea,select,button,a")) return;
      start.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: (e) => {
      const p = start.current;
      start.current = null;
      if (!p) return;
      const x = e.clientX - p.x,
        y = e.clientY - p.y;
      if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.4)
        (x < 0 ? onNext : onBack)();
    },
    onPointerCancel: () => {
      start.current = null;
    },
  };
}
const stories = [
  {
    kicker: "LESS BUSY. MORE YOU.",
    title: (
      <>
        A little clarity.
        <br />
        <em>A lot more possibility.</em>
      </>
    ),
    copy: "Your big plans and everyday little things. Together, in a space that feels like you.",
    art: "onboard-momentum",
    color: "#f6c588",
  },
  {
    kicker: "ROOM FOR EVERY SIDE OF YOU.",
    title: (
      <>
        Make space for
        <br />
        <em>what lights you up.</em>
      </>
    ),
    copy: "Work, wellbeing, wild ideas. Give the things you care about a little room to grow.",
    art: "onboard-space",
    color: "#efc5d8",
  },
  {
    kicker: "SMALL STEPS. YOUR PACE.",
    title: (
      <>
        Less pressure.
        <br />
        <em>A little more flow.</em>
      </>
    ),
    copy: "A realistic day feels better than a perfect plan. Let’s find a rhythm that fits yours.",
    art: "focus-sculpture",
    color: "#d2c3ec",
  },
  {
    kicker: "A FRESH LITTLE START.",
    title: (
      <>
        Your day.
        <br />
        <em>Made a little brighter.</em>
      </>
    ),
    copy: "A space for progress, pauses, and everything in between. Make yourself at home.",
    art: "mindful-morning",
    color: "#e1e7c8",
  },
];
export default function SetupJourney({
  initialProfile,
  areas,
  themes,
  onFinish,
}) {
  const [p, setP] = useState(initialProfile),
    [step, setStep] = useState(0),
    [direction, setDirection] = useState(1);
  const [furthest, setFurthest] = useState(0);
  const heading = useRef(null);
  const upd = (key, value) => setP((prev) => ({ ...prev, [key]: value }));
  const change = (n) => {
    n = Math.max(0, Math.min(3, n));
    if (n > 1 && !p.areas.length) n = 1;
    if (n === step || (n > step && step === 1 && !p.areas.length)) return;
    setDirection(n > step ? 1 : -1);
    setStep(n);
    setFurthest((v) => Math.max(v, n));
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      heading.current?.focus({ preventScroll: true });
    });
  };
  const next = () => {
    if (step < 3) change(step + 1);
    else
      onFinish({
        ...p,
        name: p.name.trim() || "friend",
        routine: p.routine || "Anytime",
      });
  };
  const swipe = useSwipe(
    () => {
      if (step < 3) change(step + 1);
    },
    () => change(step - 1),
  );
  const story = stories[step];
  return (
    <div
      className="setup-journey"
      style={{ "--story-color": story.color, "--journey-dir": direction }}
    >
      <header className="journey-header">
        <div className="journey-brand">
          <Sun size={24} />
          daylight<span>.</span>
        </div>
        <button
          className="journey-skip"
          onClick={() =>
            onFinish({
              ...p,
              name: p.name.trim() || "friend",
              areas: p.areas.length ? p.areas : initialProfile.areas,
              routine: p.routine || "Anytime",
            })
          }
        >
          Use these defaults <ArrowRight size={14} />
        </button>
      </header>
      <main
        className="journey-stage"
        aria-roledescription="carousel"
        aria-label="Make Daylight yours"
        onKeyDown={(e) => {
          if (e.target.closest("button,input,textarea,select")) return;
          if (e.key === "ArrowRight") {
            e.preventDefault();
            if (step < 3) change(step + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            change(step - 1);
          }
        }}
        {...swipe}
      >
        <div
          className="journey-slide"
          key={step}
          role="group"
          aria-roledescription="slide"
          aria-label={`Step ${step + 1} of 4`}
        >
          <section className="journey-poster">
            <div className="journey-art">
              <img
                src={image(story.art)}
                className={step < 2 ? "journey-cutout" : ""}
                draggable={false}
                alt={
                  step === 0
                    ? "An illustrated person making space for a new idea"
                    : step === 1
                      ? "An illustrated person reflecting in a colorful armchair"
                      : step === 2
                        ? "Playful balancing shapes"
                        : "A sunlit path through gentle green hills"
                }
              />
              <span className="journey-orbit">
                <Sparkles size={23} />
              </span>
            </div>
            <div className="journey-story">
              <span>{story.kicker}</span>
              <h2>{story.title}</h2>
              <p>{story.copy}</p>
            </div>
            <span className="poster-index">
              0{step + 1}
              <i> / 04</i>
            </span>
          </section>
          <section className="journey-questions">
            <div className="journey-question-heading">
              <span className="journey-eyebrow">
                MAKE IT YOURS · 0{step + 1} / 04
              </span>
              <h1 ref={heading} tabIndex={-1}>
                {
                  [
                    "What brings you here?",
                    "What matters to you?",
                    "What feels manageable?",
                    "Ready for a fresh start?",
                  ][step]
                }
              </h1>
              <p>
                {
                  [
                    "A few small choices. A space that’s actually yours.",
                    "Pick your life areas. We’ll make them your first projects.",
                    "No perfect streaks required. You can change this anytime.",
                    "A little preview of your very own Daylight.",
                  ][step]
                }
              </p>
            </div>
            {step === 0 && (
              <>
                <label htmlFor="journey-name">What should we call you?</label>
                <input
                  id="journey-name"
                  className="journey-name"
                  placeholder="Your first name"
                  maxLength={35}
                  value={p.name}
                  onChange={(e) => upd("name", e.target.value)}
                  autoComplete="given-name"
                />
                <fieldset>
                  <legend>What brings you to Daylight?</legend>
                  <div className="journey-purpose">
                    {[
                      ["Work & projects", BriefcaseBusiness],
                      ["Everyday life", Heart],
                      ["A little of both", Sparkles],
                    ].map(([name, Icon]) => (
                      <button
                        key={name}
                        className={p.purpose === name ? "selected" : ""}
                        aria-pressed={p.purpose === name}
                        onClick={() =>
                          setP((prev) => ({
                            ...prev,
                            purpose: name,
                            areas:
                              name === "Work & projects"
                                ? ["Work", "Learning", "Creative"]
                                : name === "Everyday life"
                                  ? ["Personal", "Wellbeing", "Travel"]
                                  : initialProfile.areas,
                          }))
                        }
                      >
                        <Icon size={19} />
                        <span>{name}</span>
                        <i>{p.purpose === name && <Check size={13} />}</i>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <p className="journey-helper">
                  <Sparkles size={14} />
                  Your answer shapes your suggested projects.
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <div className="journey-areas">
                  {areas.map((a) => (
                    <button
                      key={a.name}
                      className={`area-choice ${p.areas.includes(a.name) ? "selected" : ""}`}
                      aria-pressed={p.areas.includes(a.name)}
                      onClick={() =>
                        upd(
                          "areas",
                          p.areas.includes(a.name)
                            ? p.areas.filter((x) => x !== a.name)
                            : [...p.areas, a.name],
                        )
                      }
                    >
                      <a.icon size={22} />
                      <b>{a.name}</b>
                      <small>{a.desc}</small>
                      <i>{p.areas.includes(a.name) && <Check size={12} />}</i>
                    </button>
                  ))}
                </div>
                <p className="journey-helper" aria-live="polite">
                  {p.areas.length
                    ? `${p.areas.length} spaces to make your own.`
                    : "Choose at least one space to continue."}
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <fieldset>
                  <legend>What feels like a good daily task goal?</legend>
                  <div className="journey-choice-row">
                    {[
                      [3, "Easy does it"],
                      [5, "A steady flow"],
                      [8, "Feeling ambitious"],
                    ].map(([n, s]) => (
                      <button
                        key={n}
                        aria-pressed={p.goal === n}
                        className={p.goal === n ? "selected" : ""}
                        onClick={() => upd("goal", n)}
                      >
                        <strong>
                          {n}
                          <small> tasks</small>
                        </strong>
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>How much time can you give one thing?</legend>
                  <div className="journey-choice-row">
                    {[
                      [15, "A quick reset"],
                      [25, "A little focus"],
                      [50, "Deep work"],
                    ].map(([n, s]) => (
                      <button
                        key={n}
                        aria-pressed={p.focus === n}
                        className={p.focus === n ? "selected" : ""}
                        onClick={() => upd("focus", n)}
                      >
                        <strong>
                          {n}
                          <small> min</small>
                        </strong>
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>When does a little focus fit your day?</legend>
                  <div className="journey-routine">
                    {["Morning", "Afternoon", "Evening", "Anytime"].map((r) => (
                      <button
                        key={r}
                        aria-pressed={(p.routine || "Anytime") === r}
                        className={
                          (p.routine || "Anytime") === r ? "selected" : ""
                        }
                        onClick={() => upd("routine", r)}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <p className="journey-helper">
                  A gentle cue on Home, not a notification.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <fieldset>
                  <legend>Choose your everyday palette</legend>
                  <div className="journey-palettes">
                    {Object.entries(themes).map(([id, t]) => (
                      <button
                        key={id}
                        style={{ "--swatch": t.color }}
                        aria-pressed={p.theme === id}
                        className={p.theme === id ? "selected" : ""}
                        onClick={() => upd("theme", id)}
                      >
                        <i>{p.theme === id && <Check size={17} />}</i>
                        <span>
                          {t.name}
                          <small>{t.desc}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="journey-recap">
                  <span>
                    <Target size={18} />
                    <b>{p.goal}</b> daily little wins
                  </span>
                  <span>
                    <Timer size={18} />
                    <b>{p.focus}</b> minutes to focus
                  </span>
                  <span>
                    <Sun size={18} />
                    <b>{p.routine || "Anytime"}</b> is your time
                  </span>
                </div>
                <label className="journey-examples">
                  <input
                    type="checkbox"
                    checked={p.examples}
                    onChange={(e) => upd("examples", e.target.checked)}
                  />
                  <span>
                    Start with a little inspiration
                    <small>
                      Add editable sample tasks and everyday rituals.
                    </small>
                  </span>
                </label>
                <p className="journey-helper">
                  <ShieldCheck size={14} />
                  No account. Your workspace stays in this browser.
                </p>
              </>
            )}
          </section>
        </div>
      </main>
      <footer className="journey-footer">
        <button
          className="journey-back"
          onClick={() => change(step - 1)}
          disabled={step === 0}
          aria-label="Previous onboarding slide"
        >
          <ArrowLeft size={21} />
        </button>
        <div className="journey-dots" aria-label="Onboarding progress">
          {stories.map((_, i) => (
            <button
              key={i}
              disabled={i > furthest}
              aria-label={`Go to onboarding step ${i + 1}`}
              aria-current={step === i ? "step" : undefined}
              onClick={() => change(i)}
            >
              <i />
            </button>
          ))}
        </div>
        <button
          className="journey-next"
          disabled={step === 1 && !p.areas.length}
          onClick={next}
        >
          {step === 3 ? "Let the good days begin" : "Continue"}
          <ArrowRight size={19} />
        </button>
      </footer>
    </div>
  );
}
