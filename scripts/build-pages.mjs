import { spawnSync } from 'node:child_process';
// Target: https://sepehrmanafi.github.io/daylight/
const env = { ...process.env, DAYLIGHT_BASE_PATH: '/daylight/', DAYLIGHT_BUILD_TARGET: 'pages' };
for (const args of [['node_modules/vite/bin/vite.js', 'build'], ['scripts/build-sw.mjs']]) {
  const result = spawnSync(process.execPath, args, { env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('GitHub Pages files are ready in docs/. Commit this folder and select main /docs in Settings → Pages.');
