"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db/index"
import { programs } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createSlug } from "@/lib/utils"
import programsData from "@/data/programs.json"

export async function createProgram(formData: FormData) {
  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || createSlug(title)
  const type = formData.get("type") as string
  const city = formData.get("city") as string
  const description = formData.get("description") as string
  const organizerName = formData.get("organizerName") as string
  const organizerContact = formData.get("organizerContact") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const ageRange = formData.get("ageRange") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const image = formData.get("image") as string
  const status = formData.get("status") as string || "pending"

  await db.insert(programs).values({
    title, slug, type, city,
    description: description || null,
    organizerName: organizerName || null,
    organizerContact: organizerContact || null,
    websiteUrl: websiteUrl || null,
    ageRange: ageRange || null,
    startDate: startDate || null,
    endDate: endDate || null,
    image: image || null,
    status,
    submittedAt: new Date().toISOString(),
  })

  revalidatePath("/admin/programs")
  revalidatePath("/programs")
  redirect("/admin/programs")
}

export async function updateProgram(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const title = formData.get("title") as string
  const slug = (formData.get("slug") as string) || createSlug(title)
  const type = formData.get("type") as string
  const city = formData.get("city") as string
  const description = formData.get("description") as string
  const organizerName = formData.get("organizerName") as string
  const organizerContact = formData.get("organizerContact") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const ageRange = formData.get("ageRange") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string
  const image = formData.get("image") as string
  const status = formData.get("status") as string || "pending"

  const data: Record<string, string | null> = {
    title, slug, type, city,
    description: description || null,
    organizerName: organizerName || null,
    organizerContact: organizerContact || null,
    websiteUrl: websiteUrl || null,
    ageRange: ageRange || null,
    startDate: startDate || null,
    endDate: endDate || null,
    image: image || null,
    status,
  }

  if (status === "approved") data.approvedAt = new Date().toISOString()

  await db.update(programs).set(data).where(eq(programs.id, id))

  revalidatePath("/admin/programs")
  revalidatePath("/programs")
  revalidatePath(`/programs/${slug}`)
  redirect("/admin/programs")
}

export async function deleteProgram(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  await db.delete(programs).where(eq(programs.id, id))
  revalidatePath("/admin/programs")
  revalidatePath("/programs")
}

export async function submitProgram(formData: FormData) {
  const title = formData.get("title") as string
  const slug = createSlug(title) + "-" + Date.now()
  const type = formData.get("type") as string
  const city = formData.get("city") as string
  const description = formData.get("description") as string
  const organizerName = formData.get("organizerName") as string
  const organizerContact = formData.get("organizerContact") as string
  const websiteUrl = formData.get("websiteUrl") as string
  const ageRange = formData.get("ageRange") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string

  await db.insert(programs).values({
    title, slug, type, city,
    description: description || null,
    organizerName: organizerName || null,
    organizerContact: organizerContact || null,
    websiteUrl: websiteUrl || null,
    ageRange: ageRange || null,
    startDate: startDate || null,
    endDate: endDate || null,
    status: "pending",
    submittedAt: new Date().toISOString(),
  })

  revalidatePath("/programs")
  revalidatePath("/admin/programs")
}

export async function syncProgramsFromJson() {
  let count = 0

  for (const prog of programsData) {
    const existing = await db.select().from(programs).where(eq(programs.slug, prog.slug)).limit(1)

    if (existing.length > 0) {
      await db.update(programs).set({
        title: prog.title,
        type: prog.type,
        city: prog.city,
        description: prog.description || null,
        organizerName: prog.organizerName || null,
        organizerContact: prog.organizerContact || null,
        websiteUrl: prog.websiteUrl || null,
        ageRange: prog.ageRange || null,
        startDate: prog.startDate || null,
        endDate: prog.endDate || null,
        image: prog.image || null,
        status: prog.status || "pending",
        approvedAt: prog.status === "approved" ? new Date().toISOString() : null,
      }).where(eq(programs.slug, prog.slug))
    } else {
      await db.insert(programs).values({
        slug: prog.slug,
        title: prog.title,
        type: prog.type,
        city: prog.city,
        description: prog.description || null,
        organizerName: prog.organizerName || null,
        organizerContact: prog.organizerContact || null,
        websiteUrl: prog.websiteUrl || null,
        ageRange: prog.ageRange || null,
        startDate: prog.startDate || null,
        endDate: prog.endDate || null,
        image: prog.image || null,
        status: prog.status || "pending",
        submittedAt: new Date().toISOString(),
        approvedAt: prog.status === "approved" ? new Date().toISOString() : null,
      })
    }
    count++
  }

  revalidatePath("/admin/programs")
  revalidatePath("/programs")
  return { success: true, count }
}
