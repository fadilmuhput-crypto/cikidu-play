"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db, blogs } from "@/db"
import { eq } from "drizzle-orm"
import { createSlug } from "@/lib/utils"

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || createSlug(title)
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as string
  const ageRange = formData.get("ageRange") as string
  const developmentType = formData.get("developmentType") as string
  const seoTitle = formData.get("seoTitle") as string
  const seoDescription = formData.get("seoDescription") as string
  const publishedAt = formData.get("publishedAt") as string
  const image = formData.get("image") as string

  await db.insert(blogs).values({
    title,
    slug,
    content,
    excerpt,
    image: image || null,
    category: category || null,
    ageRange: ageRange || null,
    developmentType: developmentType || null,
    seoTitle: seoTitle || null,
    seoDescription: seoDescription || null,
    publishedAt: publishedAt || new Date().toISOString(),
  })

  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  redirect("/admin/blogs")
}

export async function updateBlog(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || createSlug(title)
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as string
  const ageRange = formData.get("ageRange") as string
  const developmentType = formData.get("developmentType") as string
  const seoTitle = formData.get("seoTitle") as string
  const seoDescription = formData.get("seoDescription") as string
  const publishedAt = formData.get("publishedAt") as string
  const image = formData.get("image") as string

  await db.update(blogs).set({
    title,
    slug,
    content,
    excerpt,
    image: image || null,
    category: category || null,
    ageRange: ageRange || null,
    developmentType: developmentType || null,
    seoTitle: seoTitle || null,
    seoDescription: seoDescription || null,
    publishedAt: publishedAt || new Date().toISOString(),
  }).where(eq(blogs.id, id))

  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${slug}`)
  redirect("/admin/blogs")
}

export async function deleteBlog(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  await db.delete(blogs).where(eq(blogs.id, id))
  revalidatePath("/admin/blogs")
  revalidatePath("/blogs")
}
