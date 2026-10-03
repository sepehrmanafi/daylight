// The welcome story lives in one place so its language and palette stay easy to tune.
export const INTRO_STORAGE_KEY = "daylight.intro.completed.v1";

export const INTRO_COPY = {
  brand: "daylight",
  brandDot: ".",
  skip: "Skip",
  back: "Back",
  next: "Next",
  start: "Get Started",
  progressLabel: "Intro progress",
  slideLabel: "Intro slide",
  keyboardHint: "Use the arrow keys to move between slides.",
  introLabel: "Daylight introduction",
  welcomeLabel: "Welcome to Daylight",
};

export const INTRO_SLIDES = [
  {
    id: "clear",
    eyebrow: "A CALMER START",
    title: "Clear the mental clutter",
    description:
      "Capture each thought in one calm place, and make room for the moment.",
    illustration: "capture",
    background: "#f4e7c9",
    blob: "#e2c285",
    blobAlt: "#fbf3e2",
    artInk: "#303b2d",
    muted: "#5c604f",
    artSurface: "#fffdf6",
    accent: "#d39e4e",
    accentSoft: "#9fb483",
  },
  {
    id: "focus",
    eyebrow: "A LITTLE MORE FOCUS",
    title: "Make today feel doable",
    description:
      "Choose one clear next step, then give it your full attention.",
    illustration: "focus",
    background: "#dfead8",
    blob: "#b9d09e",
    blobAlt: "#f3f7ec",
    artInk: "#2d3b30",
    muted: "#50614f",
    artSurface: "#fffef8",
    accent: "#769365",
    accentSoft: "#e1b86b",
  },
  {
    id: "progress",
    eyebrow: "ROOM TO KEEP GOING",
    title: "See your progress grow",
    description:
      "Small wins add up to a day that feels steady, clear, and yours.",
    illustration: "progress",
    background: "#e9dff0",
    blob: "#cdb9df",
    blobAlt: "#faf5fc",
    artInk: "#3e3345",
    muted: "#63536b",
    artSurface: "#fffaff",
    accent: "#9575b5",
    accentSoft: "#dfac75",
  },
];
