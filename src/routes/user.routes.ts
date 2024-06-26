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

usersApp.get("/:userId", async (c) => {
  const userId = c.req.param("userId");
  const user = await getUserById(+userId);
  return c.json(user);
});

usersApp.post("/", async (c) => {
  const { name, email } = await c.req.json();
  const newUser = await createUser({ name, email });
  return c.json({ id: newUser.id, name: newUser.name, email: newUser.email });
});

export default usersApp;
