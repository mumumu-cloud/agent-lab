import { test } from "node:test";
import assert from "node:assert/strict";
import {
  authenticate,
  createSession,
  getUserByToken,
  destroySession,
  publicUser,
  getPermissions,
} from "../lib/auth.js";

test("authenticate accepts valid sample credentials", () => {
  const user = authenticate("admin", "admin123");
  assert.ok(user);
  assert.equal(user.role, "admin");
});

test("authenticate rejects wrong password", () => {
  assert.equal(authenticate("admin", "nope"), null);
});

test("sessions resolve to a user and can be destroyed", () => {
  const user = authenticate("viewer", "viewer123");
  const token = createSession(user.id);
  assert.equal(getUserByToken(token).id, user.id);
  destroySession(token);
  assert.equal(getUserByToken(token), null);
});

test("permission matrix escalates by role", () => {
  assert.deepEqual(
    [getPermissions("viewer").download, getPermissions("downloader").download, getPermissions("admin").download],
    [false, true, true],
  );
  assert.deepEqual(
    [getPermissions("viewer").edit, getPermissions("downloader").edit, getPermissions("admin").edit],
    [false, false, true],
  );
});

test("publicUser never leaks the password", () => {
  const user = authenticate("download", "download123");
  const pub = publicUser(user);
  assert.equal("password" in pub, false);
  assert.equal(pub.permissions.label, "다운로드");
});
