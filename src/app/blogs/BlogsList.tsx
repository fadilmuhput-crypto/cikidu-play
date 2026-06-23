"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import SafeImage from "@/components/SafeImage"
import SaveButton from "@/components/SaveButton"
import type { Blog } from "@/types"

const PER_PAGE = 9

export default function BlogsList({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Cari blog..."
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-foreground/50">
          {search ? "Tidak ada blog yang cocok." : "Belum ada blog."}
        </p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-44 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center text-4xl overflow-hidden relative">
                  <SafeImage
                    src={blog.image}
                    alt={blog.title}
                    fallback="📝"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <SaveButton type="blog" slug={blog.slug} title={blog.title} />
                  </div>
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

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-primary-light/30 disabled:opacity-30 hover:bg-primary/5 transition-colors"
              >
                Sebelumnya
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                    p === page
                      ? "bg-primary text-white"
                      : "border border-primary-light/30 hover:bg-primary/5"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-primary-light/30 disabled:opacity-30 hover:bg-primary/5 transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
