# Daylight
### A little focus. A brighter day.

A personal **web app** for tasks, focus, and everyday rituals. Desktop gets a spacious workspace; phones get a deliberately different, touch-first experience. React, Vite, and Lucide. No account, backend, API keys, or external runtime assets.

## Use Daylight

Once deployed, open the website in a browser. No installation or launcher is required. Optional PWA installation is available in compatible browsers.

For GitHub Pages, follow **GITHUB-PAGES.md**. The included `docs/` build targets the `sepehrmanafi/daylight` repository. Preparing these files does not publish or modify that repository.

For local development in VS Code:
```sh
npm ci
npm run dev
```
Use Node.js 20.19+ or a newer supported LTS. Open the local address printed by Vite. You can also serve the bundled production build with `npm start`; `Start Daylight.cmd` is an optional convenience, not a requirement for the deployed web app.

## Palettes & dark mode — September 23 update

Choose **Sunshine** (gold/cream), **Blossom** (pink/plum), **Sage** (green), or **Midnight** (dark navy with lavender). The final onboarding slide previews the actual palette immediately, including a miniature workspace. The choice carries through both layouts, task cards, navigation, forms, calendars, charts and dialogs.

For an existing workspace, open **Settings → Your everyday palette**. Changes preview live throughout the interface but are only stored with **Save preferences**. Closing Settings or pressing Escape restores the saved theme. The saved choice survives reloads and JSON export/restore; existing tasks are retained. An explicit choice is used rather than automatically following the OS theme.

Midnight uses dark surfaces and a native dark color scheme, not an image-inversion filter. Mood and project identifiers remain distinct; photographs keep their original colors. The supplied glass navigation material and gray pill are unchanged, with adaptive icon ink. Browser chrome and the initial loading background follow the saved palette.

Shared palette tokens live in `src/themes.js`; component styling is in `src/themes.css`; `src/ThemePreview.jsx` provides the onboarding and Settings preview.

## The mobile edition

At widths of 767px and below, Daylight uses its own layout rather than a compressed sidebar:
- **Home:** illustrated 3D hero, selectable week, priority task cards, real progress, journal and ritual cards, photographic project carousel.
- **Plan:** segmented All/Today/Upcoming/Done filters, priority filtering, list/board views, touch-friendly status selectors.
- **Floating glass dock:** the supplied `liqid glass.html` material, bevel, rim, flat gray pill and spring, with Daylight’s Home/Plan/Add/Focus/You icons. Tap a destination or drag the selected pill. Responsive sizing, safe-area placement, real navigation and an optional opaque fallback. This is CSS, not Apple’s native material.
- **You:** an expressive five-state mood slider, optional context and notes, saved daily check-ins, 7/30-day mood graphs, a monthly mood calendar, real completion totals, reflection and rituals. Mood check-ins/trends are also available from the desktop sidebar.
- **Browse:** all tasks, Inbox, Upcoming, Calendar, Projects, Rituals, Completed, Settings.
- **Bottom sheets:** shared editors with focus trapping, background locking, comfortable fields and explicit close controls.
- **Check-off motion:** checkmark draw/pop, expanding ring, twelve soft particles, brief card glow, then the completed card leaves an active-only list. Changes save immediately; Undo removes the next recurring occurrence correctly.
- **Comfort:** Reduce Motion support, optional celebrations, solid mobile navigation, and 16px mobile form fields. Desktop features and keyboard shortcuts remain available.

The standalone `Daylight.html` preview is an optional self-contained copy. Its sandboxed in-chat session may be temporary; use the deployed app and regular JSON backups for actual work.

## Your first visit

The setup appears once per browser profile / origin and directly affects your workspace:

| Question | What actually changes |
| --- | --- |
| Your name | Greeting, avatar initials, and profile |
| Work, personal, or both | Suggested life areas on the next step |
| Areas of life | Creates your selected projects with distinct covers and colors |
| Daily goal | Sets the daily completion target and progress indicator |
| Focus rhythm | Sets 15-, 25-, or 50-minute focus sessions |
| Preferred focus moment | Adds a Morning/Afternoon/Evening cue to Home; editable in Settings. It does not schedule notifications. |
| Your palette | Changes the whole mobile and desktop UI: backgrounds, hero, cards, sidebar/navigation, buttons, forms and dialogs; previews immediately |
| Starter inspiration | Optionally adds editable example tasks and everyday rituals |

You can edit preferences later. Setup is not repeated on ordinary reloads. Clearing browser data or using a different browser/origin creates a fresh workspace.

## Working features

- Today, Inbox, Upcoming, Completed, and All tasks views.
- Create, edit, complete, reopen, and delete tasks, with undo for task deletion and completion.
- Notes, subtasks, tags, priorities, dates, and daily / weekly / monthly recurrence.
- Lightweight quick capture: `today`, `tomorrow`, and priority tokens `p1`, `p2`, `p3` in a task title. This is a small deterministic parser, not AI or general natural-language processing.
- Visual project covers, colors, project editing, and safe removal (tasks move to Inbox).
- List and Kanban views; drag cards between statuses or use each card's status selector.
- Priority/project filters, sorting, and task/project search.
- Month calendar with day selection, month navigation, task details, and dated task creation.
- Focus room with persistent timer, start/pause/reset, short breaks, selectable task, three photographic scenes, optional generated brown noise, and completed-session statistics.
- Habit creation, editing, removal, daily check-ins, weekly history, and desktop streak summaries.
- Daily reflections and mobile mood check-ins that save locally by date.
- Four app-wide palettes: Sunshine, Blossom, Sage and the dark Midnight theme.
- Keyboard shortcuts: **N** adds a task; **Ctrl+K** searches; **Esc** closes dialogs.
- Local persistence, JSON backup export, validated restore with explicit replacement confirmation.
- Offline app shell, self-hosted fonts/images, installable manifest, separate desktop and mobile layouts.

## Important data notes

Data is stored in this browser's **localStorage**, not in a cloud account. It is not encrypted storage and should not be used for secrets. No cloud sync, collaboration, external calendar connection, remote push service, or account recovery is included.

**Export backups regularly from Settings.** Clearing site data removes the workspace. An installed app and browser tab share data only when they use the same browser profile and origin. The preview URL, another deployment, and your local Windows copy are different origins: use export/restore to move between them. Avoid editing the same workspace simultaneously in multiple tabs.

Offline use requires a successful online visit to the production build first. Service workers need HTTPS, or localhost. A running timer is calculated from wall-clock time and resumes accurately; if the app is closed, its completion is recorded when you reopen it. The app does not promise background Windows alarms while closed. Brown noise stops when you leave the Focus view.

Recurring tasks create the next occurrence when checked complete. Reopening or undoing removes that generated next occurrence. Monthly recurrence clamps to the last available day of the next month. Calendar planning is date-based, not an hourly scheduling system.

## Develop

```sh
npm install
npm run dev
```

Vite listens on `0.0.0.0:5173` by default and permits the preview hostname. All browser asset URLs are relative to the same origin; no runtime CDN dependency.

```sh
npm run build  # Creates dist and the persistent web-release folder, including the service worker
npm start      # Serves web-release at http://localhost:4173
```

To serve on another host or port, set `HOST` and `PORT`. On a public deployment, serve the contents of `web-release` at the root of an HTTPS origin. Serve `index.html` for extensionless SPA paths. Keep `sw.js` and `index.html` non-immutable; hashed assets can be cached long-term.

## Tests

```sh
npx playwright install --with-deps chromium
# In one terminal:
npm start
# In another:
npm test
```

The twelve browser tests cover onboarding personalization and persistence, task CRUD/subtasks/search, recurrence and board status, projects, calendar creation, habits, timer completion, backup restore, offline operation, and responsive layout. Set `TEST_URL` to test another running deployment.

## Research and imagery

See `RESEARCH.md` and `ASSET-CREDITS.md`. Your screenshots were used for design direction, not copied into the interface. The sunny studio and daisy images are AI-generated. Other photography is locally bundled from Unsplash; see the credits and licensing note before wider publication.

## Source map
- `src/main.jsx`: shared state, onboarding, desktop views, editors, persistence, timer and backup validation.
- `src/Mobile.jsx`: independent mobile navigation and page hierarchy.
- `src/motion.jsx`: media preference hook and nonblocking task celebrations.
- `src/style.css`: desktop/shared visual system.
- `src/mobile.css`: mobile visual system, glass material, sheets, motion, accessibility fallbacks.
- `public/images`: locally bundled photography and original illustrations.
- `tests`: desktop and mobile browser regressions. See `TEST-REPORT.md` for verified scope and limitations.

## September 22: a more expressive first visit and personal space

- Four illustrated, swipeable onboarding slides with Back/Next, progress dots, keyboard support, defaults, and persisted answers. Existing workspaces are not forced through setup again.
- Staggered upward entrance for Home’s header, cards, content modules and mobile dock. Reduced Motion and the existing motion preference remain respected.
- Mood selection is a draft until **Save check-in**. Optional context tags and a note (up to 1,000 characters) sit on the second slide. A saved receipt confirms the change.
- One editable check-in per local date. Use the date control or mood calendar to revisit a past day. Future dates cannot be logged. Removal requires confirmation.
- The chart connects only consecutive recorded days. Blank days remain blank. 7/30-day summaries, selected-point details and a monthly color calendar use real entries only; no mood sample history is inserted into the app.
- Existing `moods` maps remain compatible. Optional `moodDetails` stores note/tags/time. JSON export/restore includes both. These are personal reflection tools, not clinical scores, diagnoses or causal analyses.

New modules: `src/Journey.jsx`, `src/GlassNav.jsx`, `src/MoodSpace.jsx`, `src/experience.css`. The unmodified user-supplied navigation source is archived in `references/liqid glass.html`; its CDN/image URLs are not used by the running app.

To see the welcome slides on an existing installation, use a separate private/incognito tab rather than deleting your workspace. Keep the regular tab for your existing tasks.
