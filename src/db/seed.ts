import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { blogs, playIdeas, playkits } from "@/db";
import blogsData from "@/data/blogs.json";
import explorationsData from "@/data/explorations.json";
import playkitsData from "@/data/playkits.json";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

async function seed() {
  console.log("Clearing existing data...");
  await db.delete(blogs);
  await db.delete(playIdeas);
  await db.delete(playkits);

  console.log("Seeding blogs...");
  for (const blog of blogsData) {
    await db.insert(blogs).values({
      slug: blog.slug,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      category: blog.category,
      ageRange: blog.ageRange,
      developmentType: blog.developmentType,
      image: blog.image,
      publishedAt: blog.publishedAt,
      seoTitle: blog.seo.title,
      seoDescription: blog.seo.description,
    }).onConflictDoNothing();
  }

  console.log("Seeding play ideas...");
  for (const idea of explorationsData) {
    await db.insert(playIdeas).values({
      slug: idea.id,
      title: idea.title,
      description: idea.description,
      benefits: idea.benefits,
      ageRange: idea.ageRange,
      developmentGoals: idea.developmentGoals,
      activityType: idea.activityType,
      estimatedTime: idea.estimatedTime,
      materials: idea.materials,
      relatedPlaykitSlug: idea.relatedPlaykitSlug ?? null,
      image: idea.image,
    }).onConflictDoNothing();
  }

  console.log("Seeding playkits...");
  for (const kit of playkitsData) {
    await db.insert(playkits).values({
      slug: kit.slug,
      name: kit.name,
      description: kit.description,
      fullDescription: kit.fullDescription,
      ageSuitability: kit.ageSuitability,
      developmentFocus: kit.developmentFocus,
      price: kit.price,
      images: kit.images,
      whatsappMessage: kit.whatsappMessage,
    }).onConflictDoNothing();
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
