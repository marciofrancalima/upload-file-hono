import { jwt } from "hono/jwt";

const jwtConfig = jwt({
  secret: process.env.JWT_SECRET || "",
});

export default jwtConfig;
