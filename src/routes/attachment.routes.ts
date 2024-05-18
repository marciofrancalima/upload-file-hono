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
 * Upload attachment (/attachment/:userId)
 */

attachmentApp.post("/:userId", async (c) => {
  const body = await c.req.parseBody();
  const file = body["file"] as File;
  const userId = parseInt(c.req.param("userId"));

  const attachmentData: AttachmentUploadRequest = {
    userId,
    file,
    filename: file.name,
    category: String(body["category"]),
    description: String(body["description"]),
  };

  const result = await uploadUserAttachment(attachmentData);

  return c.json({ success: true, data: result });
});

attachmentApp.get(":userId/:attachmentId", async (c) => {
  const { userId, attachmentId } = c.req.param();
  const url = await downloadAttachment(+userId, +attachmentId);

  return c.redirect(url);
});

export default attachmentApp;
