import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// The prototype is a fully static site (embedded sample data + client-side
// auth) so it deploys reliably on static hosts like Netlify. This tiny server
// is only for local development — it serves the public/ directory.
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "public");

const app = express();

app.get("/login", (_req, res) => {
  res.sendFile(join(publicDir, "login.html"));
});

app.use(express.static(publicDir, { extensions: ["html"] }));

app.get("*", (_req, res) => {
  res.sendFile(join(publicDir, "index.html"));
});

const port = Number(process.env.PORT) || 3000;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`design-asset-library (static) on http://localhost:${port}`);
  });
}

export { app };
