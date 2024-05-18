import { Upload } from "@aws-sdk/lib-storage";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import client from "../config/aws-client";
import { dbClient } from "../db/db-client";
import { userAttachmentEntity } from "../db/schemas";
import { EntityNotFound } from "../errors/entity.error";

export async function listAttachments(userId: number) {
  const user = await dbClient.query.userEntity.findFirst({
    where: (user, op) => op.eq(user.id, userId),
  });

  if (!user) {
    throw new EntityNotFound("User not found");
  }

  return await dbClient.query.userAttachmentEntity.findMany({
    where: (attachments, op) => op.eq(attachments.userId, userId),
  });
}

export type AttachmentUploadRequest = {
  userId: number;
  file: File;
  filename: string;
  category: string;
  description?: string;
};

export async function uploadUserAttachment(
  attachmentData: AttachmentUploadRequest
) {
  const key = `${attachmentData.userId}/${
    attachmentData.category
  }/${Date.now()}-${attachmentData.file.name}`;

  const upload = new Upload({
    client,
    params: {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Body: attachmentData.file,
      ContentType: attachmentData.file.type,
    },
  });

  await upload.done();

  const [newUserAttachment] = await dbClient
    .insert(userAttachmentEntity)
    .values({
      userId: +attachmentData.userId,
      fileBucket: process.env.BUCKET_NAME!,
      fileKey: key,
      fileName: attachmentData.filename,
      category: attachmentData.category,
      description: attachmentData.description,
    })
    .returning();

  return newUserAttachment;
}

export async function downloadAttachment(userId: number, attachmentId: number) {
  const attachment = await dbClient.query.userAttachmentEntity.findFirst({
    where: (attachment, op) =>
      op.and(
        op.eq(attachment.userId, userId),
        op.eq(attachment.id, attachmentId)
      ),
  });

  if (!attachment) {
    throw new EntityNotFound("Attachment not found");
  }

  const command = new GetObjectCommand({
    Bucket: attachment.fileBucket,
    Key: attachment.fileKey,
  });

  const signedUrl = await getSignedUrl(client, command);

  return signedUrl;
}
