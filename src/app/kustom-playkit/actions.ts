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

  const record = await db.insert(customPlaykits).values({
    name,
    phone,
    eventType: eventType || null,
    eventDate: eventDate || null,
    childAge: childAge || null,
    budget: budget || null,
    notes: notes || null,
    createdAt: new Date().toISOString(),
  }).returning({ id: customPlaykits.id })

  const id = record[0].id
  const lines = [
    `Halo! Saya tertarik dengan Custom Playkit.`,
    ``,
    `Nama: ${name}`,
    `No. WA: ${phone}`,
    eventType ? `Jenis Acara: ${eventType}` : null,
    eventDate ? `Tanggal Acara: ${eventDate}` : null,
    childAge ? `Usia Anak: ${childAge}` : null,
    budget ? `Estimasi Budget: ${budget}` : null,
    notes ? `Catatan: ${notes}` : null,
    ``,
    `(ID: ${id})`,
  ].filter(Boolean).join("\n")

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`
  redirect(waUrl)
}
