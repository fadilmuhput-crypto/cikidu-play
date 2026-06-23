"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db/index"
import { programs } from "@/db/schema"
import { eq } from "drizzle-orm"
import programsData from "@/data/programs.json"

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
