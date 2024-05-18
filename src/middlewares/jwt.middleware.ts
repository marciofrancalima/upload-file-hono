import { jwt } from "hono/jwt";

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET || "",
});

export default jwtMiddleware;
