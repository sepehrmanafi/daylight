// Zero-dependency server for the prebuilt Windows-friendly web app.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../web-release",
);
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
};
if (!fs.existsSync(path.join(root, "index.html"))) {
  console.error(
    "The web-release folder is missing. Run npm install and npm run build first.",
  );
  process.exit(1);
}
const server = http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://daylight.local").pathname,
    );
    let target = path.resolve(root, "." + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    if (pathname.endsWith("/")) target = path.join(target, "index.html");
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      if (!path.extname(pathname)) target = path.join(root, "index.html");
      else {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
    }
    const ext = path.extname(target);
    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": pathname.startsWith("/assets/")
        ? "public,max-age=31536000,immutable"
        : "no-cache",
      "Service-Worker-Allowed": "/",
      "X-Content-Type-Options": "nosniff",
    });
    if (req.method === "HEAD") res.end();
    else fs.createReadStream(target).pipe(res);
  } catch {
    res.writeHead(400);
    res.end("Bad request");
  }
});
server.on("error", (e) => {
  console.error(
    e.code === "EADDRINUSE"
      ? `Port ${port} is already in use. Daylight may already be open at http://localhost:${port}`
      : e.message,
  );
  process.exit(1);
});
server.listen(port, host, () => {
  console.log(
    `Daylight is ready at http://localhost:${port}\nKeep this window open while using the app. Press Ctrl+C to stop.`,
  );
  if (process.platform === "win32" && process.env.OPEN_BROWSER === "1")
    execFile("cmd", ["/c", "start", "", "http://localhost:" + port]);
});
