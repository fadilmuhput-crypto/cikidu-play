import { getAllBlogs, getAllPlayIdeas, getAllPlaykits } from "@/db/queries"

const BASE = "https://www.cikidu.web.id"

export default async function sitemap() {
  const [blogs, ideas, kits] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllPlayIdeas().catch(() => []),
    getAllPlaykits().catch(() => []),
  ])

  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE}/blogs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/explorations`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/playkits`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ]

  const blogPages = blogs.map((b) => ({
    url: `${BASE}/blogs/${b.slug}`,
    lastModified: b.publishedAt ? new Date(b.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const kitPages = kits.map((k) => ({
    url: `${BASE}/playkits/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...kitPages]
}
