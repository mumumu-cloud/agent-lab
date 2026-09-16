import serverless from "serverless-http";
import { app } from "../../server.js";

// Wrap the same Express app used for local dev so the API runs as a Netlify
// Function. netlify.toml rewrites `/api/*` to this function; here we map the
// function path back to the Express `/api/*` routes.
const slsHandler = serverless(app);

export const handler = async (event, context) => {
  if (typeof event.path === "string") {
    event.path = event.path.replace(/^\/\.netlify\/functions\/api/, "/api") || "/api";
  }
  return slsHandler(event, context);
};
