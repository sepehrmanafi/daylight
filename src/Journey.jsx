import React, { useRef, useState, useEffect } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  Check,
  BriefcaseBusiness,
  Heart,
  Sparkles,
  ShieldCheck,
  Timer,
  Target,
  ChevronRight,
} from "lucide-react";
import { themeVars, useThemeChrome } from "./themes.js";
import ThemePreview from "./ThemePreview.jsx";
import InteractiveSlider from "./InteractiveSlider.jsx";
import {
  IllustrationStep1,
  IllustrationStep2,
  IllustrationStep3,
  IllustrationStep4,
} from "./OnboardingIllustrations.jsx";
import { useSwipe } from "./useSwipe.js";

const stories = [
  {
    kicker: "WELCOME TO DAYLIGHT · STEP 1",
    title: (
      <>
        A calm space for
        <br />
        <em>your biggest ideas.</em>
      </>
    ),
    copy: "Quiet the noise. Organize your life, creative projects, and daily tasks in one tranquil space.",
    art: "onboard-momentum",
    color: "#f6c588",
  },
  {
    kicker: "STREAMLINED WORKFLOW · STEP 2",
    title: (
      <>
        Focus on what
        <br />
        <em>truly matters.</em>
      </>
    ),
    copy: "Break down ambitious visions into gentle, bite-sized daily rituals without feeling overwhelmed.",
    art: "onboard-space",
    color: "#efc5d8",
  },
  {
    kicker: "DEEP WORK WITHOUT LIMITS · STEP 3",
    title: (
      <>
        Enter flow on
        <br />
        <em>your own terms.</em>
      </>
    ),
    copy: "An open-ended, tranquil focus environment designed to foster genuine creative momentum.",
    art: "focus-sculpture",
    color: "#d2c3ec",
  },
  {
    kicker: "YOUR SANCTUARY · STEP 4",
    title: (
      <>
        Work with clarity,
        <br />
        <em>anywhere.</em>
      </>
    ),
    copy: "Zero intrusive trackers or noisy alerts. Just you, your day, and room for possibility.",
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
  useThemeChrome(step === 3 ? p.theme : "sunshine");

  return (
    <div
      className={`setup-journey ${step === 3 ? "is-palette-step" : ""}`}
      data-theme={step === 3 ? p.theme : undefined}
      style={{
        ...themeVars(p.theme),
        "--story-color": step === 3 ? themes[p.theme].tokens.hero : story.color,
        "--journey-dir": direction,
      }}
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
          {/* Animated Onboarding Poster with bespoke illustrations */}
          <section className="journey-poster">
            <div className="journey-art">
              {step === 0 ? (
                <IllustrationStep1 />
              ) : step === 1 ? (
                <IllustrationStep2 />
              ) : step === 2 ? (
                <IllustrationStep3 />
              ) : step === 3 && p.theme === "midnight" ? (
                <div
                  className="night-illustration"
                  aria-label="A quiet moonlit sky"
                >
                  <Moon size={115} strokeWidth={0.9} />
                  <i />
                  <i />
                  <i />
                  <i />
                  <span>A little calm. A softer glow.</span>
                </div>
              ) : (
                <IllustrationStep4 />
              )}
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

          {/* Onboarding-style Questions Flow */}
          <section className="journey-questions">
            <div className="journey-question-heading">
              <span className="journey-eyebrow">
                MAKE IT YOURS · 0{step + 1} / 04
              </span>
              <h1 ref={heading} tabIndex={-1}>
                {
                  [
                    "What should we call you?",
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
                    "A realistic pace feels better than an impossible plan.",
                    "Every space in Daylight begins right here.",
                  ][step]
                }
              </p>
            </div>

            {step === 0 && (
              <>
                <div className="journey-field">
                  <label htmlFor="name-input">What should we call you?</label>
                  <input
                    id="name-input"
                    value={p.name}
                    placeholder="Your name or nickname"
                    maxLength={28}
                    onChange={(e) => upd("name", e.target.value)}
                    autoFocus
                  />
                </div>
                <fieldset>
                  <legend>What brings you to Daylight?</legend>
                  <div className="journey-purposes">
                    {[
                      {
                        name: "Everyday life",
                        desc: "Small steps, gentle habits, less mental clutter.",
                        icon: Heart,
                      },
                      {
                        name: "Work & projects",
                        desc: "Big ideas, milestones, deep quiet focus.",
                        icon: BriefcaseBusiness,
                      },
                      {
                        name: "Everything together",
                        desc: "A calm blend of work, home, and mindful moments.",
                        icon: Sparkles,
                      },
                    ].map(({ name, desc, icon: Icon }) => (
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
                  <legend className="sr-only">What feels like a good daily task goal?</legend>
                  <InteractiveSlider
                    label="Daily little wins goal"
                    value={p.goal}
                    unit="tasks"
                    ariaLabel="Daily task goal slider"
                    onChange={(val) => upd("goal", val)}
                    options={[
                      { value: 3, desc: "Easy does it" },
                      { value: 5, desc: "A steady flow" },
                      { value: 8, desc: "Feeling ambitious" },
                    ]}
                  />
                </fieldset>

                {/* Starting rhythm selector: unconstrained, open-ended focus mode */}
                <fieldset>
                  <legend className="sr-only">Optional starting rhythm (can be adjusted anytime)</legend>
                  <InteractiveSlider
                    label="Starting focus rhythm"
                    value={p.focus || 25}
                    unit="min"
                    ariaLabel="Focus duration slider"
                    onChange={(val) => upd("focus", val)}
                    options={[
                      { value: 15, desc: "A quick reset" },
                      { value: 25, desc: "A little focus" },
                      { value: 50, desc: "Deep work" },
                    ]}
                  />
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
                  A gentle cue on Home, not a notification. Focus is open-ended whenever you start.
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
                        style={{
                          "--swatch": t.mode === "dark" ? "#242938" : t.color,
                        }}
                        data-theme-option={id}
                        aria-pressed={p.theme === id}
                        className={p.theme === id ? "selected" : ""}
                        onClick={() => upd("theme", id)}
                      >
                        <i>
                          {p.theme === id ? (
                            <Check size={17} />
                          ) : t.mode === "dark" ? (
                            <Moon size={17} />
                          ) : null}
                        </i>
                        <span>
                          {t.name}
                          <small>{t.desc}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                <ThemePreview value={p.theme} />
                <div className="journey-recap">
                  <span>
                    <Target size={18} />
                    <b>{p.goal}</b> daily little wins
                  </span>
                  <span>
                    <Timer size={18} />
                    <b>Open-ended</b> focus mode
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
