"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db, playIdeas } from "@/db"
import { eq } from "drizzle-orm"
import { createSlug } from "@/lib/utils"

function parseArray(value: string | null): string[] | null {
  if (!value) return null
  const arr = value.split("\n").map(s => s.trim()).filter(Boolean)
  return arr.length > 0 ? arr : null
}

export async function createPlayIdea(formData: FormData) {
  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || createSlug(title)
  const description = formData.get("description") as string
  const ageRange = formData.get("ageRange") as string
  const activityType = formData.get("activityType") as string
  const estimatedTime = formData.get("estimatedTime") as string
  const relatedPlaykitSlug = formData.get("relatedPlaykitSlug") as string
  const benefits = parseArray(formData.get("benefits") as string)
  const developmentGoals = parseArray(formData.get("developmentGoals") as string)
  const materials = parseArray(formData.get("materials") as string)
  const image = formData.get("image") as string
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0

  await db.insert(playIdeas).values({
    title, slug, description: description || null,
    ageRange: ageRange || null, activityType: activityType || null,
    estimatedTime: estimatedTime || null,
    relatedPlaykitSlug: relatedPlaykitSlug || null,
    image: image || null,
    benefits, developmentGoals, materials,
    sortOrder,
  })

  revalidatePath("/admin/play-ideas")
  revalidatePath("/explorations")
  redirect("/admin/play-ideas")
}

export async function updatePlayIdea(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || createSlug(title)
  const description = formData.get("description") as string
  const ageRange = formData.get("ageRange") as string
  const activityType = formData.get("activityType") as string
  const estimatedTime = formData.get("estimatedTime") as string
  const relatedPlaykitSlug = formData.get("relatedPlaykitSlug") as string
  const benefits = parseArray(formData.get("benefits") as string)
  const developmentGoals = parseArray(formData.get("developmentGoals") as string)
  const materials = parseArray(formData.get("materials") as string)
  const image = formData.get("image") as string
  const sortOrder = parseInt(formData.get("sortOrder") as string) || 0

  await db.update(playIdeas).set({
    title, slug, description: description || null,
    ageRange: ageRange || null, activityType: activityType || null,
    estimatedTime: estimatedTime || null,
    relatedPlaykitSlug: relatedPlaykitSlug || null,
    image: image || null,
    benefits, developmentGoals, materials,
    sortOrder,
  }).where(eq(playIdeas.id, id))

  revalidatePath("/admin/play-ideas")
  revalidatePath("/explorations")
  redirect("/admin/play-ideas")
}

export async function deletePlayIdea(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  await db.update(playIdeas).set({ isActive: false }).where(eq(playIdeas.id, id))
  revalidatePath("/admin/play-ideas")
  revalidatePath("/explorations")
}
