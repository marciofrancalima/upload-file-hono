import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";

import usersApp from "./routes/user.routes";
import attachmentApp from "./routes/attachment.routes";

import jwtMiddleware from "./middlewares/jwt.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

/**
 * Hono App
 */

const app = new Hono().use(errorMiddleware);

/**
 * Private routes
 */

app.use("/users/*", jwtMiddleware);
app.use("/attachment/*", jwtMiddleware);

app.route("/", usersApp);
app.route("/", attachmentApp);

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
