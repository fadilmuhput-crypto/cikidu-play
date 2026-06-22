CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"city" text NOT NULL,
	"description" text,
	"organizer_name" text,
	"organizer_contact" text,
	"website_url" text,
	"age_range" text,
	"start_date" text,
	"end_date" text,
	"image" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"submitted_at" text,
	"approved_at" text,
	CONSTRAINT "programs_slug_unique" UNIQUE("slug")
);
