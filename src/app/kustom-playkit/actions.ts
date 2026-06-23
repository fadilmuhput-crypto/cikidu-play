"use server"

import { db, customPlaykits } from "@/db"
import { redirect } from "next/navigation"

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281931198224"

export async function submitCustomPlaykit(formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const eventType = formData.get("eventType") as string
  const eventDate = formData.get("eventDate") as string
  const childAge = formData.get("childAge") as string
  const budget = formData.get("budget") as string
  const notes = formData.get("notes") as string

  if (!name || !phone) {
    return { error: "Nama dan nomor WhatsApp harus diisi." }
  }

  try {
    await db.insert(customPlaykits).values({
      name,
      phone,
      eventType: eventType || null,
      eventDate: eventDate || null,
      childAge: childAge || null,
      budget: budget || null,
      notes: notes || null,
      createdAt: new Date().toISOString(),
    })
  } catch (e) {
    console.error("DB insert failed:", e)
  }

  const lines = [
    `Halo! Saya tertarik dengan Custom Playkit.`,
    ``,
    `Nama: ${name}`,
    `No. WA: ${phone}`,
    ...(eventType ? [`Jenis Acara: ${eventType}`] : []),
    ...(eventDate ? [`Tanggal Acara: ${eventDate}`] : []),
    ...(childAge ? [`Usia Anak: ${childAge}`] : []),
    ...(budget ? [`Estimasi Budget: ${budget}`] : []),
    ...(notes ? [`Catatan: ${notes}`] : []),
  ].join("\n")

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
  redirect(waUrl)
}
