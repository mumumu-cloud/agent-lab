import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ASSETS,
  CATEGORIES,
  queryAssets,
  categoryCounts,
  fileExtension,
} from "../lib/assets.js";

test("catalog has sample assets across categories", () => {
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
  const byFile = queryAssets({ search: "로고" });
  assert.ok(byFile.length > 0);
  const byProject = queryAssets({ search: "유튜브" });
  assert.ok(byProject.every((a) => /유튜브/.test(a.fileName + a.project)));
});

test("sort by size respects order", () => {
  const asc = queryAssets({ sort: "size", order: "asc" });
  const desc = queryAssets({ sort: "size", order: "desc" });
  assert.ok(asc[0].sizeBytes <= asc[asc.length - 1].sizeBytes);
  assert.ok(desc[0].sizeBytes >= desc[desc.length - 1].sizeBytes);
});

test("categoryCounts sums to total asset count", () => {
  const counts = categoryCounts();
  const sum = Object.values(counts).reduce((a, b) => a + b, 0);
  assert.equal(sum, ASSETS.length);
});

test("fileExtension extracts the extension", () => {
  assert.equal(fileExtension("logo_v2.SVG"), "svg");
  assert.equal(fileExtension("noext"), "");
});
