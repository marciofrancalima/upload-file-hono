import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userEntity = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  createdAt: varchar("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: varchar("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const userRelation = relations(userEntity, ({ many }) => ({
  attachments: many(userAttachmentEntity),
}));

export type NewUser = typeof userEntity.$inferInsert;
export type User = typeof userEntity.$inferSelect;

export const userAttachmentEntity = pgTable("user_attachments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => userEntity.id),
  fileBucket: varchar("file_bucket").notNull(),
  fileKey: varchar("file_key").notNull(),
  fileName: varchar("file_name").notNull(),
  category: varchar("category").notNull(),
  description: varchar("description"),
  createdAt: varchar("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: varchar("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const userAttachmentRelation = relations(
  userAttachmentEntity,
  ({ one }) => ({
    user: one(userEntity, {
      fields: [userAttachmentEntity.userId],
      references: [userEntity.id],
    })
  })
);

export type NewUserAttachment = typeof userAttachmentEntity.$inferInsert;
export type UserAttachment = typeof userAttachmentEntity.$inferSelect;
