import { Hono } from "hono";
import { Upload } from "@aws-sdk/lib-storage";

import client from "../config/aws-client";

/**
 * Routes for attachment App
 */

const attachmentApp = new Hono();

/**
 * Attachment (/attachment)
 */

attachmentApp.post("/:userId", async (c) => {
  const body = await c.req.parseBody();
  const file = body["file"] as File;
  const userId = c.req.param("userId");

  const key = `${userId}/${body["category"]}/${Date.now()}-${file.name}`;

  const upload = new Upload({
    client,
    params: {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: file.type,
    },
  });

  await upload.done();

  console.log("upload done", {
    key,
    filename: file.name,
    bucket: process.env.BUCKET_NAME,
  });

  return c.json({ filename: file.name, bucket: process.env.BUCKET_NAME, key });
});

export default attachmentApp;
