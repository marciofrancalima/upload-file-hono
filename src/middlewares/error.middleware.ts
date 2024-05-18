import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { EntityAlreadyExists, EntityNotFound } from "../errors/entity.error";

/**
 * Error middleware
 */

export const errorMiddleware = createMiddleware(async (c, next) => {
  await next();

  if (c.error) {
    switch (true) {
      case c.error instanceof EntityNotFound:
        throw new HTTPException(404, { message: c.error.message });
      case c.error instanceof EntityAlreadyExists:
        throw new HTTPException(409, { message: c.error.message });
    }
  }
});
