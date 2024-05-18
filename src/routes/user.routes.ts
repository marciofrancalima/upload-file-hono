import { Hono } from "hono";
import { createUser, getUserById, getUsers } from "../services/user.services";

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
 * Get all users (/users)
 */

usersApp.get("/", async (c) => {
  const users = await getUsers();
  return c.json(users);
});

/**
 * Get user by id (/users/:userId)
 */

usersApp.get("/:userId", (c) => {
  const userData = c.get("jwtPayload");
  return c.json(userData);
});

export default usersApp;
