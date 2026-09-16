import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ASSETS,
  CATEGORIES,
  queryAssets,
  categoryCounts,
  categoriesWithCounts,
  fileExtension,
  authenticate,
  publicUser,
  getPermissions,
} from "../public/js/sample-data.js";

test("catalog has sample assets across every category", () => {
  assert.ok(ASSETS.length >= 20);
  const cats = new Set(ASSETS.map((a) => a.category));
  for (const c of CATEGORIES.filter((c) => c.id !== "ALL")) {
    assert.ok(cats.has(c.id), `expected assets in category ${c.id}`);
  }
});

test("category filter narrows results", () => {
  const all = queryAssets({ category: "ALL" });
  const dfas = queryAssets({ category: "DFAS" });
  assert.equal(all.length, ASSETS.length);
  assert.ok(dfas.length > 0);
  assert.ok(dfas.every((a) => a.category === "DFAS"));
});

test("search matches file name or project name", () => {
  assert.ok(queryAssets({ search: "로고" }).length > 0);
  const yt = queryAssets({ search: "유튜브" });
  assert.ok(yt.length > 0 && yt.every((a) => /유튜브/.test(a.fileName + a.project)));
});

test("sort by size respects order", () => {
  const asc = queryAssets({ sort: "size", order: "asc" });
  const desc = queryAssets({ sort: "size", order: "desc" });
  assert.ok(asc[0].sizeBytes <= asc[asc.length - 1].sizeBytes);
  assert.ok(desc[0].sizeBytes >= desc[desc.length - 1].sizeBytes);
});

test("category counts sum to total, and ALL count matches", () => {
  const counts = categoryCounts();
  const sum = Object.values(counts).reduce((a, b) => a + b, 0);
  assert.equal(sum, ASSETS.length);
  const all = categoriesWithCounts().find((c) => c.id === "ALL");
  assert.equal(all.count, ASSETS.length);
});

test("fileExtension extracts the extension", () => {
  assert.equal(fileExtension("logo_v2.SVG"), "svg");
  assert.equal(fileExtension("noext"), "");
});

test("authentication + permission matrix by role", () => {
  assert.equal(authenticate("admin", "admin123").role, "admin");
  assert.equal(authenticate("admin", "nope"), null);
  const pub = publicUser(authenticate("download", "download123"));
  assert.equal("password" in pub, false);
  assert.equal(pub.permissions.label, "다운로드");
  assert.deepEqual(
    [getPermissions("viewer").download, getPermissions("downloader").download, getPermissions("admin").edit],
    [false, true, true],
  );
});
