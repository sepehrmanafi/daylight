# Daylight

A personal React + Vite task manager with a pastel visual design, first-run personalization, tasks and projects, list/board/calendar views, focus sessions, habits, reflections, and local backups.

## Publish on GitHub Pages

This repository package is configured for **sepehrmanafi/daylight**.

The prebuilt website is in **docs/**. After uploading this package, choose **Settings → Pages → Deploy from a branch → main → /docs → Save**.

Read **[GITHUB-PAGES.md](GITHUB-PAGES.md)** for click-by-click instructions. The future site address is **https://sepehrmanafi.github.io/daylight/**; it will work only after a successful deployment.

## Edit in VS Code

Install a current Node.js LTS (22.12+ or 24 recommended). Open this folder in VS Code, then:

```sh
npm ci
npm run dev
```

Open the local URL Vite prints, normally http://localhost:5173.

- `src/main.jsx`: app functionality and screens
- `src/style.css`: visual design and responsive layouts
- `src/fonts.css`: locally served font declarations
- `public/`: images, fonts, app icons and manifest
- `docs/`: prebuilt GitHub Pages website; regenerate rather than manually editing it

For Windows PowerShell errors about `npm.ps1`, use `npm.cmd ci` and `npm.cmd run dev` or switch to a Command Prompt terminal.

## Update the published website

```sh
npm run build:pages
```

Commit/push the updated **docs/** folder and source. Pages redeploys changes from `main` / `docs`.

For a root-path production build instead:

```sh
npm run build
npm start
```

This serves the root-path build at http://localhost:4173. The root build and GitHub Pages build have different asset base paths; do not manually substitute one for the other.

## Tests

Start the root production build with `npm start` in one terminal, then in another:

```sh
npx playwright install chromium
npm test
```

The original app passed twelve browser tests. The GitHub Pages build was additionally checked at `/daylight/` for onboarding, image/font loading, storage persistence, the scoped service worker, offline reload, and the focus room. This is local verification, not proof of a deployed public GitHub website.

## Privacy

Tasks and preferences persist in browser localStorage. No backend, API keys, accounts, or cloud synchronization are required. Export backups before clearing site data or moving between URLs. Different origins have separate workspaces.

See `ASSET-CREDITS.md`, `RESEARCH.md`, and `licenses/` for imagery, product research, and font/icon licenses.
