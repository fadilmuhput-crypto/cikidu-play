"use server"

import { db, contacts } from "@/db"

export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = formData.get("message") as string

  if (!name || !message) {
    return { error: "Nama dan pesan harus diisi." }
  }

  try {
    await db.insert(contacts).values({
      name,
      email: email || null,
      phone: phone || null,
      message,
      createdAt: new Date().toISOString(),
    })
  } catch (e) {
    console.error("DB insert failed:", e)
  }

  return { success: true }
}
