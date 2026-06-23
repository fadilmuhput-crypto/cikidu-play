import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, serial, text, boolean, integer } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category"),
  ageRange: text("age_range"),
  developmentType: text("development_type"),
  image: text("image"),
  publishedAt: text("published_at"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const playIdeas = pgTable("play_ideas", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  benefits: text("benefits").array(),
  ageRange: text("age_range"),
  developmentGoals: text("development_goals").array(),
  activityType: text("activity_type"),
  estimatedTime: text("estimated_time"),
  materials: text("materials").array(),
  relatedPlaykitSlug: text("related_playkit_slug"),
  image: text("image"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  city: text("city").notNull(),
  description: text("description"),
  organizerName: text("organizer_name"),
  organizerContact: text("organizer_contact"),
  websiteUrl: text("website_url"),
  ageRange: text("age_range"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  image: text("image"),
  status: text("status").default("pending").notNull(),
  submittedAt: text("submitted_at"),
  approvedAt: text("approved_at"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const playkits = pgTable("playkits", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  fullDescription: text("full_description"),
  ageSuitability: text("age_suitability"),
  developmentFocus: text("development_focus").array(),
  price: text("price"),
  images: text("images").array(),
  whatsappMessage: text("whatsapp_message"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const customPlaykits = pgTable("custom_playkits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type"),
  eventDate: text("event_date"),
  childAge: text("child_age"),
  budget: text("budget"),
  notes: text("notes"),
  createdAt: text("created_at").notNull(),
});

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
  connect_timeout: 5,
  idle_timeout: 5,
  max_lifetime: 60,
});

export const db = drizzle(client, { schema: { blogs, playIdeas, programs, playkits, contacts, customPlaykits } });
