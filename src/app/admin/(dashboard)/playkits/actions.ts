"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db/index"
import { playkits } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createSlug } from "@/lib/utils"

function parseArray(value: string | null): string[] | null {
  if (!value) return null
  const arr = value.split("\n").map(s => s.trim()).filter(Boolean)
  return arr.length > 0 ? arr : null
}

export async function createPlaykit(formData: FormData) {
  const name = formData.get("name") as string
  const slug = (formData.get("slug") as string) || createSlug(name)
  const description = formData.get("description") as string
  const fullDescription = formData.get("fullDescription") as string
  const ageSuitability = formData.get("ageSuitability") as string
  const price = formData.get("price") as string
  const whatsappMessage = formData.get("whatsappMessage") as string
  const developmentFocus = parseArray(formData.get("developmentFocus") as string)
  const images = parseArray(formData.get("images") as string)

  await db.insert(playkits).values({
    name, slug,
    description: description || null,
    fullDescription: fullDescription || null,
    ageSuitability: ageSuitability || null,
    price: price || null,
    whatsappMessage: whatsappMessage || null,
    developmentFocus, images,
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
  const whatsappMessage = formData.get("whatsappMessage") as string
  const developmentFocus = parseArray(formData.get("developmentFocus") as string)
  const images = parseArray(formData.get("images") as string)

  await db.update(playkits).set({
    name, slug,
    description: description || null,
    fullDescription: fullDescription || null,
    ageSuitability: ageSuitability || null,
    price: price || null,
    whatsappMessage: whatsappMessage || null,
    developmentFocus, images,
  }).where(eq(playkits.id, id))

  revalidatePath("/admin/playkits")
  revalidatePath("/playkits")
  revalidatePath(`/playkits/${slug}`)
  redirect("/admin/playkits")
}

export async function deletePlaykit(formData: FormData) {
  const id = parseInt(formData.get("id") as string)
  await db.delete(playkits).where(eq(playkits.id, id))
  revalidatePath("/admin/playkits")
  revalidatePath("/playkits")
}
