import Link from "next/link"
import type { Metadata } from "next"
import { getAllBlogs } from "@/db/queries"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel dan tips seputar aktivitas bermain edukatif, perkembangan anak, dan parenting.",
}

export default async function BlogsPage() {
  let blogs: Awaited<ReturnType<typeof getAllBlogs>> = []
  try { blogs = await getAllBlogs() } catch {}

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Artikel dan tips seputar aktivitas bermain, perkembangan anak, dan parenting.
        </p>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-foreground/50">Belum ada artikel.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-secondary-light/30 to-primary-light/30 flex items-center justify-center text-4xl">
                📝
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2">
                  <span>{blog.category}</span>
                  <span>•</span>
                  <span>{blog.ageRange}</span>
                </div>
                <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {blog.title}
                </h2>
                <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
