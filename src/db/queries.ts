import { db } from "./index";
import { blogs, playIdeas, playkits } from "./schema";
import { eq } from "drizzle-orm";

export async function getAllBlogs() {
  return db.select().from(blogs).orderBy(blogs.publishedAt);
}

export async function getBlogBySlug(slug: string) {
  const result = await db.select().from(blogs).where(eq(blogs.slug, slug));
  return result[0] ?? null;
}

export async function getAllPlayIdeas() {
  return db.select().from(playIdeas);
}

export async function getPlayIdeaBySlug(slug: string) {
  const result = await db.select().from(playIdeas).where(eq(playIdeas.slug, slug));
  return result[0] ?? null;
}

export async function getAllPlaykits() {
  return db.select().from(playkits);
}

export async function getPlaykitBySlug(slug: string) {
  const result = await db.select().from(playkits).where(eq(playkits.slug, slug));
  return result[0] ?? null;
}
