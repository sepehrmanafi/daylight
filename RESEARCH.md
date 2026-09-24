# Product research → Daylight decisions

Research conducted September 19, 2026. This is a selected, implemented set for a personal Windows-first app, not a claim to reproduce every feature of an enterprise product.

## Task management

**Todoist — getting started and effective use**
- https://todoist.com/getting-started
- https://www.todoist.com/inspiration/how-to-use-todoist-effectively

These official guides emphasize task capture, projects, dates, subtasks, priorities, Inbox/Today/Upcoming, list/board/calendar perspectives, recurring tasks, search, and customization. Daylight incorporates those useful personal-workflow patterns without adding team administration.

**TickTick — official features**
- https://ticktick.com/features

TickTick combines tasks, smart organization, calendar planning, multiple views, Pomodoro focus sessions, and habits. Daylight brings task-linked focus sessions and daily rituals into the same workspace. Integrations, remote notifications, location reminders, and external calendar sync are deliberately not claimed or implemented.

## First-run setup

**UX That Converts — Todoist onboarding teardown (historical example, November 2022)**
- https://www.uxthatconverts.com/onboarding-teardown-of-task-management-app-todoist/

The teardown documents usage-type and experience questions, visible progress, tailored defaults, and personalized example projects/tasks. It is evidence of a documented flow, not a claim that Todoist's current 2026 screens ask exactly the same questions.

**Asana onboarding walkthrough (historical third-party example, September 2024)**
- https://medium.com/@strana/never-miss-a-deadline-step-by-step-onboarding-process-in-asana-for-individuals-and-teams-cfb4b9f0c46c

The walkthrough describes selecting a main purpose, defining an initial project, and choosing a view. Daylight uses purpose and areas of life to create an actionable starting space.

## Questions selected for this app

Rather than copying subjective questions like “Are you a productivity pro?”, Daylight asks concrete preferences it can actually use: name, purpose, projects, realistic daily target, focus duration, and palette. Optional starter content makes the app understandable without inventing fake progress. The daily target, focus length, and atmosphere questions are our design choices, not attributed as exact questions used by competitors.

## Visual interpretation

The user's references suggest warm cream, butter yellow, pink, sage, lavender, rounded modules, bold typography, playful abstract forms, and a wellness-oriented atmosphere. Daylight adapts that direction to a desktop sidebar, a spacious visual dashboard, first-run editorial layouts, photographed project cards, and a full-bleed focus room. The app is an original composition, not a recreation of any screenshot.


## Mobile redesign — September 21, 2026

Research informed the interaction patterns; the final aesthetic is an original interpretation of the supplied screenshots, not a pixel-for-pixel copy.

| Official source | Observed guidance / pattern | Daylight adaptation |
| --- | --- | --- |
| [Todoist: introduction to tasks](https://www.todoist.com/help/articles/introduction-to-tasks-080OAXric) | Mobile quick-add, task details, organizing via Browse | Reachable central capture, task cards opening shared details, secondary destinations in a Browse sheet |
| [Things for Apple Watch](https://culturedcode.com/things/watch/) | Check-off accomplishment feedback and progress ring | Brief nonblocking completion reward and real daily progress. This source is Watch-specific, not evidence of an identical iPhone UI. |
| [Things iPhone release notes](https://culturedcode.com/things/support/articles/2409121/) | Historical checkbox-animation and touch-target refinements | Brief retention of a completed card before removal and generous check targets |
| [Apple WWDC25: Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) | A floating control layer distinct from colorful content; rounded, fluid interactions; regular versus clear material and legibility considerations | A restrained ivory glass dock over colorful content, a moving selection lens, one accented quick-add action, solid fallback. CSS cannot reproduce native adaptive material exactly. |
| [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion) | Purposeful, brief feedback; status must not rely on motion alone; respect motion preferences | Save immediately, animate briefly, show checked state and textual status, retain Undo; honor OS Reduce Motion and an app preference |

### Mobile composition decisions
- Separate mobile route components at <=767px; reuse data and editors, not the desktop information hierarchy.
- Five reachable dock controls. Less-frequent views live in Browse instead of overcrowding navigation.
- Lavender 3D hero, yellow/blue task cards, illustrated journal/ritual tiles, mood faces, photographic projects and an immersive portrait Focus room.
- Selected dates actually control daily plans and new-task dates. Mood, reflections and charts are backed by local data; no fake completion history.
- A 720ms visual retention window allows checkmark recognition without delaying the write; soft ring/particles finish within one second. Reduced-motion mode has no retention delay.
- No external animation library or scroll listener; transform/opacity-based particles and navigation transitions. Backdrop blur is constrained to the small dock.

These are design choices informed by documented patterns, not claims of improved conversion, engagement, or measured user-study results.


## Onboarding, supplied glass, and emotional check-ins — September 22, 2026

### Questions that do useful work

The documented Headspace flow asks about experience, motivation, a suitable session length and an existing routine, then recaps the choices. This is a historical onboarding example, not a claim about the exact current app screens: [1](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence).

Daylight adapts those *types* of questions to a task manager:
- **Why are you here?** Work, personal life, or both → suggested starting projects.
- **What matters to you?** Life areas → actual projects, not unused survey data.
- **What feels manageable?** Daily goal and 15/25/50 minutes → real progress target and focus timer.
- **When does focus fit?** Morning, afternoon, evening or anytime → the Home cue, not an unimplemented reminder promise.
- **What feels like you?** Palette and optional examples → actual workspace appearance/content.

Name is optional, answers persist when going back, default values let users skip safely, and onboarding is only for a fresh workspace. Four slides keep the flow bounded rather than introducing unnecessary health, demographic or personality questions.

### Mood input and real history

The [official Daylio site](https://daylio.net/) describes choosing a mood, adding activities/notes, and exploring mood lines and a calendar/pixel view. This informed quick mood capture plus optional context, followed by visual history.

Bearable’s official guidance emphasizes collecting sufficient observations, comparing recorded days carefully and reflecting on confounders: [1](https://bearable.app/support/howto/how-to-find-correlations/). Daylight therefore **does not infer causes or make health predictions**. Its context summary counts tags; it is not a correlation engine.

Implemented: five named feelings, animated expressions/colors, keyboard/touch range input, a second optional context slide, explicit Save, one editable entry per local day, notes, 7/30-day charts, visible gaps, selected-point details, a monthly mood calendar, and confirmed removal. Existing moods remain valid; future days are unavailable. Fixture mood histories used for QA screenshots are never shipped as user data.

### Your supplied navigation code

The material values in `liqid glass.html` are retained: 12% white, blur(12px), saturate(180%), brightness(1.05), the original specular bevel shadows and outer rim, 42% gray indicator, 76px bar / 58px indicator, and spring curve. Daylight’s five existing Lucide icons, their navigation order and app-colored strokes replace the external raster icons. Tailwind utility layout is expressed in local CSS so the web app stays offline-capable; accessible names, real route actions, responsive width and safe-area placement are added. Dragging the active control previews a target and navigates on release; crossing Add during a drag does not open it prematurely. Cancelled drags do not navigate. The existing opaque/reduced-transparency option remains an opt-in accessibility fallback.

### Motion decisions

Home modules rise in a short staggered sequence; illustrations enter softly; slides translate horizontally; mood eyes/mouth/color transition with the selection; saved check-ins have a brief checkmark arrival; actual chart segments draw in. Task check-off celebrations remain nonblocking. No perpetual auto-advancing carousel, flashing effects or forced haptics. OS Reduce Motion and the app’s motion preference suppress nonessential motion.


## September 23: whole-interface palettes

The user requested unmistakable palette changes and an explicit dark option. Shared semantic tokens now cover background, surface, raised panels, text, borders, hero, task cards, selected states and controls. The same tokens drive the setup preview and actual workspace, avoiding a misleading decorative swatch. Midnight is an explicit stored preference, not a color inversion or an automatic OS override. Settings previews are cancellable and only committed on Save. Existing photo assets, semantic mood/project colors and the supplied glass material are retained. Contrast was checked with automated axe scans in 30 screen/palette states; this is not a complete accessibility certification.
