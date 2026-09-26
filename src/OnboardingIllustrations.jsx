import React from "react";

// Original SVG vector characters inspired by modern editorial storybooks
// Features warm pastel palettes (warm sunshine gold, soft blush pink, gentle sky lavender)
// with expressive hand-drawn aesthetics, organic shapes, and joyful characters.

export function IllustrationStep1() {
  // Inspired by: Adventurer with map, companion puppy, warm sunshine tones, discovery & planning
  return (
    <div className="onboard-svg-scene scene-1" aria-hidden="true">
      <svg viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="step1-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3d6" />
            <stop offset="100%" stopColor="#fedc97" />
          </linearGradient>
        </defs>
        {/* Organic soft backdrop blob */}
        <path
          d="M60 90C40 160 30 240 100 270C180 300 280 280 300 190C320 100 260 40 180 40C110 40 80 50 60 90Z"
          fill="url(#step1-bg)"
          opacity="0.85"
        />
        {/* Playful dots and sparkles */}
        <circle cx="50" cy="50" r="3" fill="#e69c24" opacity="0.6" />
        <circle cx="290" cy="80" r="4" fill="#e69c24" opacity="0.5" />
        <circle cx="310" cy="220" r="3" fill="#e69c24" opacity="0.7" />
        <path d="M70 40L75 48L83 50L75 52L70 60L65 52L57 50L65 48Z" fill="#e69c24" opacity="0.6" />

        {/* Character: Explorer holding folded journey map */}
        {/* Legs & Shoes */}
        <rect x="150" y="210" width="16" height="55" rx="8" fill="#32456b" />
        <rect x="180" y="210" width="16" height="55" rx="8" fill="#222f48" />
        <ellipse cx="152" cy="265" rx="14" ry="7" fill="#182234" />
        <ellipse cx="188" cy="265" rx="14" ry="7" fill="#182234" />

        {/* Shorts */}
        <path d="M142 165H204L208 215H176L173 185L170 215H138L142 165Z" fill="#1a1c22" />

        {/* Yellow Oversized Tunic / Sweater */}
        <path
          d="M135 105C150 95 195 95 210 105L228 170H118L135 105Z"
          fill="#ffc83b"
          stroke="#1a1c22"
          strokeWidth="3"
        />

        {/* Folded Map held in hands */}
        <path
          d="M95 110L145 95L175 140L125 155Z"
          fill="#ffffff"
          stroke="#1a1c22"
          strokeWidth="2.5"
        />
        <path
          d="M145 95L185 85L215 130L175 140Z"
          fill="#fbf9f2"
          stroke="#1a1c22"
          strokeWidth="2.5"
        />
        {/* Pin on map */}
        <circle cx="120" cy="120" r="7" fill="#f05454" />
        <path d="M120 125L120 135" stroke="#f05454" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M105 135Q130 145 160 115" stroke="#889279" strokeWidth="2" strokeDasharray="3 3" fill="none" />

        {/* Arms */}
        <path d="M125 115C100 130 115 160 135 155" stroke="#ffc83b" strokeWidth="18" strokeLinecap="round" />
        <path d="M210 115C225 135 200 155 180 150" stroke="#ffc83b" strokeWidth="18" strokeLinecap="round" />

        {/* Head & Cap */}
        <ellipse cx="172" cy="78" rx="15" ry="17" fill="#e8c2a0" />
        <path d="M154 70C155 58 185 55 190 70H154Z" fill="#ffc83b" />
        <path d="M150 68H200" stroke="#1a1c22" strokeWidth="3" strokeLinecap="round" />
        <circle cx="177" cy="76" r="2" fill="#1a1c22" />
        <path d="M174 85Q179 88 183 85" stroke="#1a1c22" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Faithful Companion Puppy sitting beside */}
        <path d="M235 220C235 200 255 195 265 205C270 210 270 240 268 265H235V220Z" fill="#e8d8be" stroke="#1a1c22" strokeWidth="2.5" />
        <circle cx="260" cy="202" r="11" fill="#e8d8be" stroke="#1a1c22" strokeWidth="2.5" />
        <path d="M265 198C272 195 276 205 272 212" fill="#75523b" />
        <circle cx="264" cy="202" r="1.5" fill="#1a1c22" />
        <ellipse cx="268" cy="206" rx="2.5" ry="2" fill="#1a1c22" />
        <rect x="248" y="212" width="18" height="4" rx="2" fill="#ffc83b" />
      </svg>
    </div>
  );
}

export function IllustrationStep2() {
  // Inspired by: Creator with moodboards/canvases, lilac & blue tones, creative clarity
  return (
    <div className="onboard-svg-scene scene-2" aria-hidden="true">
      <svg viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="step2-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e4e8fa" />
            <stop offset="100%" stopColor="#c5d2f8" />
          </linearGradient>
        </defs>
        {/* Fluid lavender/blue backdrop */}
        <path
          d="M80 60C160 20 260 50 280 120C300 190 280 270 200 285C120 300 50 240 50 170C50 100 60 70 80 60Z"
          fill="url(#step2-bg)"
          opacity="0.9"
        />

        {/* Floating Creative Canvas Windows */}
        <g transform="translate(160, 50)">
          <rect width="110" height="75" rx="8" fill="#ffffff" stroke="#1a1c22" strokeWidth="2.5" />
          <circle cx="14" cy="12" r="3" fill="#ff6b6b" />
          <circle cx="24" cy="12" r="3" fill="#feca57" />
          <circle cx="34" cy="12" r="3" fill="#1dd1a1" />
          <polygon points="55,25 90,65 20,65" fill="#fed330" opacity="0.8" stroke="#1a1c22" strokeWidth="2" />
        </g>
        <g transform="translate(175, 140)">
          <rect width="105" height="75" rx="8" fill="#ffffff" stroke="#1a1c22" strokeWidth="2.5" />
          <circle cx="14" cy="12" r="3" fill="#ff6b6b" />
          <circle cx="24" cy="12" r="3" fill="#feca57" />
          <circle cx="34" cy="12" r="3" fill="#1dd1a1" />
          <path d="M20 50 Q 45 25, 60 50 T 95 40" stroke="#1a1c22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M30 62 Q 55 37, 70 62 T 95 52" stroke="#ff9f43" strokeWidth="2" fill="none" />
        </g>

        {/* Character standing thoughtfully in black slacks and periwinkle coat */}
        <rect x="110" y="175" width="22" height="90" rx="10" fill="#1a1c22" />
        <rect x="138" y="175" width="22" height="90" rx="10" fill="#2b303c" />
        <ellipse cx="118" cy="268" rx="15" ry="8" fill="#1a1c22" />
        <ellipse cx="152" cy="268" rx="15" ry="8" fill="#1a1c22" />

        {/* Periwinkle sweater */}
        <path d="M95 105C110 95 160 95 175 105L185 180H85L95 105Z" fill="#7086e4" stroke="#1a1c22" strokeWidth="3" />
        {/* Arm gesturing to the board with a coffee mug */}
        <path d="M170 120C195 120 205 135 210 150" stroke="#7086e4" strokeWidth="18" strokeLinecap="round" />
        <rect x="204" y="145" width="14" height="18" rx="3" fill="#ff6b81" stroke="#1a1c22" strokeWidth="2" />

        {/* Head with dark wavy hair & glasses */}
        <ellipse cx="132" cy="78" rx="16" ry="18" fill="#ebd2b9" />
        <path d="M116 75C115 55 145 50 150 70C155 85 145 95 140 95C130 95 125 90 116 75Z" fill="#1a1c22" />
        <circle cx="138" cy="78" r="5" stroke="#1a1c22" strokeWidth="1.8" fill="none" />
        <circle cx="140" cy="78" r="1.5" fill="#1a1c22" />
        <path d="M136 85Q140 88 144 85" stroke="#1a1c22" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function IllustrationStep3() {
  // Inspired by: Stargazer / dreamer with telescope and planet, pink & lilac cosmic mood
  return (
    <div className="onboard-svg-scene scene-3" aria-hidden="true">
      <svg viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="step3-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fce4ec" />
            <stop offset="100%" stopColor="#f8bbd0" />
          </linearGradient>
        </defs>
        {/* Organic pink aura blob */}
        <path
          d="M70 70C140 20 250 40 280 110C310 180 270 270 190 280C110 290 40 230 50 160C60 90 60 80 70 70Z"
          fill="url(#step3-bg)"
          opacity="0.9"
        />

        {/* Floating Planet with golden ring */}
        <g transform="translate(230, 45)">
          <circle cx="30" cy="30" r="22" fill="#ffd166" />
          <ellipse cx="30" cy="30" rx="38" ry="9" stroke="#1a1c22" strokeWidth="3" transform="rotate(-18 30 30)" fill="none" />
        </g>
        {/* Earth / Green Planet */}
        <g transform="translate(60, 160)">
          <circle cx="28" cy="28" r="24" fill="#69d2e7" stroke="#1a1c22" strokeWidth="2.5" />
          <path d="M15 22Q22 14 30 18T42 30" fill="#a8e6cf" />
          <path d="M20 40Q32 30 38 42" fill="#a8e6cf" />
        </g>

        {/* Character seated cross-legged holding a magnifying looking glass */}
        {/* Crossed Legs in midnight slacks */}
        <path d="M120 220C110 250 160 260 195 245C220 235 210 215 180 215H140L120 220Z" fill="#1a1c22" />
        <ellipse cx="145" cy="250" rx="14" ry="7" fill="#6c5ce7" />
        <ellipse cx="190" cy="250" rx="14" ry="7" fill="#6c5ce7" />

        {/* Pink oversized sweater */}
        <path d="M130 145C140 135 185 135 195 145L208 215H118L130 145Z" fill="#ff7675" stroke="#1a1c22" strokeWidth="3" />
        {/* Arm raising magnifying glass */}
        <path d="M185 155C200 130 170 100 145 105" stroke="#ff7675" strokeWidth="16" strokeLinecap="round" />
        {/* Looking glass */}
        <circle cx="130" cy="95" r="22" stroke="#1a1c22" strokeWidth="3.5" fill="#dff9fb" opacity="0.8" />
        <line x1="145" y1="110" x2="165" y2="130" stroke="#f39c12" strokeWidth="5" strokeLinecap="round" />

        {/* Head with high bun */}
        <ellipse cx="178" cy="115" rx="15" ry="17" fill="#ebd2b9" />
        <path d="M165 110C165 95 195 95 195 110C195 125 185 130 175 130C168 130 165 120 165 110Z" fill="#1a1c22" />
        <circle cx="180" cy="90" r="9" fill="#1a1c22" />
        <circle cx="174" cy="114" r="2" fill="#1a1c22" />
      </svg>
    </div>
  );
}

export function IllustrationStep4() {
  // Inspired by: Harvest / wheelbarrow / progress, warm sunny apricot garden
  return (
    <div className="onboard-svg-scene scene-4" aria-hidden="true">
      <svg viewBox="0 0 340 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="step4-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff0db" />
            <stop offset="100%" stopColor="#fed7b2" />
          </linearGradient>
        </defs>
        <path
          d="M80 60C170 20 270 40 290 120C310 200 270 280 180 290C90 300 40 230 40 150C40 90 60 70 80 60Z"
          fill="url(#step4-bg)"
          opacity="0.9"
        />

        {/* Character running forward with a vibrant red wheelbarrow of fresh green ideas */}
        {/* Legs running */}
        <line x1="195" y1="180" x2="175" y2="255" stroke="#1a1c22" strokeWidth="18" strokeLinecap="round" />
        <line x1="210" y1="180" x2="245" y2="235" stroke="#2b303c" strokeWidth="18" strokeLinecap="round" />
        <ellipse cx="165" cy="260" rx="14" ry="7" fill="#ffffff" stroke="#1a1c22" strokeWidth="2" />
        <ellipse cx="255" cy="238" rx="14" ry="7" fill="#ffffff" stroke="#1a1c22" strokeWidth="2" />

        {/* White shirt */}
        <path d="M190 110C200 100 240 100 248 110L252 180H185L190 110Z" fill="#ffffff" stroke="#1a1c22" strokeWidth="3" />
        {/* Arms pushing wheelbarrow */}
        <path d="M210 135L150 170" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />

        {/* Wheelbarrow: Red bucket & wheel */}
        <polygon points="90,160 170,160 155,210 110,210" fill="#e74c3c" stroke="#1a1c22" strokeWidth="3" />
        <circle cx="115" cy="235" r="18" fill="#1a1c22" />
        <circle cx="115" cy="235" r="7" fill="#f39c12" />
        <line x1="115" y1="235" x2="140" y2="185" stroke="#1a1c22" strokeWidth="4" />
        {/* Bountiful harvest of green ideas/leaves in the wheelbarrow */}
        <circle cx="120" cy="155" r="18" fill="#2ecc71" stroke="#1a1c22" strokeWidth="2" />
        <circle cx="140" cy="150" r="16" fill="#27ae60" stroke="#1a1c22" strokeWidth="2" />
        <circle cx="130" cy="140" r="14" fill="#a8e6cf" stroke="#1a1c22" strokeWidth="2" />

        {/* Head looking forward with stylish black beanie */}
        <ellipse cx="230" cy="85" rx="15" ry="17" fill="#e8c2a0" />
        <path d="M218 80C218 65 245 65 245 80C245 92 238 95 230 95C222 95 218 90 218 80Z" fill="#1a1c22" />
        <circle cx="236" cy="84" r="2" fill="#1a1c22" />
        <path d="M232 92Q237 95 242 92" stroke="#1a1c22" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
