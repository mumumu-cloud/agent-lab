import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { runAgent } from "./lib/agent.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.post("/api/run", (req, res) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt : "";
  if (prompt.trim() === "") {
    res.status(400).json({ error: "prompt is required" });
    return;
  }
  res.json(runAgent(prompt));
});

const port = Number(process.env.PORT) || 3000;

// Only listen when run directly, so tests can import the app/agent without a live server.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`agent-lab listening on http://localhost:${port}`);
  });
}

export { app };
