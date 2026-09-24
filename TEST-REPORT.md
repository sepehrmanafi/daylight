# Daylight — verification summary

**September 23, 2026 · app-wide palettes and Midnight dark mode**

Environment: Chromium headless on Linux, production builds served over localhost. **31 / 31 automated Chromium browser tests passed** (12 original regressions, 7 mobile regressions, 5 experience tests, 7 new palette tests). Final production run: 1.2 minutes. A separate headless WebKit smoke also passed.

## Existing behavior retained
1. First-run personalization, optional examples, persistence.
2. Task creation, quick parsing, tags, notes, subtasks, search, editing, completion, Undo, deletion.
3. Recurrence and board transitions, including reopening.
4. Project creation, covers, association and safe removal.
5. Calendar navigation and dated task creation.
6. Habit editing, check-ins, history and persistence.
7. Focus timer pause/resume, time advancement, session logging, persisted breaks.
8. JSON backup export, validation, explicit restore confirmation.
9. Production service worker and offline reload with local imagery.
10. Phone onboarding, dashboard and rituals without document overflow.
11. Month-end recurrence clamping and reopening through the editor.
12. Filters, sorting, reflections and persistence.

## New mobile regressions
13. Separate mobile hierarchy; Home, Plan, You, Focus and Calendar fit 320, 360, 390, 430, 600 and 767px. Desktop sidebar returns at 1440px. No runtime errors in this walkthrough.
14. Selected-day capture; immediate completion write; recurrence created exactly once; visual celebration and Undo; reload persistence.
15. Daily mood, real weekly totals, reflection and ritual history persist.
16. Mobile calendar dates and touch-friendly board status changes share the same task data.
17. OS Reduce Motion bypasses effects/visual retention; celebration and solid-navigation preferences persist.
18. Bottom-sheet background inertness, focus restoration, cancellation and >=16px editable mobile fields.
19. Active focus-session return chip, pausing, cross-view navigation and reload.

## New experience regressions
20. Swipeable onboarding, Back navigation, preserved answers, routine/goal configuration and one-time setup persistence.
21. Supplied dock dimensions and gray-pill material, all five existing icons, drag-to-select, and tapping Plan while Calendar is active.
22. Keyboard mood slider, draft-before-save behavior, optional context/notes, persistence and JSON backup inclusion.
23. Legacy mood compatibility, real chart points, missing-day gaps, 7/30-day views, date editing, cancellation and confirmed removal.
24. Onboarding overflow checks at 320/360/390/430/768/1440px; Home upward-entry animation; reduced motion; empty mood history; desktop You.

## Palette regressions
25–28. All four palettes: onboarding preview matches actual Home background/hero/task colors, selected state, 320px overflow, saved data, reload, browser color-scheme, desktop hero, and unchanged 76px glass dock / gray-pill material; no page errors.
29–30. Settings at 390px and 1440px: live preview does not prematurely overwrite storage; Escape and the close button restore the saved palette; Save persists across reload; tasks and projects remain unchanged.
31. Midnight is valid in exported/imported backups; restoring a backup overrides an unsaved palette preview and retains task data.

**30 automated axe screen-state scans, zero reported WCAG 2 A/AA / 2.1 AA violations:** final setup, Settings, mobile Home and desktop Home in all four palettes (16); Midnight You, saved mood/graph, Plan, task editor, Calendar, Rituals, Projects, Browse, Focus and Search (10); desktop Midnight Calendar, Habits, Focus and You (4). Screenshots reviewed across the palettes, including dark onboarding, Home, dialogs and secondary screens. No runtime page errors during this walkthrough. Automated scans do not cover every interaction or certify accessibility.

## Additional checks
- Root and `/daylight/` production builds succeeded.
- GitHub Pages smoke (rerun with Midnight): onboarding, correct local image/font paths, saved profile, correctly scoped service worker, offline reload, desktop Focus, separate mobile layout, original illustrations available offline, and mood interaction.
- Self-contained preview (rerun with Midnight): tested inside nested `sandbox="allow-scripts"` iframes with network requests blocked. Setup, task creation, completion, Undo, Mobile/Desktop toggle and embedded images worked; no page errors or network requests.
- Previous September 22 axe WCAG 2 A/AA and 2.1 AA scans: no reported violations in all four onboarding slides, Home, all five mood states, the context slide, and the saved/check-in/trend state. Contrast and graph semantics were corrected. Older screens retain their previous checks. Automated scans are not a full accessibility certification.
- Separate 320px smoke with a long display name, long unbroken project name and long task title: Home, Plan and You did not overflow the document.
- Screenshots reviewed for the four onboarding slides, desktop onboarding, glass Home, mood selection/context/receipt, populated trend/calendar fixtures, and desktop You. Fixture mood history is QA-only, never seeded into a user workspace.
- **Headless WebKit 26.6 smoke (rerun with Midnight):** setup, glass navigation, mood context/save/reload, task completion/Undo, Calendar-to-Plan navigation, responsive overflow and desktop breakpoint; no runtime page errors.
- New image helpers, CSS, fonts and graphics are embedded in the self-contained preview. All source/Pages assets are local; the supplied Tailwind CDN and external raster-icon URLs are not runtime dependencies.

## Limitations
Not tested on physical iPhones, the actual Safari application on Apple hardware, Windows hardware, actual browser install dialogs, or every assistive technology. Headless Linux WebKit is not a substitute for those device checks. The browser dock is CSS Liquid Glass-inspired, not Apple's native adaptive material. Native keyboard, safe-area and backdrop performance should receive a physical-device pass before broader distribution.

This is a local-first web app. No cloud sync, backend, account recovery or closed-app alarm delivery is implemented. Browser storage can be cleared or evicted; export backups. In-chat preview storage may be temporary. GitHub publication has not been performed by this assistant.
