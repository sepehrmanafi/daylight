import React from "react";

// Curated palette-harmonious SVG botanical, geometric, and landscape artworks
// These seamlessly blend with Sunshine, Blossom, Sage, and Midnight palettes
// without jarring photographic color mismatches.
export default function ProjectArtwork({ name, color = "#d9ddbf", className = "" }) {
  const norm = (name || "").toLowerCase();

  // 1. Work / Side Project / Desk / Momentum
  if (norm.includes("work") || norm.includes("code") || norm.includes("desk") || norm.includes("side") || norm.includes("dev")) {
    return (
      <div className={`project-svg-art work-art ${className}`} style={{ "--art-base": color }}>
        <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`work-grad-${norm}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--art-base)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--ui-accent, #9aa288)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect width="200" height="120" fill={`url(#work-grad-${norm})`} />
          <circle cx="160" cy="30" r="45" fill="var(--ui-surface, #fff)" fillOpacity="0.25" />
          <path d="M-10 110 Q 50 40, 110 80 T 210 50 L 210 130 L -10 130 Z" fill="var(--ui-surface, #fff)" fillOpacity="0.35" />
          <path d="M20 90 L 70 40 L 120 70 L 170 30" stroke="var(--ui-text, #263526)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.4" fill="none" />
          <circle cx="70" cy="40" r="4" fill="var(--ui-text, #263526)" opacity="0.6" />
          <circle cx="120" cy="70" r="4" fill="var(--ui-text, #263526)" opacity="0.6" />
          <circle cx="170" cy="30" r="5" fill="var(--ui-text, #263526)" opacity="0.8" />
        </svg>
      </div>
    );
  }

  // 2. Wellbeing / Health / Mind / Rituals
  if (norm.includes("well") || norm.includes("mind") || norm.includes("health") || norm.includes("ritual") || norm.includes("care") || norm.includes("daisies")) {
    return (
      <div className={`project-svg-art wellbeing-art ${className}`} style={{ "--art-base": color }}>
        <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`well-grad-${norm}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--art-base)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--ui-hero, #f6e2a0)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <rect width="200" height="120" fill={`url(#well-grad-${norm})`} />
          <circle cx="100" cy="60" r="38" fill="var(--ui-surface, #fff)" fillOpacity="0.3" />
          {/* Gentle botanical petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="60"
              rx="9"
              ry="28"
              transform={`rotate(${angle} 100 60)`}
              fill="var(--ui-surface, #fff)"
              fillOpacity="0.45"
            />
          ))}
          <circle cx="100" cy="60" r="12" fill="var(--ui-text, #30382b)" fillOpacity="0.25" />
        </svg>
      </div>
    );
  }

  // 3. Learning / Reading / Curiosity / Books
  if (norm.includes("learn") || norm.includes("study") || norm.includes("read") || norm.includes("book")) {
    return (
      <div className={`project-svg-art learning-art ${className}`} style={{ "--art-base": color }}>
        <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`learn-grad-${norm}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--art-base)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--ui-raised, #e9ecdf)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect width="200" height="120" fill={`url(#learn-grad-${norm})`} />
          <rect x="35" y="30" width="130" height="70" rx="8" fill="var(--ui-surface, #fff)" fillOpacity="0.4" />
          <line x1="100" y1="30" x2="100" y2="100" stroke="var(--ui-text, #30382b)" strokeWidth="2" opacity="0.3" />
          <path d="M45 48 Q 70 44, 95 48 M45 62 Q 70 58, 95 62 M45 76 Q 70 72, 95 76" stroke="var(--ui-text, #30382b)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <path d="M105 48 Q 130 44, 155 48 M105 62 Q 130 58, 155 62 M105 76 Q 130 72, 155 76" stroke="var(--ui-text, #30382b)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <circle cx="160" cy="24" r="14" fill="var(--ui-hero, #f6e2a0)" opacity="0.7" />
        </svg>
      </div>
    );
  }

  // 4. Creative / Art / Design / Craft
  if (norm.includes("creat") || norm.includes("art") || norm.includes("design") || norm.includes("craft")) {
    return (
      <div className={`project-svg-art creative-art ${className}`} style={{ "--art-base": color }}>
        <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`creat-grad-${norm}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--art-base)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#efc5d8" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect width="200" height="120" fill={`url(#creat-grad-${norm})`} />
          <circle cx="55" cy="60" r="32" fill="var(--ui-surface, #fff)" fillOpacity="0.4" />
          <rect x="90" y="32" width="56" height="56" rx="14" transform="rotate(25 118 60)" fill="var(--ui-surface, #fff)" fillOpacity="0.35" />
          <path d="M140 30 Q 170 70, 190 40" stroke="var(--ui-text, #30382b)" strokeWidth="2" strokeLinecap="round" opacity="0.4" fill="none" />
          <circle cx="165" cy="55" r="7" fill="var(--ui-hero, #f6e2a0)" opacity="0.8" />
        </svg>
      </div>
    );
  }

  // 5. Travel / Adventure / Places / Coast
  if (norm.includes("travel") || norm.includes("trip") || norm.includes("place") || norm.includes("coast")) {
    return (
      <div className={`project-svg-art travel-art ${className}`} style={{ "--art-base": color }}>
        <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id={`trav-grad-${norm}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--art-base)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--ui-surface, #fff)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="200" height="120" fill={`url(#trav-grad-${norm})`} />
          <circle cx="150" cy="35" r="22" fill="var(--ui-hero, #f6e2a0)" opacity="0.75" />
          <path d="M-10 95 Q 40 60, 90 85 T 190 70 T 220 90 L 220 130 L -10 130 Z" fill="var(--ui-surface, #fff)" fillOpacity="0.5" />
          <path d="M-10 105 Q 60 85, 120 100 T 220 95 L 220 130 L -10 130 Z" fill="var(--ui-text, #30382b)" fillOpacity="0.15" />
        </svg>
      </div>
    );
  }

  // 6. Default / Personal / Life / Gentle organic landscape
  return (
    <div className={`project-svg-art personal-art ${className}`} style={{ "--art-base": color }}>
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`gen-grad-${norm}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--art-base)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--ui-hero, #eef1e7)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="200" height="120" fill={`url(#gen-grad-${norm})`} />
        <circle cx="50" cy="40" r="28" fill="var(--ui-surface, #fff)" fillOpacity="0.4" />
        <circle cx="140" cy="65" r="38" fill="var(--ui-surface, #fff)" fillOpacity="0.3" />
        <path d="M0 100 Q 60 70, 130 95 T 210 80 L 210 130 L 0 130 Z" fill="var(--ui-surface, #fff)" fillOpacity="0.4" />
      </svg>
    </div>
  );
}
