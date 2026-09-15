# agent-lab

A small starter lab for experimenting with agent-style request/response flows. It
ships a Node.js + Express backend and a lightweight HTML/CSS/JS frontend so you
can send a prompt and see a structured, deterministic reply — no API keys needed.

## Requirements

- Node.js 20+ (the Cloud Agent environment uses Node 22)
- npm 10+

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server with auto-reload on http://localhost:3000
```

Then open http://localhost:3000 and send a prompt.

For a plain (non-watching) server, use `npm start`.

## Project layout

```
.
├── server.js            # Express app: static hosting + JSON API
├── lib/agent.js         # Deterministic stand-in "agent" logic
├── public/              # Frontend (index.html, styles.css, app.js)
└── test/agent.test.js   # Unit tests for the agent logic
```

## API

- `GET /api/health` — liveness probe, returns `{ "status": "ok", "uptime": <seconds> }`.
- `POST /api/run` — body `{ "prompt": "<text>" }`, returns the agent's structured reply.

## Testing

```bash
npm test          # run the Node.js built-in test runner
```

## Cloud Agent environment

`.cursor/environment.json` installs dependencies with `npm install` and runs the
dev server (`npm run dev`) in a persistent `dev-server` terminal.
