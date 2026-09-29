# Verification evidence

The saved results are from the September 23 palette build served as a production app on localhost:4173. `browser-tests.txt` records the 31 passing Playwright tests; `palette-accessibility.json` records the 30 automated axe states and empty runtime-error list.

To repeat the functional checks: `npm ci`, `npx playwright install --with-deps chromium`, `npm run build`, start `npm start` in another terminal, then `npm test`.

With that production server running, `node verification/check-palettes.mjs` repeats the palette scans and saves screenshots here. Automated checks are not a physical-device or complete accessibility certification; see `TEST-REPORT.md` for scope and limitations.
