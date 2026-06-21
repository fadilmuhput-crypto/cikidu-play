"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import SafeImage from "@/components/SafeImage"
import type { Blog } from "@/types"

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return blogs
    const q = search.toLowerCase()
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.category || "").toLowerCase().includes(q),
    )
  }, [blogs, search])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-foreground/50">
        Memuat...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Tips, inspirasi, dan wawasan seputar tumbuh kembang anak.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari blog..."
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-foreground/50">
          {search ? "Tidak ada blog yang cocok." : "Belum ada blog."}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-44 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center text-4xl overflow-hidden">
                <SafeImage
                  src={blog.image}
                  alt={blog.title}
                  fallback="📝"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                {(blog.category || blog.ageRange) && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {blog.category && (
                      <span className="text-xs bg-accent-light/50 px-2 py-0.5 rounded-full">
                        {blog.category}
                      </span>
                    )}
                    {blog.ageRange && (
                      <span className="text-xs text-foreground/50">{blog.ageRange}</span>
                    )}
                  </div>
                )}
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
