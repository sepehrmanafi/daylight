import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Sun } from "lucide-react";
import { trackEvent } from "./analytics.js";
import { INTRO_COPY, INTRO_SLIDES } from "./introConfig.js";
import { INTRO_ILLUSTRATIONS } from "./IntroIllustrations.jsx";
import "./intro.css";

function clampSlide(index) {
  return Math.max(0, Math.min(INTRO_SLIDES.length - 1, index));
}

export default function IntroSlider({ onComplete, onCommit }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const headingRef = useRef(null);
  const pointerRef = useRef(null);
  const completeTimer = useRef(null);
  const completionStarted = useRef(false);
  const introViewed = useRef(false);
  const lastTrackedSlide = useRef(null);

  const slide = INTRO_SLIDES[currentSlide];
  const isLast = currentSlide === INTRO_SLIDES.length - 1;
  const Illustration = INTRO_ILLUSTRATIONS[slide.illustration];

  useEffect(() => {
    if (!introViewed.current) {
      introViewed.current = true;
      trackEvent("intro_viewed");
    }
  }, []);

  useEffect(() => {
    if (lastTrackedSlide.current === currentSlide) return;
    lastTrackedSlide.current = currentSlide;
    trackEvent("slide_viewed", { index: currentSlide });
  }, [currentSlide]);

  useEffect(() => {
    const previousActive = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousColorScheme = document.documentElement.style.colorScheme;
    document.body.style.overflow = "hidden";
    document.documentElement.style.colorScheme = "light";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.colorScheme = previousColorScheme;
      if (previousActive && typeof previousActive.focus === "function") {
        previousActive.focus({ preventScroll: true });
      }
      window.clearTimeout(completeTimer.current);
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [currentSlide]);

  const goTo = useCallback(
    (nextIndex) => {
      if (leaving) return;
      const next = clampSlide(nextIndex);
      if (next === currentSlide) return;
      setDirection(next > currentSlide ? 1 : -1);
      setCurrentSlide(next);
      setDragX(0);
    },
    [currentSlide, leaving],
  );

  const finish = useCallback(
    (reason) => {
      if (completionStarted.current) return;
      completionStarted.current = true;
      if (reason === "skipped") {
        trackEvent("intro_skipped", { index: currentSlide });
      } else {
        trackEvent("intro_completed", { index: currentSlide });
      }
      onCommit?.({ reason, index: currentSlide });
      setLeaving(true);
      completeTimer.current = window.setTimeout(() => {
        onComplete({ reason, index: currentSlide });
      }, 340);
    },
    [currentSlide, onComplete, onCommit],
  );

  const next = useCallback(() => {
    if (isLast) finish("completed");
    else goTo(currentSlide + 1);
  }, [currentSlide, finish, goTo, isLast]);

  const back = useCallback(() => goTo(currentSlide - 1), [currentSlide, goTo]);

  const handleKeyDown = (event) => {
    if (leaving) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      back();
    } else if (event.key === "Escape") {
      event.preventDefault();
      finish("skipped");
    } else if (event.key === "Enter" && !event.target.closest("button,a")) {
      event.preventDefault();
      next();
    }
  };

  const handlePointerDown = (event) => {
    if (leaving || event.button !== 0 || event.target.closest("button,a")) {
      return;
    }
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {
      // Synthetic pointer events in automated tests may not have an active pointer.
    }
  };

  const handlePointerMove = (event) => {
    const start = pointerRef.current;
    if (!start || start.id !== event.pointerId) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) > Math.abs(y) * 0.75) setDragX(x);
  };

  const handlePointerUp = (event) => {
    const start = pointerRef.current;
    pointerRef.current = null;
    if (!start || start.id !== event.pointerId) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    setDragX(0);
    if (Math.abs(x) > 56 && Math.abs(x) > Math.abs(y) * 1.25) {
      if (x < 0) next();
      else back();
    }
  };

  const handlePointerCancel = () => {
    pointerRef.current = null;
    setDragX(0);
  };

  return (
    <div
      className={`intro-slider ${leaving ? "is-leaving" : ""}`}
      style={{
        "--intro-bg": slide.background,
        "--intro-blob": slide.blob,
        "--intro-blob-alt": slide.blobAlt,
        "--intro-art-ink": slide.artInk,
        "--intro-muted": slide.muted,
        "--intro-art-surface": slide.artSurface,
        "--intro-accent": slide.accent,
        "--intro-accent-soft": slide.accentSoft,
        "--intro-drag-x": `${dragX}px`,
        "--intro-direction": direction,
      }}
      tabIndex={-1}
      role="region"
      onKeyDown={handleKeyDown}
      aria-label={INTRO_COPY.introLabel}
    >
      <header className="intro-header">
        <div className="intro-brand">
          <Sun size={28} strokeWidth={1.8} aria-hidden="true" />
          <span>
            {INTRO_COPY.brand}
            <i>{INTRO_COPY.brandDot}</i>
          </span>
        </div>
        <button
          className="intro-skip"
          type="button"
          onClick={() => finish("skipped")}
          disabled={leaving}
        >
          {INTRO_COPY.skip}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </header>

      <main
        className="intro-main"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        aria-roledescription="carousel"
        aria-label={INTRO_COPY.welcomeLabel}
      >
        <div
          className="intro-visual-parallax"
          aria-hidden="true"
          style={{ transform: `translate3d(${dragX * 0.06}px, 0, 0)` }}
        >
          <span className="intro-visual-blob intro-visual-blob--one" />
          <span
            className="intro-visual-blob intro-visual-blob--two"
            style={{ transform: `translate3d(${dragX * -0.04}px, 0, 0)` }}
          />
          <div
            className="intro-slide-art"
            key={slide.id}
            style={{ transform: `translate3d(${dragX * 0.1}px, 0, 0)` }}
          >
            <Illustration />
          </div>
        </div>

        <section
          className="intro-slide-copy"
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${INTRO_COPY.slideLabel} ${currentSlide + 1} of ${INTRO_SLIDES.length}`}
          style={{ transform: `translate3d(${dragX * -0.025}px, 0, 0)` }}
        >
          <p className="intro-eyebrow">
            <Sparkles size={15} aria-hidden="true" />
            {slide.eyebrow}
          </p>
          <h1 ref={headingRef} tabIndex={-1}>
            {slide.title}
          </h1>
          <p className="intro-description">{slide.description}</p>
        </section>
      </main>

      <p className="intro-announcer" aria-live="polite" aria-atomic="true">
        {slide.title}. {slide.description}
      </p>

      <footer className="intro-footer">
        <button
          className="intro-back"
          type="button"
          onClick={back}
          disabled={currentSlide === 0 || leaving}
          aria-label={INTRO_COPY.back}
        >
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <nav className="intro-dots" aria-label={INTRO_COPY.progressLabel}>
          {INTRO_SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === currentSlide ? "is-active" : ""}
              aria-label={`${INTRO_COPY.slideLabel} ${index + 1} of ${INTRO_SLIDES.length}`}
              aria-current={index === currentSlide ? "step" : undefined}
              onClick={() => goTo(index)}
              disabled={leaving}
            >
              <i aria-hidden="true" />
            </button>
          ))}
        </nav>
        <button
          className="intro-primary"
          type="button"
          onClick={next}
          disabled={leaving}
          aria-label={isLast ? INTRO_COPY.start : INTRO_COPY.next}
        >
          <span key={isLast ? "start" : "next"}>
            {isLast ? INTRO_COPY.start : INTRO_COPY.next}
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </footer>
      <span className="sr-only">{INTRO_COPY.keyboardHint}</span>
    </div>
  );
}
