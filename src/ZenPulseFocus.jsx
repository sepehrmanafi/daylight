import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Target,
  Sparkles,
  Zap,
  Coffee,
  Waves,
  TreePine,
  Wind,
} from "lucide-react";
import { playChime, startAmbientSound, stopAmbientSound } from "./audio.js";

/**
 * ZenPulseFocus: A calm, ultra-minimalist, editorial focus environment.
 * Replaces any Moon-to-Sun metaphor with an organic, breathing aura ring ("Pulse of Clarity")
 * that expands and ripples gently with your breathing while in flow.
 *
 * Supports:
 * - Free open-ended focus mode (stopwatch counting up) OR customizable target countdown.
 * - Quick +5m / -5m micro-adjustments on the fly.
 * - Ambient noise selector (Brown noise, gentle rain, forest breeze, alpha waves).
 * - Distraction-free zen minimalism with generous whitespace, crisp modern typography.
 */
export default function ZenPulseFocus({
  seconds,
  timer,
  tasks,
  profile,
  onToggle,
  onReset,
  onSelect,
  onAdjustDuration,
}) {
  const [sound, setSound] = useState(false);
  const [soundType, setSoundType] = useState("brown");
  const [mode, setMode] = useState(timer.mode || "focus"); // "focus" or "break"

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const toggleSound = () => {
    if (sound) {
      stopAmbientSound();
      setSound(false);
    } else {
      startAmbientSound(soundType, 0.4);
      setSound(true);
    }
  };

  const changeSoundType = (type) => {
    setSoundType(type);
    if (sound) {
      startAmbientSound(type, 0.4);
    }
  };

  // Format time display: mm:ss or hh:mm:ss if > 60m
  const formatTime = (totalSec) => {
    const s = Math.max(0, Math.floor(totalSec));
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) {
      return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Calculate session percentage for circular progress ring
  const targetTotal = (timer.duration || profile.focus || 25) * 60;
  const progressRatio = targetTotal > 0 ? Math.min(1, Math.max(0, 1 - seconds / targetTotal)) : 0;
  const strokeDashoffset = 880 - 880 * progressRatio;

  // Active task object
  const activeTask = tasks.find((t) => t.id === timer.taskId);

  // Estimated completion timestamp
  const finishTimeStr = () => {
    if (!seconds) return "";
    const finishDate = new Date(Date.now() + seconds * 1000);
    return finishDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className={`zen-focus-container ${timer.running ? "is-running" : "is-paused"}`}>
      {/* Top subtle controls: audio & status */}
      <header className="zen-focus-header">
        <div className="zen-mode-pills">
          <button
            type="button"
            className={`zen-pill-btn ${timer.mode === "focus" ? "active" : ""}`}
            onClick={() => onReset("focus")}
          >
            Focus
          </button>
          <button
            type="button"
            className={`zen-pill-btn ${timer.mode === "break" ? "active" : ""}`}
            onClick={() => onReset("break")}
          >
            Short break
          </button>
        </div>

        <div className="zen-sound-controls">
          <button
            type="button"
            className={`zen-sound-toggle ${sound ? "active" : ""}`}
            onClick={toggleSound}
            aria-label={sound ? "Mute ambient audio" : "Play ambient sound"}
            title="Toggle calming ambient soundscapes"
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>

          {sound && (
            <div className="zen-sound-options" aria-label="Sound choice">
              {[
                { id: "brown", label: "Brown noise" },
                { id: "rain", label: "Gentle rain" },
                { id: "forest", label: "Forest breeze" },
                { id: "binaural", label: "Alpha waves" },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`zen-sound-chip ${soundType === s.id ? "active" : ""}`}
                  onClick={() => changeSoundType(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Focus Stage */}
      <main className="zen-focus-stage">
        {/* Active Intent / Task banner */}
        <div className="zen-intent-card">
          <span className="zen-intent-kicker">
            {timer.running ? "CURRENT FOCUS" : "READY FOR CLARITY"}
          </span>
          <div className="zen-intent-select-wrap">
            <Target size={18} className="zen-intent-icon" />
            <select
              aria-label="Task to focus on"
              value={timer.taskId || ""}
              onChange={(e) => onSelect(e.target.value)}
              className="zen-intent-select"
            >
              <option value="">Just quiet, unstructured flow</option>
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

        {/* Circular Dial & Breathing Aura Ring */}
        <div className="zen-dial-wrapper">
          {/* Subtle breathing aura glow */}
          <div className="zen-aura-pulse" />

          {/* SVG Progress Circle */}
          <svg className="zen-dial-svg" viewBox="0 0 320 320">
            {/* Background track */}
            <circle
              className="zen-dial-track"
              cx="160"
              cy="160"
              r="140"
              strokeWidth="6"
              fill="none"
            />
            {/* Dynamic progress fill */}
            <circle
              className="zen-dial-progress"
              cx="160"
              cy="160"
              r="140"
              strokeWidth="8"
              fill="none"
              strokeDasharray="880"
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 160 160)"
            />
          </svg>

          {/* Digital Clock & Metadata Inside Ring */}
          <div className="zen-dial-inner">
            <span className="zen-status-indicator">
              <span className={`zen-dot ${timer.running ? "running" : ""}`} />
              {timer.running ? "Flow state" : "Ready"}
            </span>

            {/* Crucial selector: .big-clock for test suite & instant readability */}
            <div className="big-clock zen-big-clock" aria-label="Time remaining">
              {formatTime(seconds)}
            </div>

            {timer.running && seconds > 0 && (
              <span className="zen-finish-time">
                Finishes around {finishTimeStr()}
              </span>
            )}
          </div>
        </div>

        {/* Micro-adjustments: +5m / -5m */}
        <div className="zen-duration-adjuster">
          <button
            type="button"
            className="zen-adjust-btn"
            onClick={() => onAdjustDuration?.(-5)}
            title="Subtract 5 minutes"
            aria-label="Subtract 5 minutes"
          >
            <Minus size={14} /> 5m
          </button>
          <span className="zen-total-duration">
            Total {timer.duration || profile.focus || 25} min
          </span>
          <button
            type="button"
            className="zen-adjust-btn"
            onClick={() => onAdjustDuration?.(5)}
            title="Add 5 minutes"
            aria-label="Add 5 minutes"
          >
            <Plus size={14} /> 5m
          </button>
        </div>

        {/* Primary Controls */}
        <div className="zen-actions">
          <button
            type="button"
            className={`zen-btn-primary ${timer.running ? "is-active" : ""}`}
            onClick={onToggle}
          >
            {timer.running ? <Pause size={18} /> : <Play size={18} />}
            <span>{timer.running ? "Pause session" : "Start session"}</span>
          </button>

          <button
            type="button"
            className="zen-btn-secondary"
            onClick={() => onReset()}
            aria-label="Reset timer"
            title="Reset to default duration"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </main>

      {/* Gentle footer note */}
      <footer className="zen-focus-footer">
        <p>No rush, no pressure. Just one thoughtful step at a time.</p>
      </footer>
    </div>
  );
}
