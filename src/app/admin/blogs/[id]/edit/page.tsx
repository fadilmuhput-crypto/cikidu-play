import { notFound } from "next/navigation"
import { db } from "@/db/index"
import { blogs } from "@/db/schema"
import { eq } from "drizzle-orm"
import BlogForm from "../../BlogForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params
  const blog = await db.select().from(blogs).where(eq(blogs.id, parseInt(id)))
  if (!blog[0]) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <BlogForm blog={blog[0]} />
    </div>
  )
}
