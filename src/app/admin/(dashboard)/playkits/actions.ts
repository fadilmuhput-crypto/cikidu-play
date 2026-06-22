"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db/index"
import { playkits } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createSlug } from "@/lib/utils"
import playkitsData from "@/data/playkits.json"

export async function createPlaykit(formData: FormData) {
  const name = formData.get("name") as string
  const slug = (formData.get("slug") as string) || createSlug(name)
  const description = formData.get("description") as string
  const fullDescription = formData.get("fullDescription") as string
  const ageSuitability = formData.get("ageSuitability") as string
  const price = formData.get("price") as string
  const developmentFocus = ((formData.get("developmentFocus") as string) || "").split("\n").map(s => s.trim()).filter(Boolean)
  const imagesRaw = formData.get("images") as string
  const images_0 = formData.get("images_0") as string
  const images_1 = formData.get("images_1") as string
  const whatsappMessage = formData.get("whatsappMessage") as string

  const images = [images_0, images_1, ...imagesRaw.split("\n").map(s => s.trim()).filter(Boolean)].filter(Boolean)

  await db.insert(playkits).values({
    slug, name,
    description: description || null,
    fullDescription: fullDescription || null,
    ageSuitability: ageSuitability || null,
    developmentFocus: developmentFocus.length > 0 ? developmentFocus : null,
    price: price || null,
    images: images.length > 0 ? images : null,
    whatsappMessage: whatsappMessage || null,
  })

  revalidatePath("/admin/playkits")
  revalidatePath("/playkits")
  redirect("/admin/playkits")
}

export async function updatePlaykit(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  const name = formData.get("name") as string
  const slug = (formData.get("slug") as string) || createSlug(name)
  const description = formData.get("description") as string
  const fullDescription = formData.get("fullDescription") as string
  const ageSuitability = formData.get("ageSuitability") as string
  const price = formData.get("price") as string
  const developmentFocus = ((formData.get("developmentFocus") as string) || "").split("\n").map(s => s.trim()).filter(Boolean)
  const imagesRaw = formData.get("images") as string
  const images_0 = formData.get("images_0") as string
  const images_1 = formData.get("images_1") as string
  const whatsappMessage = formData.get("whatsappMessage") as string

  const images = [images_0, images_1, ...imagesRaw.split("\n").map(s => s.trim()).filter(Boolean)].filter(Boolean)

  await db.update(playkits).set({
    slug, name,
    description: description || null,
    fullDescription: fullDescription || null,
    ageSuitability: ageSuitability || null,
    developmentFocus: developmentFocus.length > 0 ? developmentFocus : null,
    price: price || null,
    images: images.length > 0 ? images : null,
    whatsappMessage: whatsappMessage || null,
  }).where(eq(playkits.id, id))

  revalidatePath("/admin/playkits")
  revalidatePath("/playkits")
  redirect("/admin/playkits")
}

export async function deletePlaykit(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  await db.delete(playkits).where(eq(playkits.id, id))
  revalidatePath("/admin/playkits")
  revalidatePath("/playkits")
}

export async function syncPlaykitsFromJson() {
  let count = 0

  for (const kit of playkitsData) {
    const existing = await db.select().from(playkits).where(eq(playkits.slug, kit.slug)).limit(1)

    if (existing.length > 0) {
      await db.update(playkits).set({
        name: kit.name,
        description: kit.description,
        fullDescription: kit.fullDescription,
        ageSuitability: kit.ageSuitability,
        developmentFocus: kit.developmentFocus,
        price: kit.price,
        whatsappMessage: kit.whatsappMessage,
      }).where(eq(playkits.slug, kit.slug))
    } else {
      await db.insert(playkits).values({
        slug: kit.slug,
        name: kit.name,
        description: kit.description,
        fullDescription: kit.fullDescription,
        ageSuitability: kit.ageSuitability,
        developmentFocus: kit.developmentFocus,
        price: kit.price,
        images: kit.images,
        whatsappMessage: kit.whatsappMessage,
      })
    }
    count++
  }

  revalidatePath("/admin/playkits")
  revalidatePath("/playkits")
  return { success: true, count }
}
