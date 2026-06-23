CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text,
	"message" text NOT NULL,
	"created_at" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "custom_playkits" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"event_type" text,
	"event_date" text,
	"child_age" text,
	"budget" text,
	"notes" text,
	"created_at" text NOT NULL
);
