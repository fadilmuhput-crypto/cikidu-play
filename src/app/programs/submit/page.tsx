"use client"

import { useState } from "react"
import Link from "next/link"
import { submitProgram } from "@/app/admin/(dashboard)/programs/actions"

const types = [
  { value: "ekstrakurikuler", label: "Ekstrakurikuler" },
  { value: "holiday_program", label: "Holiday Program" },
  { value: "kompetisi", label: "Kompetisi / Lomba" },
  { value: "aktivitas", label: "Aktivitas Lepas" },
]

export default function SubmitProgramPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    try {
      const fd = new FormData(e.currentTarget)
      await submitProgram(fd)
      setSubmitted(true)
    } catch {
      setError("Gagal mengirim. Silakan coba lagi.")
    }
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-3">Terima Kasih!</h1>
        <p className="text-foreground/60 mb-6">
          Program kamu sudah kami terima dan akan ditinjau oleh tim kami. Kami akan mengaktifkannya setelah verifikasi.
        </p>
        <Link
          href="/programs"
          className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors"
        >
          Lihat Program Lain
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Daftarkan Program</h1>
      <p className="text-foreground/60 mb-8">
        Isi form di bawah untuk mendaftarkan program, event, atau aktivitas anak kamu. Gratis!
      </p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl mb-6">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Judul Program *</label>
          <input
            name="title"
            required
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Tipe *</label>
            <select
              name="type"
              required
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Pilih tipe</option>
              {types.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Kota *</label>
            <input
              name="city"
              required
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi Program</label>
          <textarea
            name="description"
            rows={4}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Rentang Usia</label>
            <input
              name="ageRange"
              placeholder="3-6 tahun"
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Nama Penyelenggara</label>
            <input
              name="organizerName"
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Nomor WhatsApp</label>
            <input
              name="organizerContact"
              placeholder="08123456789"
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Website / Instagram</label>
            <input
              name="websiteUrl"
              placeholder="https://"
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Tanggal Mulai</label>
            <input
              name="startDate"
              type="date"
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/70 mb-1">Tanggal Selesai</label>
            <input
              name="endDate"
              type="date"
              className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
        >
          Kirim Program
        </button>

        <p className="text-xs text-foreground/50 text-center">
          Setelah dikirim, program akan kami review dan aktifkan dalam 1x24 jam.
        </p>
      </form>
    </div>
  )
}
