import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";

import usersApp from "./routes/user.routes";
import attachmentApp from "./routes/attachment.routes";

import jwtConfig from "./config/jwt-config";

/**
 * Hono App
 */

const app = new Hono();

/**
 * Private routes
 */

app.use("/users/*", jwtConfig);
app.use("/attachment/*", jwtConfig);

app.route("/users", usersApp);
app.route("/attachment", attachmentApp);

/**
 * Public routes
 */

app.get("/", (c) => {
  return c.text("Welcome to Hono!");
});

const port = Number(process.env.PORT) || 3000;

serve(
  {
    fetch: app.fetch,
    port,
  },
  () => {
    console.log(`Server running on port ${port}`);
  }
);
