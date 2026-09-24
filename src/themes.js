import { useEffect } from "react";
// One palette controls the entire interface. Mood/project colors retain their meaning.
export const THEMES = {
  sunshine: {
    name: "Sunshine",
    color: "#f7df83",
    desc: "A little brighter",
    mode: "light",
    tokens: {
      bg: "#fff9ed",
      surface: "#fffdf7",
      raised: "#fff1d1",
      sidebar: "#f7ecd2",
      line: "#e7d9b7",
      text: "#353125",
      muted: "#706149",
      accent: "#e9bb45",
      strong: "#78540e",
      accentInk: "#392c10",
      selected: "#f4d46d",
      hero: "#f7d87c",
      heroInk: "#3e3218",
      heroMuted: "#65532b",
      cardA: "#ffe3a4",
      cardB: "#f0d6b9",
      soft: "#f3ecd9",
      button: "#645023",
      buttonInk: "#fffdf7",
      danger: "#964634",
    },
  },
  blossom: {
    name: "Blossom",
    color: "#efc7de",
    desc: "Soft & expressive",
    mode: "light",
    tokens: {
      bg: "#fcf1f7",
      surface: "#fff8fc",
      raised: "#f5deed",
      sidebar: "#f6e2ee",
      line: "#e5c8d9",
      text: "#432b3b",
      muted: "#79516c",
      accent: "#e8acce",
      strong: "#894269",
      accentInk: "#43233a",
      selected: "#eabbd7",
      hero: "#eab9d9",
      heroInk: "#44283a",
      heroMuted: "#694456",
      cardA: "#f2c9dd",
      cardB: "#dccced",
      soft: "#f3e3ef",
      button: "#743c61",
      buttonInk: "#fff8fc",
      danger: "#9a3f45",
    },
  },
  sage: {
    name: "Sage",
    color: "#d7dfbb",
    desc: "Room to breathe",
    mode: "light",
    tokens: {
      bg: "#eef5e9",
      surface: "#f9fcf6",
      raised: "#e1ecd6",
      sidebar: "#e0ebd8",
      line: "#cbdac0",
      text: "#2d3f2b",
      muted: "#586d4e",
      accent: "#b5d395",
      strong: "#456a35",
      accentInk: "#233c21",
      selected: "#b9d9a0",
      hero: "#c0d7a4",
      heroInk: "#2e4026",
      heroMuted: "#495c40",
      cardA: "#caddb3",
      cardB: "#d9dfb5",
      soft: "#e4eddc",
      button: "#3f5d36",
      buttonInk: "#f9fcf6",
      danger: "#944637",
    },
  },
  midnight: {
    name: "Midnight",
    color: "#c4b5ed",
    desc: "Dark & restful",
    mode: "dark",
    tokens: {
      bg: "#141820",
      surface: "#1e2330",
      raised: "#292f3e",
      sidebar: "#191e29",
      line: "#3b4355",
      text: "#f0edf5",
      muted: "#b4bed0",
      accent: "#c4b5ed",
      strong: "#d0bff5",
      accentInk: "#242036",
      selected: "#464059",
      hero: "#302b45",
      heroInk: "#f4ecff",
      heroMuted: "#d5cbe9",
      cardA: "#34324a",
      cardB: "#2b3e3e",
      soft: "#252b39",
      button: "#c3b2eb",
      buttonInk: "#231e31",
      danger: "#ffb7ae",
    },
  },
};
export function themeVars(name) {
  return Object.fromEntries(
    Object.entries((THEMES[name] || THEMES.sunshine).tokens).map(([k, v]) => [
      "--ui-" + k,
      v,
    ]),
  );
}
export function useThemeChrome(name) {
  useEffect(() => {
    if (!name) return;
    const t = THEMES[name] || THEMES.sunshine;
    document.documentElement.dataset.theme = name;
    document.documentElement.style.colorScheme = t.mode;
    document.documentElement.style.backgroundColor = t.tokens.bg;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", t.tokens.bg);
  }, [name]);
}
