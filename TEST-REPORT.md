# Daylight — verification summary

Tested: September 19, 2026. Chromium headless on Linux, using the production app served over localhost. **12 / 12 automated browser tests passed.**

1. First-run personalization, starter-content opt-out, and reload persistence.
2. Task creation, quick-date/priority parsing, tags, notes, subtasks, search, editing, completion, undo, deletion.
3. Recurrence generation and board status transitions, including reopening.
4. Project creation, cover selection, task association, safe project removal.
5. Calendar navigation and date-specific task creation.
6. Habit creation, editing, daily check-ins, weekly navigation, persistence.
7. Focus start/pause/resume, time advancement, completion logging, persisted break timer.
8. Backup download, invalid-file rejection, explicit restore confirmation, restored profile.
9. Production service-worker readiness and offline reload, including local photographic assets.
10. 390px responsive onboarding/dashboard/habits layout without document overflow.
11. Monthly recurrence clamped from January 31 to February 28, and reopening through the editor.
12. Priority filters, sorting, reset, daily reflection save and reload.

Additional checks: production build succeeds; no runtime page errors in the desktop screenshot walkthrough; screenshots reviewed for onboarding, dashboard, calendar, focus, and responsive layouts.

Not claimed as tested: a physical Windows machine, Windows batch execution, actual Edge/Chrome install UI, every browser or assistive technology, long-term browser eviction behavior, cloud sync (not implemented), or native Windows notifications while closed (not implemented).
