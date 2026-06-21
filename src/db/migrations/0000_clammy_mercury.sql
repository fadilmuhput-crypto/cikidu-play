CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"excerpt" text NOT NULL,
	"category" text,
	"age_range" text,
	"development_type" text,
	"image" text,
	"published_at" text,
	"seo_title" text,
	"seo_description" text,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "play_ideas" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"benefits" text[],
	"age_range" text,
	"development_goals" text[],
	"activity_type" text,
	"estimated_time" text,
	"materials" text[],
	"related_playkit_slug" text,
	"image" text,
	CONSTRAINT "play_ideas_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "playkits" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"full_description" text,
	"age_suitability" text,
	"development_focus" text[],
	"price" text,
	"images" text[],
	"whatsapp_message" text,
	CONSTRAINT "playkits_slug_unique" UNIQUE("slug")
);
