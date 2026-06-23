"use client"

import { useActionState } from "react"
import { submitCustomPlaykit } from "./actions"

const EVENT_TYPES = [
  "Ulang Tahun",
  "Graduation / Kelulusan",
  "Hari Raya (Idul Fitri, Natal, dll)",
  "Family Gathering",
  "Baby Shower",
  "School Event",
  "Corporate Event",
  "Lainnya",
]

export default function CustomPlaykitForm() {
  const [state, formAction, pending] = useActionState(submitCustomPlaykit, null)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Nama *</label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          placeholder="Nama lengkap"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">No. WhatsApp *</label>
        <input
          type="tel"
          name="phone"
          required
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          placeholder="+62 812-3456-7890"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Jenis Acara</label>
        <select
          name="eventType"
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
        >
          <option value="">Pilih jenis acara</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Tanggal Acara</label>
          <input
            type="date"
            name="eventDate"
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Usia Anak</label>
          <input
            type="text"
            name="childAge"
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            placeholder="Contoh: 3-5 tahun"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Estimasi Budget</label>
        <input
          type="text"
          name="budget"
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          placeholder="Contoh: Rp 500.000 - 1.000.000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Catatan Tambahan</label>
        <textarea
          name="notes"
          rows={3}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30 resize-none"
          placeholder="Tema acara, jumlah anak, ide playkit, dll."
        />
      </div>
      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 hover:opacity-90 transition-opacity disabled:opacity-50 text-base"
      >
        {pending ? "Memproses..." : "Konsultasi via WhatsApp →"}
      </button>
      <p className="text-xs text-foreground/40 text-center">
        Data Anda akan dikirim ke WhatsApp kami untuk ditindaklanjuti.
      </p>
    </form>
  )
}
