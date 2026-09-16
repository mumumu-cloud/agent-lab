import crypto from "node:crypto";

/**
 * Sample-only user directory for the prototype. These are fictional demo
 * accounts, NOT real credentials. Do not use for anything real.
 */
const users = [
  {
    id: "u_viewer",
    username: "viewer",
    password: "viewer123",
    name: "김보기",
    team: "브랜드디자인팀",
    role: "viewer",
  },
  {
    id: "u_download",
    username: "download",
    password: "download123",
    name: "이다운",
    team: "콘텐츠제작팀",
    role: "downloader",
  },
  {
    id: "u_admin",
    username: "admin",
    password: "admin123",
    name: "박관리",
    team: "디자인애셋운영",
    role: "admin",
  },
];

/** Permission matrix for the three access levels. */
export const PERMISSIONS = {
  viewer: { view: true, download: false, edit: false, label: "보기" },
  downloader: { view: true, download: true, edit: false, label: "다운로드" },
  admin: { view: true, download: true, edit: true, label: "관리자" },
};

/**
 * Stateless, signed-cookie sessions so auth works on serverless platforms
 * (e.g. Netlify Functions) where in-memory state is not shared across
 * invocations. The token is `<userId>.<HMAC(userId)>`. For this prototype a
 * safe default secret is used; set SESSION_SECRET to override in deployment.
 */
const SECRET = process.env.SESSION_SECRET || "agent-lab-prototype-secret";

function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("base64url");
}

export function authenticate(username, password) {
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  return user || null;
}

export function createSession(userId) {
  return `${userId}.${sign(userId)}`;
}

export function destroySession() {
  // Stateless: invalidation happens by clearing the cookie on the client.
}

export function getUserByToken(token) {
  if (!token || typeof token !== "string") return null;
  const idx = token.lastIndexOf(".");
  if (idx <= 0) return null;
  const userId = token.slice(0, idx);
  const signature = token.slice(idx + 1);
  const expected = sign(userId);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }
  return users.find((u) => u.id === userId) || null;
}

export function getPermissions(role) {
  return PERMISSIONS[role] || PERMISSIONS.viewer;
}

/** Shape safe to send to the client (never includes the password). */
export function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    team: user.team,
    role: user.role,
    permissions: getPermissions(user.role),
  };
}
