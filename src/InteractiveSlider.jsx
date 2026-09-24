import React from "react";
import { playChime } from "./audio.js";

export default function InteractiveSlider({
  label,
  value,
  options, // array of { value, title, desc }
  onChange,
  unit = "",
  ariaLabel,
}) {
  const currentIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value)
  );

  const handleSliderChange = (e) => {
    const idx = Number(e.target.value);
    if (options[idx]) {
      onChange(options[idx].value);
      playChime("gentle-click");
    }
  };

  const handlePillClick = (optVal) => {
    onChange(optVal);
    playChime("gentle-click");
  };

  const activeOption = options[currentIndex] || options[0];
  const progressPercent = options.length > 1
    ? (currentIndex / (options.length - 1)) * 100
    : 0;

  return (
    <div className="interactive-slider-wrapper">
      <div className="interactive-slider-header">
        <span className="interactive-slider-label">{label}</span>
        <span className="interactive-slider-current">
          <strong>{activeOption.value}</strong>
          {unit && <small> {unit}</small>}
          <span className="interactive-slider-badge">{activeOption.desc}</span>
        </span>
      </div>

      <div className="interactive-slider-track-container">
        <div
          className="interactive-slider-fill"
          style={{ width: `${progressPercent}%` }}
        />
        <input
          type="range"
          min="0"
          max={options.length - 1}
          step="1"
          value={currentIndex}
          aria-label={ariaLabel || label}
          aria-valuetext={`${activeOption.value} ${unit} - ${activeOption.desc}`}
          onChange={handleSliderChange}
          className="interactive-slider-input"
        />
        <div className="interactive-slider-ticks">
          {options.map((opt, i) => (
            <span
              key={i}
              className={`interactive-slider-tick ${i <= currentIndex ? "active" : ""}`}
              style={{ left: `${(i / (options.length - 1)) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="journey-choice-row interactive-choice-cards">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={value === opt.value}
            className={value === opt.value ? "selected" : ""}
            onClick={() => handlePillClick(opt.value)}
          >
            <strong>
              {opt.value}
              <small> {unit}</small>
            </strong>
            <span>{opt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
