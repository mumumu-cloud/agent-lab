import { test } from "node:test";
import assert from "node:assert/strict";
import { runAgent } from "../lib/agent.js";

test("detects a greeting", () => {
  const out = runAgent("안녕하세요");
  assert.equal(out.intent, "greeting");
  assert.match(out.reply, /Agent Lab/);
});

test("detects a question", () => {
  const out = runAgent("오늘 날씨는 어때?");
  assert.equal(out.intent, "question");
});

test("counts words and characters", () => {
  const out = runAgent("hello world");
  assert.equal(out.insights.words, 2);
  assert.equal(out.insights.characters, 11);
  assert.equal(out.insights.reversed, "world hello");
});

test("defaults to a statement", () => {
  const out = runAgent("this is a note");
  assert.equal(out.intent, "statement");
});
