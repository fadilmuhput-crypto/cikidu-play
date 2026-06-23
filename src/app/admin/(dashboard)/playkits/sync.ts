"use server"

import { revalidatePath } from "next/cache"
import { db, playkits } from "@/db"
import { eq } from "drizzle-orm"
import playkitsData from "@/data/playkits.json"

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
