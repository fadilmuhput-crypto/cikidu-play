"use server"

import { revalidatePath } from "next/cache"
import { db, playkits, programs, playIdeas, blogs } from "@/db"
import { eq } from "drizzle-orm"

const tables = { playkits, programs, play_ideas: playIdeas, blogs } as const

export async function togglePlaykitActive(
  table: keyof typeof tables,
  id: number,
  isActive: boolean
) {
  const t = tables[table]
  if (!t) throw new Error("Unknown table: " + table)

  await db.update(t).set({ isActive }).where(eq(t.id, id))

  revalidatePath("/admin/playkits")
  revalidatePath("/admin/programs")
  revalidatePath("/admin/play-ideas")
  revalidatePath("/admin/blogs")
  revalidatePath("/playkits")
  revalidatePath("/programs")
  revalidatePath("/explorations")
  revalidatePath("/blogs")
}
