import React from "react";

/*
 * Small, original SVG scenes for the welcome story. They are inline so the
 * first scene has no image request to wait on; the lazy module is the preload
 * boundary. Each scene keeps its background, props, and character in separate
 * groups so the CSS motion can stay on compositor-friendly transforms and opacity.
 */

export function CaptureIllustration() {
  return (
    <svg
      className="intro-illustration intro-illustration--capture"
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <g className="intro-illustration__layer intro-illustration__layer--blob">
        <path
          d="M122 105C177 46 288 47 365 77C461 114 527 199 501 291C475 383 363 419 260 402C153 385 74 319 79 225C82 176 96 133 122 105Z"
          fill="var(--intro-blob)"
        />
        <path
          d="M444 104C475 104 500 125 501 153C503 181 482 198 455 192C427 186 414 160 420 135C424 118 432 108 444 104Z"
          fill="var(--intro-blob-alt)"
          opacity=".8"
        />
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--sparkles">
        <path
          d="M116 154L121 166L133 171L121 176L116 189L111 176L99 171L111 166L116 154Z"
          fill="var(--intro-accent)"
        />
        <circle cx="481" cy="252" r="7" fill="var(--intro-accent-soft)" />
        <circle cx="161" cy="324" r="5" fill="var(--intro-accent-soft)" />
        <path
          d="M473 311L477 320L486 324L477 328L473 337L469 328L460 324L469 320L473 311Z"
          fill="var(--intro-accent)"
        />
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--props">
        <ellipse cx="317" cy="390" rx="146" ry="19" fill="var(--intro-art-ink)" opacity=".12" />
        <g transform="rotate(-6 311 244)">
          <rect x="185" y="102" width="258" height="278" rx="25" fill="var(--intro-art-ink)" opacity=".12" />
          <rect
            x="174"
            y="91"
            width="258"
            height="278"
            rx="25"
            fill="var(--intro-art-surface)"
            stroke="var(--intro-art-ink)"
            strokeWidth="7"
          />
          <rect x="174" y="91" width="258" height="57" rx="25" fill="var(--intro-accent-soft)" opacity=".7" />
          <path d="M174 123H432" stroke="var(--intro-art-ink)" strokeWidth="7" opacity=".55" />
          <circle cx="207" cy="119" r="7" fill="var(--intro-accent)" />
          <circle cx="232" cy="119" r="7" fill="var(--intro-accent-soft)" />
          <path d="M215 187H377" stroke="var(--intro-art-ink)" strokeWidth="10" strokeLinecap="round" opacity=".22" />
          <path d="M215 261H347" stroke="var(--intro-art-ink)" strokeWidth="10" strokeLinecap="round" opacity=".22" />
          <path d="M215 333H371" stroke="var(--intro-art-ink)" strokeWidth="10" strokeLinecap="round" opacity=".22" />
          <circle cx="201" cy="184" r="17" fill="var(--intro-accent-soft)" opacity=".65" />
          <path d="M191 184L198 191L212 174" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="201" cy="258" r="17" fill="var(--intro-accent-soft)" opacity=".65" />
          <path d="M191 258L198 265L212 248" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="201" cy="330" r="17" fill="var(--intro-accent-soft)" opacity=".65" />
        </g>
        <g transform="translate(398 203) rotate(10)">
          <rect width="128" height="77" rx="17" fill="var(--intro-art-surface)" stroke="var(--intro-art-ink)" strokeWidth="6" />
          <circle cx="25" cy="38" r="11" fill="var(--intro-accent)" />
          <path d="M49 30H99M49 48H85" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" opacity=".35" />
        </g>
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--character">
        <path d="M438 349C457 320 482 315 504 329" stroke="var(--intro-art-ink)" strokeWidth="12" strokeLinecap="round" />
        <path d="M473 333L500 299" stroke="var(--intro-accent)" strokeWidth="17" strokeLinecap="round" />
        <circle cx="504" cy="292" r="12" fill="var(--intro-accent)" />
        <path d="M474 342C481 351 490 356 502 357" stroke="var(--intro-art-ink)" strokeWidth="6" strokeLinecap="round" opacity=".65" />
      </g>
    </svg>
  );
}

export function FocusIllustration() {
  return (
    <svg
      className="intro-illustration intro-illustration--focus"
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <g className="intro-illustration__layer intro-illustration__layer--blob">
        <path
          d="M105 134C137 69 239 45 333 63C437 82 519 152 514 247C509 344 421 406 315 414C204 422 105 376 77 292C60 242 78 187 105 134Z"
          fill="var(--intro-blob)"
        />
        <path
          d="M429 100C465 74 515 92 530 128C545 166 523 202 486 204C449 207 422 177 419 143C417 125 421 107 429 100Z"
          fill="var(--intro-blob-alt)"
          opacity=".85"
        />
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--sparkles">
        <circle cx="126" cy="135" r="8" fill="var(--intro-accent-soft)" />
        <path
          d="M473 244L479 258L493 264L479 270L473 284L467 270L453 264L467 258L473 244Z"
          fill="var(--intro-accent)"
        />
        <circle cx="161" cy="340" r="6" fill="var(--intro-accent)" />
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--props">
        <ellipse cx="322" cy="390" rx="160" ry="18" fill="var(--intro-art-ink)" opacity=".12" />
        <g transform="rotate(4 303 230)">
          <rect x="155" y="74" width="300" height="294" rx="28" fill="var(--intro-art-ink)" opacity=".1" />
          <rect
            x="143"
            y="62"
            width="300"
            height="294"
            rx="28"
            fill="var(--intro-art-surface)"
            stroke="var(--intro-art-ink)"
            strokeWidth="7"
          />
          <path d="M143 134H443" stroke="var(--intro-art-ink)" strokeWidth="7" opacity=".25" />
          <path d="M181 112H292" stroke="var(--intro-art-ink)" strokeWidth="13" strokeLinecap="round" opacity=".52" />
          <circle cx="407" cy="103" r="12" fill="var(--intro-accent-soft)" />
          <path d="M199 185H377" stroke="var(--intro-art-ink)" strokeWidth="11" strokeLinecap="round" opacity=".18" />
          <path d="M199 250H377" stroke="var(--intro-art-ink)" strokeWidth="11" strokeLinecap="round" opacity=".18" />
          <path d="M199 315H310" stroke="var(--intro-art-ink)" strokeWidth="11" strokeLinecap="round" opacity=".18" />
          <circle cx="177" cy="181" r="15" fill="var(--intro-accent-soft)" opacity=".55" />
          <path d="M168 181L175 188L188 172" stroke="var(--intro-art-ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="177" cy="246" r="15" fill="var(--intro-accent)" opacity=".9" />
          <circle cx="177" cy="311" r="15" fill="var(--intro-accent-soft)" opacity=".4" />
        </g>
        <g transform="translate(400 304)">
          <path d="M0 73H106" stroke="var(--intro-art-ink)" strokeWidth="9" strokeLinecap="round" />
          <path d="M17 73L6 112M88 73L101 112" stroke="var(--intro-art-ink)" strokeWidth="8" strokeLinecap="round" />
          <path d="M44 73V23" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" />
          <path d="M44 29C14 37 14 4 43 8C72 5 74 36 44 29Z" fill="var(--intro-accent-soft)" stroke="var(--intro-art-ink)" strokeWidth="6" />
          <path d="M73 73V45" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" />
          <path d="M72 52C54 55 54 35 72 37C90 35 91 55 72 52Z" fill="var(--intro-accent)" stroke="var(--intro-art-ink)" strokeWidth="5" />
        </g>
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--character">
        <circle cx="503" cy="166" r="40" fill="var(--intro-accent-soft)" opacity=".7" />
        <path d="M503 132V200M469 166H537" stroke="var(--intro-art-surface)" strokeWidth="7" strokeLinecap="round" opacity=".8" />
        <circle cx="492" cy="156" r="4" fill="var(--intro-art-ink)" />
        <circle cx="516" cy="156" r="4" fill="var(--intro-art-ink)" />
        <path d="M492 176Q503 185 514 176" stroke="var(--intro-art-ink)" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ProgressIllustration() {
  return (
    <svg
      className="intro-illustration intro-illustration--progress"
      viewBox="0 0 640 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      aria-hidden="true"
    >
      <g className="intro-illustration__layer intro-illustration__layer--blob">
        <path
          d="M118 103C184 51 283 43 373 69C465 96 526 171 512 259C497 355 398 411 296 414C191 416 99 369 78 281C63 219 78 135 118 103Z"
          fill="var(--intro-blob)"
        />
        <path
          d="M111 287C141 258 188 263 198 300C208 337 177 364 143 355C112 346 96 312 111 287Z"
          fill="var(--intro-blob-alt)"
          opacity=".85"
        />
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--sparkles">
        <path
          d="M464 104L470 118L484 124L470 130L464 144L458 130L444 124L458 118L464 104Z"
          fill="var(--intro-accent)"
        />
        <circle cx="492" cy="290" r="7" fill="var(--intro-accent-soft)" />
        <circle cx="143" cy="141" r="6" fill="var(--intro-accent-soft)" />
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--props">
        <ellipse cx="316" cy="390" rx="155" ry="18" fill="var(--intro-art-ink)" opacity=".12" />
        <path d="M148 326C212 294 251 274 299 247C355 216 399 192 472 152" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" strokeDasharray="2 19" opacity=".28" />
        <g transform="translate(166 95)">
          <rect x="0" y="0" width="230" height="235" rx="25" fill="var(--intro-art-surface)" stroke="var(--intro-art-ink)" strokeWidth="7" />
          <path d="M39 62H193" stroke="var(--intro-art-ink)" strokeWidth="10" strokeLinecap="round" opacity=".2" />
          <path d="M39 113H193" stroke="var(--intro-art-ink)" strokeWidth="10" strokeLinecap="round" opacity=".2" />
          <path d="M39 164H151" stroke="var(--intro-art-ink)" strokeWidth="10" strokeLinecap="round" opacity=".2" />
          <circle cx="25" cy="57" r="11" fill="var(--intro-accent-soft)" />
          <path d="M19 57L24 62L33 51" stroke="var(--intro-art-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="25" cy="108" r="11" fill="var(--intro-accent-soft)" />
          <path d="M19 108L24 113L33 102" stroke="var(--intro-art-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="25" cy="159" r="11" fill="var(--intro-accent)" />
          <path d="M19 159L24 164L33 153" stroke="var(--intro-art-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 213H176" stroke="var(--intro-accent-soft)" strokeWidth="12" strokeLinecap="round" opacity=".55" />
          <path d="M38 213H126" stroke="var(--intro-accent)" strokeWidth="12" strokeLinecap="round" />
        </g>
        <g transform="translate(421 202)">
          <path d="M22 100C28 69 36 40 48 8" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" />
          <path d="M47 13C20 24 17 -3 46 1C74 -2 75 25 47 13Z" fill="var(--intro-accent-soft)" stroke="var(--intro-art-ink)" strokeWidth="6" />
          <path d="M46 37C78 46 76 16 48 23C21 17 16 45 46 37Z" fill="var(--intro-accent)" stroke="var(--intro-art-ink)" strokeWidth="6" />
          <path d="M-1 100H78" stroke="var(--intro-art-ink)" strokeWidth="9" strokeLinecap="round" />
        </g>
      </g>

      <g className="intro-illustration__layer intro-illustration__layer--character">
        <circle cx="489" cy="115" r="24" fill="var(--intro-accent)" />
        <path d="M489 83V147M457 115H521" stroke="var(--intro-art-surface)" strokeWidth="6" strokeLinecap="round" opacity=".8" />
        <path d="M481 111L487 117L498 104" stroke="var(--intro-art-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M492 157C500 165 511 167 521 163" stroke="var(--intro-art-ink)" strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export const INTRO_ILLUSTRATIONS = {
  capture: CaptureIllustration,
  focus: FocusIllustration,
  progress: ProgressIllustration,
};
