import React from "react";
import { Moon, Sun } from "lucide-react";

// Celestial animation: Starts with a gentle luminous moon in the starry dusk.
// As time elapses or timer runs, the celestial sphere revolves:
// the moon sets into the east while the radiant sun rises majestically from the west!
export default function CelestialFocus({ elapsedSeconds = 0, running = false }) {
  // Cycle progression: e.g. 0 to 1 over 10-15 minutes or looping dynamically
  // For visible beauty from minute 1 to 25+:
  // At 0s: moon is prominent (progress = 0)
  // At 600s (10 min): dawn arrives, sun rises from west (left)
  const cycleSeconds = 900; // 15-minute smooth celestial journey
  const progress = Math.min(1, Math.max(0, (elapsedSeconds % cycleSeconds) / cycleSeconds));

  // Moon descends / fades as sun rises from left (west)
  const moonOpacity = Math.max(0, 1 - progress * 1.8);
  const sunOpacity = Math.min(1, Math.max(0, (progress - 0.15) * 1.8));

  // Sun trajectory: rises from bottom-left (west) moving upward toward center
  const sunX = Math.min(50, 15 + progress * 35); // 15% to 50%
  const sunY = Math.max(25, 80 - progress * 55); // 80% down to 25% up

  // Moon trajectory: moves from top-center toward right
  const moonX = 50 + progress * 35; // 50% to 85%
  const moonY = 25 + progress * 40; // 25% down to 65%

  return (
    <div className={`celestial-focus-viewport ${running ? "is-running" : "is-idle"}`} aria-hidden="true">
      {/* Dynamic atmospheric sky gradient based on progress */}
      <div
        className="celestial-sky"
        style={{
          "--celestial-progress": progress,
          opacity: 0.95,
        }}
      />

      {/* Twinkling stars (visible during moon phase) */}
      <div className="celestial-stars" style={{ opacity: moonOpacity }}>
        <i style={{ top: "18%", left: "22%", animationDelay: "0.2s" }} />
        <i style={{ top: "28%", left: "75%", animationDelay: "0.8s" }} />
        <i style={{ top: "15%", left: "82%", animationDelay: "1.4s" }} />
        <i style={{ top: "35%", left: "30%", animationDelay: "0.5s" }} />
        <i style={{ top: "42%", left: "68%", animationDelay: "1.1s" }} />
      </div>

      {/* The Luminous Moon */}
      <div
        className="celestial-body celestial-moon"
        style={{
          left: `${moonX}%`,
          top: `${moonY}%`,
          opacity: moonOpacity,
          transform: `translate(-50%, -50%) scale(${1 - progress * 0.3})`,
        }}
      >
        <div className="moon-glow" />
        <div className="moon-disc">
          <Moon size={54} strokeWidth={1.2} />
        </div>
        <span className="celestial-tag">Quiet Dusk</span>
      </div>

      {/* The Radiant Rising Sun from the West (Left) */}
      <div
        className="celestial-body celestial-sun"
        style={{
          left: `${sunX}%`,
          top: `${sunY}%`,
          opacity: sunOpacity,
          transform: `translate(-50%, -50%) scale(${0.7 + progress * 0.45})`,
        }}
      >
        <div className="sun-corona" />
        <div className="sun-rays" />
        <div className="sun-disc">
          <Sun size={60} strokeWidth={1.5} />
        </div>
        <span className="celestial-tag">Rising Sun</span>
      </div>

      {/* Distant mountain silhouette */}
      <svg className="celestial-landscape" viewBox="0 0 600 160" preserveAspectRatio="none">
        <path
          d="M0 160 L0 110 Q 140 60 260 100 T 480 80 Q 550 110 600 120 L 600 160 Z"
          fill="rgba(15, 20, 28, 0.55)"
        />
        <path
          d="M0 160 L0 130 Q 180 90 320 125 T 600 115 L 600 160 Z"
          fill="rgba(10, 15, 22, 0.75)"
        />
      </svg>
    </div>
  );
}
