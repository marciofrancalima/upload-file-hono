import { Hono } from "hono";

/**
 * Routes for users App
 */

const usersApp = new Hono().basePath("/users");

/**
 * Token validation (/users/*)
 */

usersApp.get("/validate-token", (c) => {
  const payload = c.get("jwtPayload");
  return c.json({ ok: true, userId: payload.id });
});

/**
 * Get user by id (/users/:userId)
 */

usersApp.get("/:userId", (c) => {
  const userData = c.get("jwtPayload");
  return c.json(userData);
});

export default usersApp;
