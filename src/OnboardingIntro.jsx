import React, { useState } from "react";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import {
  IntroScene1,
  IntroScene2,
  IntroScene3,
  IntroScene4,
} from "./OnboardingIllustrations.jsx";

const INTRO_SLIDES = [
  {
    stepBadge: "Step 1",
    kicker: "WELCOME TO DAYLIGHT",
    title: "A calm space for your biggest ideas.",
    description: "Quiet the noise. Organize your life, creative projects, and daily tasks in one tranquil space.",
    scene: <IntroScene1 />,
    themeColor: "#f6c588",
    bgClass: "intro-slide-warm",
  },
  {
    stepBadge: "Step 2",
    kicker: "STREAMLINED WORKFLOW",
    title: "Focus on what truly matters.",
    description: "Break down ambitious visions into gentle, bite-sized daily rituals without feeling overwhelmed.",
    scene: <IntroScene2 />,
    themeColor: "#9ec5f7",
    bgClass: "intro-slide-blue",
  },
  {
    stepBadge: "Step 3",
    kicker: "DEEP WORK WITHOUT LIMITS",
    title: "Enter flow on your own terms.",
    description: "An open-ended, tranquil focus environment designed to foster genuine creative momentum.",
    scene: <IntroScene3 />,
    themeColor: "#f6a8cb",
    bgClass: "intro-slide-pink",
  },
  {
    stepBadge: "Step 4",
    kicker: "YOUR SANCTUARY",
    title: "Work with clarity, anywhere.",
    description: "Zero intrusive trackers or noisy alerts. Just you, your day, and room for possibility.",
    scene: <IntroScene4 />,
    themeColor: "#f8cf62",
    bgClass: "intro-slide-golden",
  },
];

export default function OnboardingIntro({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < INTRO_SLIDES.length - 1) {
      setCurrentSlide((c) => c + 1);
    } else {
      onComplete();
    }
  };

  const slide = INTRO_SLIDES[currentSlide];

  return (
    <div className={`onboarding-intro-shell ${slide.bgClass}`} role="region" aria-label="Daylight App Introduction">
      {/* Top utility bar */}
      <header className="intro-topbar">
        <div className="intro-greeting">
          <Sparkles size={16} />
          <span>Hello & Welcome</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            type="button"
            className="intro-skip-button"
            onClick={onComplete}
            aria-label="Continue"
          >
            Continue <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
          </button>
        </div>
      </header>

      {/* Main card presentation */}
      <main className="intro-card-body">
        {/* Visual vector artwork scene */}
        <div className="intro-scene-wrapper">
          {slide.scene}
        </div>

        {/* Text and story presentation */}
        <div className="intro-content-wrapper">
          <span className="intro-step-pill">{slide.stepBadge}</span>
          <h1 className="intro-headline">{slide.title}</h1>
          <p className="intro-description">{slide.description}</p>
        </div>

        {/* Navigation action bar */}
        <div className="intro-actions-bar">
          {/* Progress dots */}
          <div className="intro-dots" aria-label="Introduction progress">
            {INTRO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`intro-dot ${idx === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Forward primary circle button */}
          <button
            type="button"
            className="intro-next-btn"
            onClick={handleNext}
            aria-label={currentSlide === INTRO_SLIDES.length - 1 ? "Start questionnaire" : "Next introduction screen"}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </main>
    </div>
  );
}
