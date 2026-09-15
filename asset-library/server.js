import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  authenticate,
  createSession,
  destroySession,
  getUserByToken,
  publicUser,
} from "./lib/auth.js";
import {
  CATEGORIES,
  CATEGORY_COLORS,
  ASSETS,
  queryAssets,
  categoryCounts,
} from "./lib/assets.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const viewsDir = join(__dirname, "views");
const publicDir = join(__dirname, "public");

const app = express();
app.use(express.json());

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const out = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx > -1) {
      out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return out;
}

function sessionFromReq(req) {
  const token = parseCookies(req).sid;
  const user = getUserByToken(token);
  return user ? { user, token } : null;
}

// --- Public routes ---------------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.post("/api/login", (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "");
  const user = authenticate(username, password);
  if (!user) {
    res.status(401).json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." });
    return;
  }
  const token = createSession(user.id);
  res.setHeader(
    "Set-Cookie",
    `sid=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400`,
  );
  res.json({ user: publicUser(user) });
});

app.post("/api/logout", (req, res) => {
  const session = sessionFromReq(req);
  if (session) destroySession(session.token);
  res.setHeader("Set-Cookie", "sid=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0");
  res.json({ ok: true });
});

// --- Auth guard for the rest of the API ------------------------------------

function requireAuthApi(req, res, next) {
  const session = sessionFromReq(req);
  if (!session) {
    res.status(401).json({ error: "로그인이 필요합니다." });
    return;
  }
  req.user = session.user;
  next();
}

app.get("/api/me", requireAuthApi, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

app.get("/api/categories", requireAuthApi, (_req, res) => {
  const counts = categoryCounts();
  res.json({
    categories: CATEGORIES.map((c) => ({
      ...c,
      color: CATEGORY_COLORS[c.id] || null,
      count: c.id === "ALL" ? ASSETS.length : counts[c.id] || 0,
    })),
    total: ASSETS.length,
    counts,
    colors: CATEGORY_COLORS,
  });
});

app.get("/api/assets", requireAuthApi, (req, res) => {
  const { search, category, sort, order } = req.query;
  const list = queryAssets({ search, category, sort, order });
  res.json({ assets: list, total: list.length });
});

app.get("/api/assets/:id/download", requireAuthApi, (req, res) => {
  if (!req.user.permissions?.download && !["downloader", "admin"].includes(req.user.role)) {
    res.status(403).json({ error: "다운로드 권한이 없습니다." });
    return;
  }
  const asset = ASSETS.find((a) => a.id === req.params.id);
  if (!asset) {
    res.status(404).json({ error: "파일을 찾을 수 없습니다." });
    return;
  }
  // Prototype: there is no real binary, so return a small placeholder payload.
  const payload =
    `# ${asset.fileName}\n` +
    `project: ${asset.project}\n` +
    `category: ${asset.category}\n` +
    `size: ${asset.sizeBytes} bytes (sample)\n` +
    `NOTE: This is sample prototype data, not the real asset file.\n`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodeURIComponent(asset.fileName)}.sample.txt"`,
  );
  res.send(payload);
});

// --- Static assets (css/js) ------------------------------------------------

app.use("/css", express.static(join(publicDir, "css")));
app.use("/js", express.static(join(publicDir, "js")));
app.use("/img", express.static(join(publicDir, "img")));

// --- Gated pages -----------------------------------------------------------

app.get("/login", (req, res) => {
  if (sessionFromReq(req)) {
    res.redirect("/");
    return;
  }
  res.sendFile(join(viewsDir, "login.html"));
});

app.get(["/", "/index.html"], (req, res) => {
  if (!sessionFromReq(req)) {
    res.redirect("/login");
    return;
  }
  res.sendFile(join(viewsDir, "index.html"));
});

const port = Number(process.env.PORT) || 3000;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`design-asset-library listening on http://localhost:${port}`);
  });
}

export { app };
