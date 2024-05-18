import { Hono } from "hono";

import {
  AttachmentUploadRequest,
  downloadAttachment,
  listAttachments,
  uploadUserAttachment,
} from "../services/attachment.services";

/**
 * Routes for attachment App
 */

const attachmentApp = new Hono().basePath("/attachment");

attachmentApp.get("/:userId", async (c) => {
  const userId = parseInt(c.req.param("userId"));
  const result = await listAttachments(userId);

  return c.json({ success: true, data: result });
});

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
