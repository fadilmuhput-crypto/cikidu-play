import { getAllBlogs, getAllPlayIdeas, getAllPlaykits, getApprovedPrograms } from "@/db/queries"

const BASE = "https://www.cikidu.web.id"

export default async function sitemap() {
  const [blogs, ideas, kits, programs] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllPlayIdeas().catch(() => []),
    getAllPlaykits().catch(() => []),
    getApprovedPrograms().catch(() => []),
  ])

  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE}/blogs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/explorations`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/playkits`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/programs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/tentang-kami`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
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

  const ideaPages = ideas.map((i) => ({
    url: `${BASE}/explorations/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const programPages = programs.map((p) => ({
    url: `${BASE}/programs/${p.slug}`,
    lastModified: p.approvedAt ? new Date(p.approvedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...ideaPages, ...kitPages, ...programPages]
}
