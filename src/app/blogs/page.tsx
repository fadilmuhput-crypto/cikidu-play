import type { Metadata } from "next"
import { getAllBlogs } from "@/db/queries"
import BlogsList from "./BlogsList"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Tips, inspirasi, dan wawasan seputar tumbuh kembang anak.",
}

export default async function BlogPage() {
  const blogs = await getAllBlogs()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Tips, inspirasi, dan wawasan seputar tumbuh kembang anak.
        </p>
      </div>

      <BlogsList blogs={blogs} />
    </div>
  )
}
