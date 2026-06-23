import { db, blogs, playIdeas, playkits, programs } from "@/db";
import { eq, and, desc } from "drizzle-orm";

export async function getAllBlogsAdmin() {
  return db.select().from(blogs).orderBy(desc(blogs.sortOrder), desc(blogs.id));
}

export async function getAllPlayIdeasAdmin() {
  return db.select().from(playIdeas).orderBy(desc(playIdeas.sortOrder), desc(playIdeas.id));
}

export async function getAllProgramsAdmin() {
  try {
    return db.select().from(programs).orderBy(desc(programs.sortOrder), desc(programs.id))
  } catch { return [] }
}

export async function getAllPlaykitsAdmin() {
  return db.select().from(playkits).orderBy(desc(playkits.sortOrder), desc(playkits.id));
}

export async function getAllBlogs() {
  return db.select().from(blogs).where(eq(blogs.isActive, true)).orderBy(blogs.sortOrder, blogs.publishedAt);
}

export async function getBlogBySlug(slug: string) {
  const result = await db.select().from(blogs).where(and(eq(blogs.slug, slug), eq(blogs.isActive, true)));
  return result[0] ?? null;
}

export async function getAllPlayIdeas() {
  return db.select().from(playIdeas).where(eq(playIdeas.isActive, true)).orderBy(playIdeas.sortOrder);
}

export async function getPlayIdeaBySlug(slug: string) {
  const result = await db.select().from(playIdeas).where(and(eq(playIdeas.slug, slug), eq(playIdeas.isActive, true)));
  return result[0] ?? null;
}

export async function getAllPrograms() {
  try {
    return db.select().from(programs).where(eq(programs.isActive, true)).orderBy(programs.sortOrder, programs.submittedAt)
  } catch { return [] }
}

export async function getApprovedPrograms() {
  try {
    return db.select().from(programs).where(and(eq(programs.status, "approved"), eq(programs.isActive, true))).orderBy(programs.sortOrder, programs.submittedAt)
  } catch { return [] }
}

export async function getProgramBySlug(slug: string) {
  try {
    const result = await db.select().from(programs).where(and(eq(programs.slug, slug), eq(programs.isActive, true)))
    return result[0] ?? null
  } catch { return null }
}

export async function getAllPlaykits() {
  return db.select().from(playkits).where(eq(playkits.isActive, true)).orderBy(playkits.sortOrder);
}

export async function getPlaykitBySlug(slug: string) {
  const result = await db.select().from(playkits).where(and(eq(playkits.slug, slug), eq(playkits.isActive, true)));
  return result[0] ?? null;
}
