import React from "react";
import { Sun, Moon, Check, Plus, Sparkles } from "lucide-react";
import { THEMES, themeVars } from "./themes.js";
export default function ThemePreview({ value }) {
  const t = THEMES[value] || THEMES.sunshine;
  return (
    <div className="theme-preview-wrap">
      <div
        className="palette-live-preview"
        style={themeVars(value)}
        role="img"
        aria-label={`${t.name} workspace preview: themed background, hero, task cards and navigation.`}
      >
        <div className="palette-preview-header">
          {t.mode === "dark" ? <Moon size={13} /> : <Sun size={13} />}
          <b>daylight.</b>
          <small>LIVE PREVIEW</small>
        </div>
        <div className="palette-preview-hero">
          <div>
            <span>YOUR DAY. YOUR COLORS.</span>
            <strong>
              A little space,
              <br />
              all your own.
            </strong>
          </div>
          <Sparkles size={40} />
        </div>
        <div className="palette-preview-tasks">
          <div>
            <span>
              <Check size={10} />
            </span>
            One small thing
          </div>
          <div>
            <span />
            <i>Your next little win</i>
          </div>
        </div>
        <div className="palette-preview-nav">
          <span />
          <span />
          <b>
            <Plus size={12} />
          </b>
          <span />
          <span />
        </div>
      </div>
      <p className="palette-preview-caption" role="status">
        {t.name} across your backgrounds, cards, controls and navigation.
      </p>
    </div>
  );
}
