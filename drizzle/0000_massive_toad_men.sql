CREATE TABLE IF NOT EXISTS "user_attachments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"file_bucket" varchar NOT NULL,
	"file_key" varchar NOT NULL,
	"file_name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"description" varchar,
	"created_at" varchar DEFAULT now() NOT NULL,
	"updated_at" varchar DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"created_at" varchar DEFAULT now() NOT NULL,
	"updated_at" varchar DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_attachments" ADD CONSTRAINT "user_attachments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
